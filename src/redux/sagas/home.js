import { put, takeLatest, select, all, call } from "redux-saga/effects";
import request, { showMessageError } from "@utils/request";
import { showLoader, hideLoader } from "@redux/actions";
import { REQUEST_HOME_START } from "@redux/constants";

export function* requestHome() {
  const storage = yield select((state) => state);
  try {
    yield put(showLoader());
  } catch (err) {
    yield showMessageError(err);
  } finally {
    yield put(hideLoader());
  }
}

export default function* productSaga() {
  yield takeLatest(REQUEST_HOME_START, requestHome);
}
