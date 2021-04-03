/* eslint-disable import/no-unresolved */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-props-no-spreading */

import "public/styles/style.css";

import App from "next/app";
import { Provider } from "react-redux";
import reduxStorage from "@redux/index";
import Head from "next/head";

import NProgress from "nprogress";
import Router from "next/router";

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

export const storage = reduxStorage();

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Interfell</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Provider store={storage}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
