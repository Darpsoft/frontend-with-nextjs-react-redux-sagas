import { put, takeLatest, select, all, call } from "redux-saga/effects";
import request, { showMessageError } from "@utils/request";
import { showLoader, hideLoader } from "@redux/actions";
import { UserServices } from "@services/User";
import { REQUEST_HOME_START } from "./constants";

export function* requestHome({ payload }) {
  console.log("🚀 ~ file: home.js ~ line 7 ~ function*requestHome ~ payload", payload);
  const storage = yield select((state) => state);
  const userServices = new UserServices();
  try {
    yield put(showLoader());
    userServices.getBookins();
  } catch (err) {
    yield showMessageError(err);
  } finally {
    yield put(hideLoader());
  }
}

export function* homeSaga() {
  yield takeLatest(REQUEST_HOME_START, requestHome);
}
