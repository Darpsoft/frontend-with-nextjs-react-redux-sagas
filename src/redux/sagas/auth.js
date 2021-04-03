import { put, takeLatest, select, all, call } from "redux-saga/effects";
import request, { postOptionsWithoutToken, putOptionsWithoutToken } from "@utils/request";

import { showLoader, hideLoader, loginSuccess } from "@redux/actions";
import { LOGIN_START, REGISTER_START } from "@redux/constants";
import { message } from "antd";

export function* Login({ payload: { password, email } }) {
  try {
    yield put(showLoader());

    const url = `${process.env.NEXT_PUBLIC_URL_API}/rest/user/${email}`;
    const options = putOptionsWithoutToken({}, "PUT", { App: "APP_BCK", Password: password });
    const requestLogin = yield call(request, url, options);
    const userTypeName = requestLogin.userRole.userRole;

    // En este caso solo se utilizará en token {sessionTokenBck}
    yield all([put(loginSuccess({ tokenUser: requestLogin.sessionTokenBck, dataUser: { ...requestLogin, userTypeName } }))]);
    yield call(Router.push, goBack ? atob(goBack) : role.getUrl(userTypeName));
  } catch (err) {
    message.error("Datos incorrectos");
  } finally {
    yield put(hideLoader());
  }
}

export function* Register({ payload: { password, email, ...payload } }) {
  let url, options;
  try {
    yield put(showLoader());

    url = `${process.env.NEXT_PUBLIC_URL_API}/rest/user/${email}`;
    options = postOptionsWithoutToken(payload, "POST", { App: "APP_BCK", Password: password });
    const requestRegister = yield call(request, url, options);

    // filter.where.celphone = parseInt(payload.celphone);
    // url = `${Config.URL_API}/users?filter=${JSON.stringify(filter)}`;
    // options = getOptionsWithToken(requestToken.token);
    // const requestUser = yield call(request, url, options);

    // yield all([put(registerSuccess({ tokenUser: requestToken.token, dataUser: requestUser[0] }))]);
  } catch (err) {
    message.error("Al parecer hubo un error");
  } finally {
    yield put(hideLoader());
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN_START, Login);
  yield takeLatest(REGISTER_START, Register);
}
