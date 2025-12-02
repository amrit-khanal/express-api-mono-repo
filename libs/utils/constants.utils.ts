import { CANCELLED } from 'dns';

export const roleCodes = {
  VEHICLE_OWNER: 'VEHICLE_OWNER',
  DRIVER: 'DRIVER',
  SHIPPER: 'SHIPPER',
  PLATFORM_ADMIN: 'PLATFORM_ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  USER: 'USER',
};

export const resources = {
  USER: 'user',
  ROLE: 'role',
  DRIVER: 'driver',
  PLATFORM_ADMIN: 'platform_admin',
  TRIP: 'trip',
  ORDER: 'order',
  SHIPPER: 'shipper',
  VEHICLE: 'vehicle',
  VEHICLE_OWNER: 'vehicle_owner',
  PROFILE: 'profile',
  MEDIA: 'media',
  PLATFORM_ADMIN_REPORT: 'platform_admin_report',
  VEHICLE_OWNER_REPORT: 'vehicle_owner_report',
  TRIP_REPORT: 'trip_report',
  DRIVER_REPORT: 'driver_report',
  DEVICE_LOCATION: 'device_location',
  VEHICLE_CATEGORY: 'vehicle_category',
  BID_REQUEST: 'bid_request',
  PAYMENT: 'payment',
  VEHICLE_SHIFT: 'vehicle_shift',
  TQMS: 'tqms',
  INSURANCE_COMPANY: 'insurance_company',
  TQMS_HASH: 'tqms_hash',
  SPEED_LIMIT: 'speed_limit',
  REPORT: 'report',
  CUSTOMIZE_NOTIFICATION: 'customize_notification',
  DIGITAL_CONTRACT: 'digital_contract',
  RE_BID: 're_bid',
  OWNERSHIP_TRANSFER: 'ownership_transfer',
  DEFAULT_USER: 'default_user',
  CONTRACT_OWNER: 'contract_owner',
  CONTRACT_VEHICLE: 'contract_vehicle',
  ESTIMATED_FARE: 'estimated_fare',
  DOCUMENT_EXPIRY_DAY: 'document_expiry_day',
  SUBSCRIPTION_PLAN: 'subscription_plan',
  MATCHING_CRITERIA: 'matching_criteria',
};

export const actions = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  VIEW: 'view',
};

export const actionsV1 = {
  CREATE: 'create',
  LIST: 'list',
  LIST_ALL: 'list_all',
  UPDATE: 'update',
  DELETE: 'delete',
  DETAIL: 'detail',
  ACCEPT: 'accept',
};

export const ENVIRONMENT = {
  DEV: 'dev',
  PROD: 'prod',
  QA: 'qa',
};

export const orderStatus = {
  CREATED: 'created',
  DRAFT: 'draft',
  BACK: 'back',
  BIDDING_IN_PROGRESS: 'bidding_in_progress',
  PENDING: 'pending',
  BIDDING_ACCEPTED: 'bidding_accepted',
  ORDER_IN_PROGRESS: 'order_in_progress',
  REJECTED: 'rejected',
  CANCELED: 'canceled',
  COMPLETED: 'completed',
  CANCELED_BY_VEHICLE_OWNER: 'canceled_by_vehicle_owner',
  CANCELED_BY_SHIPPER: 'canceled_by_shipper',
  RE_BID: 'rebid',
  PAYMENT_ACCEPTED: 'payment_accepted',
  ACKNOWLEDGE_PENDING_OF_SHIPPER: 'acknowledge_pending_of_shipper',
  ACKNOWLEDGE_PENDING_OF_BIDDER: 'acknowledge_pending_of_bidder',
  CREATING: 'creating',
};

export const FcmTopics = {
  DEVICE_ADDED: 'DEVICE_ADDED',
  DEVICE_REMOVED: 'DEVICE_REMOVED',
  NEW_LOCATION: 'NEW_LOCATION',
};

export const TripStatus = {
  CREATED: 'created',
  JOURNEY_STARTED: 'journey_started',
  ON_HOLD: 'on_hold',
  JOURNEY_ENDED: 'completed',
  EN_ROUTE: 'en_route',
  RESUME_JOURNEY: 'resume_journey',
  CANCELED_BY_VEHICLE_OWNER: 'canceled_by_vehicle_owner',
  CANCELED_BY_SHIPPER: 'canceled_by_shipper',
  UNVERIFIED: 'unverified',
};

export const Queues = {
  SENDER_QUEUE: 'sender_queue',
  DRIVER_CREATED_QUEUE: 'driver_created_queue',
  DRIVER_UPDATED_QUEUE: 'driver_updated_queue',
  DRIVER_DELETED_QUEUE: 'driver_deleted_queue',
  DRIVER_CREATED_NOTIFICATION_QUEUE: 'driver_created_notification_queue',
  DRIVER_CREATED_SMS_QUEUE: 'driver_created_sms_queue',
  RECEIVER_QUEUE: 'receiver_queue',
  TRIP_QUEUE: 'trip_queue',
  VEHICLE_QUEUE: 'vehicle_queue',
  DEVICE_QUEUE: 'device_queue',
  PLATFORM_ADMIN_CREATED_QUEUE: 'platform_admin_create_queue',
  PLATFORM_ADMIN_VEHICLE_QUEUE: 'platform_admin_vehicle_queue',
  CREATE_PLATFORM_ADMIN_QUEUE_IN_FLEET: 'create_platform_admin_queue_in_fleet',
  CREATE_VEHICLE_CATEGORY_QUEUE_IN_ORDER:
    'create_vehicle_category_queue_in_order',
  CREATE_VEHICLE_TYPES_QUEUE_IN_ORDER: 'create_vehicle_types_queue_in_order',
  UPDATE_VEHICLE_CATEGORY_QUEUE_IN_ORDER:
    'update_vehicle_category_queue_in_order',
  DELETE_VEHICLE_CATEGORY_QUEUE_IN_ORDER:
    'delete_vehicle_category_queue_in_order',
  UPDATE_VEHICLE_TYPES_QUEUE_IN_ORDER: 'update_vehicle_types_queue_in_order',
  DELETE_VEHICLE_TYPES_QUEUE_IN_ORDER: 'delete_vehicle_types_queue_in_order',
  CREATE_USER_QUEUE_IN_ORDER: 'create_user_queue_in_order',
  CREATE_VEHICLE_QUEUE_IN_ORDER: 'create_vehicle_queue_in_order',
  ORDER_PLACED_QUEUE: 'order_placed_queue',
  ORDER_PLACED_FOR_DRIVER: 'order_placed_for_driver',
  OTP_SMS_QUEUE: 'otp_sms_queue',
  UPDATE_VEHICLE_STATUS_QUEUE_IN_ORDER: 'update_vehicle_status_queue_in_order',
  VEHICLE_OWNER_BID_FOR_REQUEST: 'vehicle_owner_bid_for_request',
  BID_ACCEPT_BY_SHIPPER: 'bid_accept_by_shipper',
  VEHICLE_ACCEPT_BY_OTHER_SHIPPER: 'vehicle_accept_by_other_shipper',
  UPDATE_VEHICLE_QUEUE_IN_ORDER: 'update_vehicle_queue_in_order',
  DELETE_VEHICLE_QUEUE_IN_ORDER: 'delete_vehicle_queue_in_order',
  UPDATE_USER_QUEUE_IN_ORDER: 'update_user_queue_in_order',
  DELETE_USER_QUEUE_IN_ORDER: 'delete_user_queue_in_order',
  BID_AUTHORITY_FOR_DRIVER_IN_USER: 'bid_authority_for_driver_in_user',
  ASSIGN_DRIVER_TO_VEHICLE_IN_ORDER: 'assign_driver_to_vehicle_in_order',
  ASSIGN_DRIVER_TO_VEHICLE_IN_NOTIFICATION:
    'assign_driver_to_vehicle_in_notification',
  CREATE_VEHICLE_OWNER_IN_USER: 'create_vehicle_owner_in_user',
  CREATE_VEHICLE_OWNER_IN_ORDER: 'create_vehicle_owner_in_order',
  ORDER_IN_PAYMENT_SERVICE: 'order_in_payment_service',
  BID_IN_PAYMENT_SERVICE: 'bid_in_payment_service',
  USER_IN_PAYMENT_SERVICE: 'user_in_payment_service',
  CREATE_NEW_VEHICLE_OWNER_NOTIFICATION_QUEUE:
    'create_new_vehicle_owner_notification_queue',
  CREATE_NEW_VEHICLE_OWNER_WITH_VEHICLE_SMS_QUEUE:
    'create_new_vehicle_owner_with_vehicle_sms_queue',
  CREATE_NEW_VEHICLE_OWNER_SMS_QUEUE: 'create_new_vehicle_owner_sms_queue',
  ORDER_CANCEL_BY_SHIPPER: 'order_cancel_by_shipper',
  VEHICLE_SWITCH_DETECTION_VEHICLE_OWNER:
    'vehicle_switch_detection_vehicle_owner',
  VEHICLE_SWITCH_DETECTION_DRIVER: 'vehicle_switch_detection_driver',
  REMOVE_CONTRACT_VEHICLE_IN_FLEET: ' remove_contract_vehicle_in_fleet',
  ORDER_CANCEL_BY_SHIPPER_IN_NOTIFICATION:
    'order_cancel_by_shipper_in_notification',
  SHIPPER_NOTIFY_VEHICLE_SHIFT: 'shipper_notify_vehicle_shift',
  DELETE_DRIVER_IN_FLEET_QUEUE: 'delete_driver_in_fleet_queue',
  USER_LOG_OUT: 'user_log_out',
  DRIVER_UNASSIGN: 'driver_unassign_queue',
  DRIVER_CREATED_QUEUE_IN_FLEET: 'driver_created_queue_in_fleet',
  SWITCH_TO_DRIVER_IN_USER_QUEUE: 'switch_to_driver_in_user_queue',
  SWITCH_TO_DRIVER_IN_ORDER_QUEUE: 'switch_to_driver_in_order_queue',
  ADD_PICKUP_DROP_LOCATION_IN_ORDER_MODULE:
    'add_pickup_drop_location_in_order_module',
  BID_AUTHORITY_FOR_DRIVER_IN_NOTIFICATION:
    'bid_authority_for_driver_in_notification',
  DELETE_DRIVER_FROM_FLEET: 'delete_driver_from_fleet',
  VEHICLE_OWNER_ACCOUNT_STATUS_IN_FLEET_MODULE:
    'vehicle_owner_account_status_in_fleet_module',
  SEND_REJECTED_NOTIFICATION_TO_PLATFORM_ADMIN:
    'send_rejected_notification_to_platform_admin',
  TQMS_DRIVER_CREATED: 'tqms_driver_created',
  TQMS_DRIVER_UPDATED: 'tqms_driver_updated',
  CHECK_POINT_ENTRY_NOTIFICATION_QUEUE: 'check_point_entry_notification_queue',
  DRIVER_NOTIFY_VEHICLE_SHIFT: 'driver_notify_vehicle_shift',
  DATA_SYNC_ISSUE_FROM_TQMS: 'data_sync_issue_from_tqms',
  CREATE_VEHICLE_FROM_TQMS_NOTIFICATION_QUEUE:
    'create_vehicle_from_tqms_notification_queue',
  UPDATE_PICKUP_DATE_OF_TRIP_NOTIFICATION_QUEUE:
    'update_pickup_date_of_trip_notification_queue',
  SEND_REJECTED_NOTIFICATION_TO_VEHICLE_OWNER:
    'send_rejected_notification_to_vehicle_owner',
  VEHICLE_OWNER_PENDING_SMS: 'vehicle_owner_pending_sms',
  TRIP_APPROVED_BY_CHECKPOINT_USER_NOTIFICATION_QUEUE:
    'trip_approve_by_checkpoint_user_notification_queue',
  TRIP_CREATED_FROM_PLATFORM_NOTIFICATION_QUEUE:
    'trip_created_from_platform_notification_queue',
  SEND_EDIT_REQUEST_NOTIFICATION_TO_PLATFORM_ADMIN:
    'send_edit_request_notification_to_platform_admin',
  VEHICLE_ASSIGN_FOR_DRIVER_IN_USER_MODULE:
    'vehicle_assign_for_driver_in_user_module',
  VEHICLE_APPROVAL_IN_ORDER_MODULE: 'vehicle_approval_in_order_module',
  VEHICLE_APPROVED_BY_PLATFORM_ADMIN_NOTIFICATION_QUEUE:
    'vehicle_approved_by_platform_admin_notification_queue',
  REMOVED_VEHICLE_OWNER_NOTIFICATION_QUEUE:
    'removed_vehicle_owner_notification_queue',
  VEHICLE_OWNERSHIP_TRANSFER_NOTIFICATION_QUEUE:
    'vehicle_ownership_transfer_notification_queue',
  DRIVER_VEHICLE_OWNER_CHANGED_NOTIFICATION_QUEUE:
    'driver_vehicle_owner_changed_notification_queue',
  TRIP_DELETE_NOTIFICATION: 'trip_delete_notification',
  TRIP_COMPLETION_NOTIFICATION_QUEUE: 'trip_completion_notification_queue',
  BID_REQUEST_REJECT_NOTIFICATION_QUEUE:
    'bid_request_reject_notification_queue',
  UPDATE_VEHICLE_OWNER_NAME_ADDRESS_IN_FLEET:
    'update_vehicle_owner_name_address_in_fleet',
  UPDATE_DRIVER_ADDRESS_IN_FLEET: 'update_driver_address_in_fleet',
  TRIP_STATUS_CHANGE_NOTIFICATION_QUEUE_FOR_SHIPPER:
    'trip_status_change_notification_queue_for_shipper',
  UPDATE_VEHICLE_OWNER_NAME_ADDRESS_IN_ORDER:
    'update_vehicle_owner_name_address_in_fleet_order',
};

export const TripQueues = {
  PAID_BID_REQUEST_QUEUE_IN_ORDER: 'paid_bid_request_queue_in_order',
  PAID_BID_REQUEST_QUEUE_IN_ORDER_V2: 'paid_bid_request_queue_in_order_v2',
  CREATE_TRIP_QUEUE_IN_FLEET: 'create_trip_queue_in_fleet',
  VEHICLE_SHIFT_QUEUE_IN_ORDER: 'vehicle_shift_queue_in_order',
  PAID_BID_REQUEST_TRIP_CANCEL_IN_FLEET:
    'paid_bid_request_trip_cancel_in_fleet',
  TRIP_STATUS_CHANGE_QUEUE_IN_ORDER: 'trip_status_change_queue_in_order',
  CANCELED_TRIP_BY_SHIPPER: 'canceled_by_shipper',
  CANCELED_TRIP_BY_VEHICLE_OWNER: 'canceled_by_vehicle_owner',
  ORDER_CANCELED_NOTIFICATION_FOR_VEHICLE_OWNER:
    'order_canceled_notification_for_vehicle_owner',
};

export const VehicleShiftQueues = {
  VEHICLE_OWNER_MADE_REQUEST_NOTIFICATION_QUEUE:
    'vehicle_owner_made_request_queue',
  FLEET_MANAGER_ACCEPT_CHANGE_REQUEST_NOTIFICATION_QUEUE:
    'fleet_manager_accept_change_request_notification_queue',
};

export const SpeedLimitQueues = {
  OVER_SPEED_NOTIFICATION_QUEUE_FOR_DRIVER:
    'over_speed_notification_queue_for_driver',
  OVER_SPEED_NOTIFICATION_QUEUE_FOR_VEHICLE_OWNER:
    'over_speed_notification_queue_for_vehicle_owner',
};

export const PaymentQueues = {
  PAYMENT_BY_BIDDER_NOTIFICATION_TO_SHIPPER:
    'payment_by_bidder_notification_to_shipper',
};

export const DocumentExpiredQueues = {
  INSURANCE_DOCUMENT_EXPIRED_NOTIFICATION_QUEUE:
    'insurance_document_expired_notification_queue',
  ROUTE_PERMIT_DOCUMENT_EXPIRED_NOTIFICATION_QUEUE:
    'route_permit_document_expired_notification_queue',
  BLUEBOOK_DOCUMENT_EXPIRED_NOTIFICATION_QUEUE:
    'bluebook_document_expired_notification_queue',
  OTHER_DOCUMENT_EXPIRED_NOTIFICATION_QUEUE:
    'other_document_expired_notification_queue',
  CHECK_PASS_DOCUMENT_EXPIRED_NOTIFICATION_QUEUE:
    'check_pass_document_expired_notification_queue',
  LICENSE_EXPIRED_NOTIFICATION_QUEUE: 'license_expired_notification_queue',
};

export const orderTypeStatus = {
  NEW: 'NEW',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
};

export const FileSize = {
  TEN_MB: 1024 * 1024 * 10,
  HUNDRED_MB: 1024 * 1024 * 100,
  ONE_GB: 1024 * 1024 * 1024,
}

export const plans = {
  BASIC: 'basic',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum'
}

export const planFeatures = {
  INSURANCE_EXPIRY: 'insurance_expiry',
  BLUEBOOK_EXPIRY: 'bluebook_expiry',
  CHECK_PASS_EXPIRY: 'check_pass_expiry',
  ROUTE_PERMIT_EXPIRY: 'route_permit_expiry',
  GPS_MAP: 'gps_map',
  TRIP_REPORT: 'trip_report',
  GPS_REPORT: 'gps_report',
  BIDDING: "bidding",
  ANALYTICS: 'analytics',
  BID_ACCEPTANCE: 'bid_acceptance',
  DRIVER_SPEED: 'driver_speed',
  REVENUE_ANALYSIS: 'revenue_analysis',
  PROFIT_MARGIN_REPORT: 'profit_margin_report',
  VEHICLE_REPORT: 'vehicle_report'
}

export const planDurations = {
  DAILY: 'daily',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  ANNUALLY: 'annually'
}
