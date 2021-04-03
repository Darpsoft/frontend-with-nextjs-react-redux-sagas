import React from "react";

import configureStore from "./configure-store";
import throttle from "lodash/throttle";
import { saveState } from "./persistStore";
import middlewareRouterToken from "./authMiddlewareRouter";

import cookies from "next-cookies";
import { get } from "lodash";
import { getCookieName, getHostname } from "./utils";

const isServer = typeof window === "undefined";

export function getOrCreateStore(initialState) {
  if (isServer) {
    return configureStore(initialState);
  }
  const NEXT_REDUX_STORE = getCookieName(window.location.host, "storage");
  if (!window[NEXT_REDUX_STORE]) {
    window[NEXT_REDUX_STORE] = configureStore(initialState);
  }
  return window[NEXT_REDUX_STORE];
}

export const defaultValueStorage = async (ctx, hostname) => {
  const storage = get(cookies(ctx), getCookieName(hostname, "storage"), false);
  return {
    auth: storage.auth,
  };
};

const withReduxStore = (App) => {
  return class Redux extends React.Component {
    static async getInitialProps(appContext) {
      const { ctx, Component } = appContext;
      const hostname = getHostname(ctx.req, true);

      const reduxStore = getOrCreateStore(await defaultValueStorage(appContext.ctx, hostname));
      appContext.ctx.reduxStore = reduxStore;

      // Verificar las rutas disponibles
      middlewareRouterToken(appContext.ctx);

      return {
        pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
        initialReduxState: reduxStore.getState(),
        hostname,
      };
    }

    constructor(props) {
      super(props);
      // eslint-disable-next-line react/prop-types
      this.reduxStore = getOrCreateStore(props.initialReduxState);

      if (!isServer) {
        this.reduxStore.subscribe(
          throttle(() => {
            const states = this.reduxStore.getState();
            saveState(props.hostname, { auth: states.auth });
          }, 200)
        );
      }
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};

export default withReduxStore;
