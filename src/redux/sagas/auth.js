import { put, takeLatest, select, all, call } from "redux-saga/effects";
import request, { postOptionsWithoutToken, putOptionsWithoutToken } from "@utils/request";

import { showLoader, hideLoader, loginSuccess } from "@redux/actions";
import { LOGIN_START, REGISTER_START } from "@redux/constants";
import { message } from "antd";
import Router from "next/router";
import { role } from "@utils/middlewareRole";

export function* Login({ payload: { password, email } }) {
  try {
    yield put(showLoader());

    const url = `${process.env.NEXT_PUBLIC_URL_API}/rest/user/${email}`;
    const options = putOptionsWithoutToken({}, "PUT", { App: "APP_BCK", Password: password });
    const requestLogin = yield call(request, url, options);

    // Se quito porque no tengo los niveles de usuarios
    // const userTypeName = requestLogin.userRole.userRole;
    const userTypeName = "ADMIN";

    // En este caso solo se utilizará en token {sessionTokenBck}
    yield all([put(loginSuccess({ tokenUser: requestLogin.sessionTokenBck, dataUser: { ...requestLogin, userTypeName, app: "APP_BCK" } }))]);
    yield call(Router.push, role.getUrl(userTypeName));
    yield message.success("Login Successful.");
  } catch (err) {
    console.log("🚀 ~ file: auth.js ~ line 21 ~ function*Login ~ err", err);
    message.error("Datos incorrectos");
  } finally {
    yield put(hideLoader());
  }
}

export function* Register({ payload: { password, email, ...payload } }) {
  let url, options;
  try {
    yield put(showLoader());

    url = `${process.env.NEXT_PUBLIC_URL_API}/rest/user/${email}?firstname=${payload.firstName}&lastname=${payload.lastName}&phoneNumber=${payload.phoneNumber}`;
    options = postOptionsWithoutToken({}, "POST", { App: "APP_BCK", Password: password });
    const requestRegister = yield call(request, url, options);

    // Se quito porque no tengo los niveles de usuarios
    // const userTypeName = requestRegister.userRole.userRole;
    const userTypeName = "ADMIN";

    // En este caso solo se utilizará en token {sessionTokenBck}
    yield all([put(loginSuccess({ tokenUser: requestRegister.sessionTokenBck, dataUser: { ...requestRegister, userTypeName, app: "APP_BCK" } }))]);
    yield call(Router.push, role.getUrl(userTypeName));
    yield message.success("Register Successful.");
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
