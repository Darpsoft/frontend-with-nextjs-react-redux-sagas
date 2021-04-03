import { put, takeLatest, select, all, call } from "redux-saga/effects";
import request, { showMessageError } from "@utils/request";
import { showLoader, hideLoader } from "@redux/actions";
import { UserServices } from "@services/User";
import { REQUEST_HOME_START } from "./constants";
import { requestHomeSuccess } from "./actions";

export function* requestHome({ payload }) {
  try {
    yield put(showLoader());

    const userServices = new UserServices();
    const requestBookins = yield userServices.getBookins();

    yield put(requestHomeSuccess({ data: requestBookins }));
  } catch (err) {
    yield showMessageError(err);
  } finally {
    yield put(hideLoader());
  }
}

export function* homeSaga() {
  yield takeLatest(REQUEST_HOME_START, requestHome);
}
