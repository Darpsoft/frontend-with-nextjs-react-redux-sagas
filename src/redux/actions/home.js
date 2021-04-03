import {
    REQUEST_HOME_TYPE_START,
    REQUEST_HOME_TYPE_SUCCESS,
} from "@redux/constants";

export const fetchHomeDateStart = (payload) => ({
    type: REQUEST_HOME_DATE_START,
    payload,
});
export const fetchHomeDateSuccess = (payload) => ({
    type: REQUEST_HOME_DATE_SUCCESS,
    payload,
});

export const fetchHomeStateStart = (payload) => ({
    type: REQUEST_HOME_STATE_START,
    payload,
});
export const fetchHomeStateSuccess = (payload) => ({
    type: REQUEST_HOME_STATE_SUCCESS,
    payload,
});

export const fetchHomeBuyStart = (payload) => ({
    type: REQUEST_HOME_BUY_START,
    payload,
});
export const fetchHomeBuySuccess = (payload) => ({
    type: REQUEST_HOME_BUY_SUCCESS,
    payload,
});

export const fetchHomeSaleStart = (payload) => ({
    type: REQUEST_HOME_SALE_START,
    payload,
});
export const fetchHomeSaleSuccess = (payload) => ({
    type: REQUEST_HOME_SALE_SUCCESS,
    payload,
});