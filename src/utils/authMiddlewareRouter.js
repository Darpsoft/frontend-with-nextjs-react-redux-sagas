import redirectTo from "./redirectTo";
import { role } from "./middlewareRole";

// TODO: Aquí se coloca todas las rutas que sean disponibles para todos.
export const availableToAll = ["/_error", "/404"];

// TODO: Todas las rutas que no requieren petición a backend
export const noRequireRequest = ["/registro", "/ingreso", "/logout", "/_error", "/404"];

const AuthMiddlewareRouter = (ctx) => {
  const { pathname, reduxStore: store } = ctx;
  const {
    tokenUser: token,
    dataUser: { userTypeName },
  } = store.getState().auth;
  const auth = () => {
    //eslint-disable-line
    if (!token) {
      redirectTo("/login", { res: ctx.res, status: 301 });
    }
  };

  const authNoNeedLogin = () => {
    if (token) {
      redirectTo(role.getUrl(userTypeName), { res: ctx.res, status: 301 });
    }
  };

  switch (pathname) {
    case "/register":
      authNoNeedLogin();
      return;
    case "/login":
      authNoNeedLogin();
      return;
    case "/logout":
      auth();
      return;
  }

  if (availableToAll.includes(pathname)) return;
  if (pathname.indexOf(role.getUrl(userTypeName)) !== -1) {
    auth();
  } else {
    redirectTo(role.getUrl(userTypeName), { res: ctx.res, status: 301 });
  }
};

export default AuthMiddlewareRouter;
