import { put, takeLatest, select, all, call } from "redux-saga/effects";
import request, { getOptionsWithToken, postOptions, showMessageError, postOptionsWithoutToken, patchOptions } from "@utils/request";

import { showLoader, hideLoader, loginSuccess } from "@redux/actions";
import { LOGIN_START } from "@redux/constants";

export function* Login({ payload }) {
  let url, options;
  try {
    // yield put(showLoader());

    // url = `${Config.URL_API}/users/login`;
    // options = postOptions({ ...payload, celphone: parseInt(payload.celphone) });
    // const requestToken = yield call(request, url, options);

    // filter.where.celphone = parseInt(payload.celphone);
    // url = `${Config.URL_API}/users?filter=${JSON.stringify(filter)}`;
    // options = getOptionsWithToken(requestToken.token);
    // const requestUser = yield call(request, url, options);

    // yield all([put(loginSuccess({ tokenUser: requestToken.token, dataUser: requestUser[0] })), put(hideLoader())]);
  } catch (err) {
    yield put(hideLoader());
    yield showMessageError(err);
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_START, Login);
}
