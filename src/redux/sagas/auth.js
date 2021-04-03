import { put, takeLatest, select, all, call } from "redux-saga/effects";
import request, { getOptionsWithToken, postOptions, showMessageError, postOptionsWithoutToken, patchOptions } from "@utils/request";

import { showLoader, hideLoader, loginSuccess } from "@redux/actions";
import { LOGIN_START } from "@redux/constants";

export function* Login({ payload }) {
  console.log("🚀 ~ file: auth.js ~ line 8 ~ function*Login ~ payload", payload);
  let url, options;
  try {
    yield put(showLoader());

    url = `${process.env.NEXT_PUBLIC_URL_API}/rest/user/${payload.user}`;
    options = postOptions({ ...payload, URL: APP_BCK });
    const requestLogin = yield call(request, url, options);
    console.log("🚀 ~ file: auth.js ~ line 16 ~ function*Login ~ requestLogin", requestLogin);

    // filter.where.celphone = parseInt(payload.celphone);
    // url = `${Config.URL_API}/users?filter=${JSON.stringify(filter)}`;
    // options = getOptionsWithToken(requestToken.token);
    // const requestUser = yield call(request, url, options);

    // yield all([put(loginSuccess({ tokenUser: requestToken.token, dataUser: requestUser[0] })), put(hideLoader())]);
  } catch (err) {
    yield showMessageError(err);
  } finally {
    yield put(hideLoader());
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_START, Login);
}
