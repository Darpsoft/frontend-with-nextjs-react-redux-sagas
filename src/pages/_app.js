/* eslint-disable import/no-unresolved */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-props-no-spreading */

import "public/styles/style.css";
import "nprogress/nprogress.css";
// import "antd/dist/antd.css";

import Head from "next/head";

import NProgress from "nprogress";
import Router from "next/router";

import withReduxStore from "@utils/with-redux-store";
import { Provider } from "react-redux";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps, reduxStore }) {
  return (
    <>
      <Head>
        <title>Interfell</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default withReduxStore(MyApp);
