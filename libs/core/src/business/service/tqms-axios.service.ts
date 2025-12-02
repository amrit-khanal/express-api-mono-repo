import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';
import { CoreService } from 'core/core/infrastructure/core.service';
import { WinstonLogService } from 'libs/modules/log/services/winston-logger.service';
import { inspect } from 'util';

@Injectable()
export class AxiosService {
    private axiosInstance;

    constructor(
        private coreService: CoreService,
        private readonly logger: WinstonLogService
    ) {
        this.axiosInstance = axios.create({
            baseURL: process.env.TQMS_ENDPOINT,
        });
        this.initializeRequestInterceptor();
        this.initializeResponseInterceptor();
    }

    private async getToken(): Promise<string> {
        return await this.coreService.cacheManager.get('TQMS-TOKEN');
    }

    private async setToken(token: string): Promise<void> {
        await this.coreService.cacheManager.set('TQMS-TOKEN', token);
    }

    private async refreshToken(): Promise<string> {
        try {
            const response = await axios.post(`${process.env.TQMS_ENDPOINT}/connect/token`, {
                grant_type: 'client_credentials',
                client_id: 'lodbod_client_token',
                client_secret: 'lodbod_client_secret',
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const newToken = response.data.access_token;
            await this.setToken(newToken);
            return newToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    }

    private initializeRequestInterceptor() {
        this.axiosInstance.interceptors.request.use(
            async (config) => {
                let tqmsToken = await this.getToken();
                if (!tqmsToken) {
                    tqmsToken = await this.refreshToken();
                }
                config.headers.Authorization = `Bearer ${tqmsToken}`;
                (config as any).metadata = { startTime: new Date().getTime() };

                this.logger.log(
                    `Outgoing Request: ${config.method?.toUpperCase()} ${config.url}`,
                    'AxiosService',
                );
                this.logger.debug(`Request Payload: ${config?.data}`, 'AxiosService');
                return config;
            },
            (error) => {
                this.logger.error(`Request Error: ${error.message}`, error.stack, 'AxiosService');
                return Promise.reject(error);
            }
        );
    }


    private initializeResponseInterceptor() {
        this.axiosInstance.interceptors.response.use(
            (response) => {
                const { config } = response;
                const start = (config as any).metadata?.startTime || new Date().getTime();
                const duration = new Date().getTime() - start;

                this.logger.log(
                    `Response: ${response.status} ${config.method?.toUpperCase()} ${config.url} [${duration}ms]`,
                    'AxiosService',
                );
                this.logger.debug(`Response Body: ${response?.data}`, 'AxiosService');
                return response;
            },
            async (error) => {
                const { config, response } = error;
                const status = response?.status || 'N/A';
                const url = config?.url || 'Unknown URL';
                const method = config?.method?.toUpperCase() || 'UNKNOWN';
                const start = (config as any)?.metadata?.startTime || new Date().getTime();
                const duration = new Date().getTime() - start;

                this.logger.error(`Error Response: ${status} ${method} ${url} [${duration}ms] - ${error.message}`, error.stack, 'AxiosService');
                if (status === 401 && !config._retry) {
                    config._retry = true;
                    try {
                        const newToken = await this.refreshToken();
                        config.headers.Authorization = `Bearer ${newToken}`;
                        return this.axiosInstance(config);
                    } catch (tokenRefreshError) {
                        return Promise.reject(tokenRefreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    }


    async getRequest(endpoint: string) {
        try {
            const response = await this.axiosInstance.get(endpoint);
            const formattedLogData = inspect(response?.data, { depth: null, colors: false });
            this.logger.log(`GET request to ${endpoint}: ${formattedLogData}`, 'TQMS Axios Service');
            return response.data;
        } catch (error) {
            this.logger.error(`GET request to ${endpoint} failed: `, error.stack, 'AxiosService');
            throw error;
        }
    }

    async postRequest(endpoint: string, body: any) {
        try {
            const response = await this.axiosInstance.post(`${process.env.TQMS_ENDPOINT}${endpoint}`, body);
            const formattedLogData = inspect(response?.data, { depth: null, colors: false });

            this.logger.log(`POST request to ${endpoint}: ${formattedLogData}`, 'TQMS Axios Service');
            return response.data;
        } catch (error) {
            this.logger.error(`POST request to ${endpoint} failed: `, error.stack, 'AxiosService');
            throw error;
        }
    }

    async putRequest(endpoint: string, body: any) {
        try {
            const response = await this.axiosInstance.put(`${process.env.TQMS_ENDPOINT}${endpoint}`, body);
            const formattedLogData = inspect(response?.data, { depth: null, colors: false });

            this.logger.log(`PUT request to ${endpoint}: ${formattedLogData}`, 'TQMS Axios Service');
            return response.data;
        } catch (error) {
            this.logger.error(`PUT request to ${endpoint} failed: `, error.stack, 'AxiosService');
            throw error;
        }
    }
}
