import React, { useEffect } from "react";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { compose } from "redux";

import injectSaga from "@utils/inject-saga";
import { authSaga } from "@redux/sagas/auth";

const Main = ({ component: Component, pageProps }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    initialRequest();
  }, [router.asPath]);

  const initialRequest = async () => {
    try {
      // Realizar alguna acción cuando se cambie de ruta
      // dispatch()
    } catch (error) {
      console.log(error);
    }
  };

  return <Component {...pageProps} />;
};

const withSaga = injectSaga({ key: "auth", saga: authSaga });

export default compose(withSaga)(Main);
