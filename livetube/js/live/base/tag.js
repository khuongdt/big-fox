/**
 * Created by khuongdt on 11/13/2015.
 */


goog.provide('com.onesoft.livetube.base.LiveTag');
goog.provide('com.onesoft.livetube.base.ClientTag');

com.onesoft.livetube.base.LiveTag = {
    'CS_CHAT': 0x000001,
    'SC_CHAT': 0x110001,
    'CS_DELETE_HISTORY': 0x1001,
    'CS_ENTER_CODE': 0x1002,
    'CS_ENTER_PASS': 0x1003,
    'CS_FOLLOW': 0x1004,
    'CS_LIKE': 0x1005,
    'CS_LOGIN': 0x1006,
    'CS_PUBLISH': 0x1007,
    'CS_REGISTER': 0x1008,
    'CS_REQUEST_LIST_MY_SCHEDULE': 0x1009,
    'CS_REQUEST_LIST_MY_VIDEO': 0x100A,
    'CS_REQUEST_LIST_SUBSCRIBERS': 0x100B,
    'CS_REQUEST_LIST_SUBSCRIPTION_VIDEO': 0x100C,
    'CS_REQUEST_LIST_VIDEO_FAVOURITE': 0x100D,
    'CS_REQUEST_LIST_VIDEO_HISTORY': 0x100E,
    'CS_REQUEST_LIST_VIDEO_NOW': 0x100F,
    'CS_REQUEST_LIST_VIDEO_UP_COMING': 0x1010,
    'CS_SET_REMINDER': 0x1011,
    'CS_SETTING': 0x1012,
    'CS_LIVE_NOW': 0x1013,
    'CS_LIVE_UPCOMING': 0x1014,
    'CS_LOGOUT': 0x1015,
    'CS_UPLOAD': 0x1016,
    'CS_REQUEST_MORE_LIST_VIDEO_NOW': 0x1017,
    'CS_REQUEST_MORE_LIST_VIDEO_UP_COMING': 0x1018,
    'CS_REQUEST_VIEW_VIDEO': 0x1019,
    'CS_REQUEST_STOP_VIEW_VIDEO': 0x1020,
    'CS_UPDATE_PROFILE': 0x1021,
    'CS_CHANGE_PASSWORD': 0x1022,
    'CS_LIST_SETTING': 0x1023,
    'CS_LOGIN_FB': 0x1024,
    'CS_LOGIN_GOOGLE_PLUS': 0x1025,
    'CS_LIST_CATEGORIES': 0x1026,
    'CS_LIVE_UPCOMING_UPDATE': 0x1027,
    'CS_LIVE_UPCOMING_DELETE': 0x1028,
    'CS_FORGOT_PASSWORD': 0x1029,
    'CS_STOP_LIVE': 0x1030,
    'CS_UPDATE_VIDEO_LIVE': 0x1031,
    'CS_UPDATE_VIDEO_RECORED': 0x1032,
    'CS_SEARCH_VIDEO_BY_NAME': 0x1033,
    'CS_SEARCH_LIVE_BY_NAME': 0x1034,
    'CS_SEARCH_UPCOMING_BY_NAME': 0x1035,
    'CS_LIST_HOT_LIVE': 0x1036,
    'CS_SEARCH_LIVE_UPCOMING_VIDEO_BY_NAME': 0x1037,
    'CS_REQUIRED_LOGIN': 0x1038,
    'CS_REG_GCM_ID': 0x1039,
    'CS_UPDATE_GCM_ID': 0x1040,
    'CS_REPORT_VIDEO': 0x1041,
    'CS_GET_INFO_VIDEO': 0x1042,
    'CS_Input_Card': 0x1043,
    'CS_LIST_TYPE_CARD_MOBILE': 0x1044,
    'CS_LIST_GIFT': 0x1045,
    'CS_TO_GIFTS': 0x1046,
    'CS_REQUEST_INFO_TXU_TVANG': 0x1047,
    'CS_LIST_CARD_MOBILE': 0x1048,
    'CS_TRANSLATE_TO_CARD': 0x1049,
    'CS_LIST_TRANSLATE_CARD_BY_USER_ID': 0x1050,
    'CS_LIST_INPUT_CARD_BY_USER_ID': 0x1051,
    'CS_LIST_TO_GIFTS_BY_USER_ID': 0x1052,
    'CS_LIST_RECEIVER_GIFT_BY_USER_ID': 0x1053,
    'CS_LIST_TOP_INPUT_CARD': 0x1054,
    'CS_LIST_TOP_TO_GIFTS': 0x1055,
    'CS_LIST_TOP_RECEIVER_GIFTS': 0x1056,
    'CS_LIST_TOP_LIKE_USER_LIVE': 0x1057,
    'CS_LIST_TOP_FOLLOW_USER_LIVE': 0x1058,
    'CS_UPDATE_VIDEO_LIVE_CHAT': 0x1059,
    'CS_REQUEST_CANDIDATE': 0x1060,
    'CS_SEND_CANDIDATE': 0x1061,
    'SC_DELETE_HISTORY': 0x100001,
    'SC_ENTER_CODE': 0x100002,
    'SC_ENTER_PASS': 0x100003,
    'SC_FOLLOW': 0x100004,
    'SC_LIKE': 0x100005,
    'SC_LOGIN': 0x100006,
    'SC_PUBLISH': 0x100007,
    'SC_REGISTER': 0x100008,
    'SC_REQUEST_LIST_MY_SCHEDULE': 0x100009,
    'SC_REQUEST_LIST_MY_VIDEO': 0x10000A,
    'SC_REQUEST_LIST_SUBSCRIBERS': 0x10000B,
    'SC_REQUEST_LIST_SUBSCRIPTION_VIDEO': 0x10000C,
    'SC_REQUEST_LIST_VIDEO_FAVOURITE': 0x10000D,
    'SC_REQUEST_LIST_VIDEO_HISTORY': 0x10000E,
    'SC_REQUEST_LIST_VIDEO_NOW': 0x10000F,
    'SC_REQUEST_LIST_VIDEO_UP_COMING': 0x100010,
    'SC_SET_REMINDER': 0x100011,
    'SC_SETTING': 0x100012,
    'SC_LIVE_NOW': 0x100013,
    'SC_LIVE_UPCOMING': 0x100014,
    'SC_LOGOUT': 0x100015,
    'SC_UPLOAD': 0x100016,
    'SC_REQUEST_MORE_LIST_VIDEO_NOW': 0x100017,
    'SC_REQUEST_MORE_LIST_VIDEO_UP_COMING': 0x100018,
    'SC_REQUEST_VIEW_VIDEO': 0x100019,
    'SC_REQUEST_STOP_VIEW_VIDEO': 0x100020,
    'SC_UPDATE_PROFILE': 0x100021,
    'SC_CHANGE_PASSWORD': 0x100022,
    'SC_LIST_SETTING': 0x100023,
    'SC_LOGIN_FB': 0x100024,
    'SC_LOGIN_GOOGLE_PLUS': 0x100025,
    'SC_LIST_CATEGORIES': 0x100026,
    'SC_LIVE_UPCOMING_UPDATE': 0x100027,
    'SC_LIVE_UPCOMING_DELETE': 0x100028,
    'SC_FORGOT_PASSWORD': 0x100029,
    'SC_STOP_LIVE': 0x100030,
    'SC_UPDATE_VIDEO_LIVE': 0x100031,
    'SC_UPDATE_VIDEO_RECORED': 0x100032,
    'SC_SEARCH_VIDEO_BY_NAME': 0x100033,
    'SC_SEARCH_LIVE_BY_NAME': 0x100034,
    'SC_SEARCH_UPCOMING_BY_NAME': 0x100035,
    'SC_LIST_HOT_LIVE': 0x100036,
    'SC_SEARCH_LIVE_UPCOMING_VIDEO_BY_NAME': 0x100037,
    'SC_REQUIRED_LOGIN': 0x100038,
    'SC_REG_GCM_ID': 0x100039,
    'SC_UPDATE_GCM_ID': 0x100040,
    'SC_REPORT_VIDEO': 0x100041,
    'SC_GET_INFO_VIDEO': 0x100042,
    'SC_INPUT_CARD': 0x100043,
    'SC_LIST_TYPE_CARD_MOBILE': 0x100044,
    'SC_LIST_GIFT': 0x100045,
    'SC_TO_GIFTS': 0x100046,
    'SC_REQUEST_INFO_TXU_TVANG': 0x100047,
    'SC_LIST_CARD_MOBILE': 0x100048,
    'SC_TRANSLATE_TO_CARD': 0x100049,
    'SC_LIST_TRANSLATE_CARD_BY_USER_ID': 0x100050,
    'SC_LIST_INPUT_CARD_BY_USER_ID': 0x100051,
    'SC_LIST_TO_GIFTS_BY_USER_ID': 0x100052,
    'SC_LIST_RECEIVER_GIFT_BY_USER_ID': 0x100053,
    'SC_LIST_TOP_INPUT_CARD': 0x100054,
    'SC_LIST_TOP_TO_GIFTS': 0x100055,
    'SC_LIST_TOP_RECEIVER_GIFTS': 0x100056,
    'SC_LIST_TOP_LIKE_USER_LIVE': 0x100057,
    'SC_LIST_TOP_FOLLOW_USER_LIVE': 0x100058,
    'SC_UPDATE_VIDEO_LIVE_CHAT': 0x100059,
    'SC_REQUEST_CANDIDATE': 0x100060,
    'SC_SEND_CANDIDATE': 0x100061
}

com.onesoft.livetube.base.ClientTag = {
    'USER_INFO' : 0x110001
}