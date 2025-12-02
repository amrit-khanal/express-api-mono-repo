import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { socketActivities } from 'libs/utils/socket.constants.utils';

export const connectedDevices: Record<string, Socket> = {};
@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
    transports: ['websocket', 'polling']
  },
})
export class EventsGateway implements OnModuleInit {
  @WebSocketServer() server: Server;
  socket: Socket;

  onModuleInit() {
    this.server.on(socketActivities.CONNECTION, (socket) => {
      console.log('Connected: ', socket.id);
      connectedDevices[socket.handshake.query.deviceId] = socket;
      socket.on(socketActivities.DISCONNECT, () => {
        console.log('Disconnected: ', socket.id);
        delete connectedDevices[socket.handshake.query.deviceId];
      });
      socket.on(socketActivities.DEVICE_EVENT, (data) => {
        console.log('Broadcasting events', data);
        this.server.emit(socketActivities.GET_DEVICE_LOCATION, data);
      });
      // socket.on(socketActivities.DRIVER_BID_AUTHORITY, (data) => {
      //   console.log('Broadcasting events', data);
      //   this.server.emit(`${socketActivities.BID_AUTHORITY}-${data?.content?.userId}`, data);
      // });
      // socket.on(socketActivities.PROFILE_SWITCH, (data) => {
      //   console.log('Broadcasting events', data);
      //   this.server.emit(`${socketActivities.PROFILE_SWITCH}-${data?.contactNumber}`, data);
      // });
      socket.on(socketActivities.ASSIGN_VEHICLE, (data) => {
        console.log('Broadcasting events', data);
        this.server.emit(`${socketActivities.ASSIGN_VEHICLE}-${data?.userId}`, data);
      });
    });
  }
}
