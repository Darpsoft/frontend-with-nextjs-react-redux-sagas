import redirectTo from "./redirectTo";
import { role } from "./middlewareRole";

// TODO: Huascar, aquí colocas todas las rutas que sean disponibles para todos.
export const availableToAll = [
  "/libro/[bookId]",
  "/curso/[productId]",
  "/tramite/[productId]",
  "/noticia/[postId]",
  "/entidad/[commerceId]",
  "/pagar/[productId]",
  "/perfil-bolsa-trabajo/[curriculumId]",
  "/certificado/[enrollmentId]",
  "/pago/[paymentId]",
  "/cursos",
  "/noticias",
  "/ofertas",
  "/entidades",
  "/entidad",
  "/bolsas-trabajo",
  "/biblioteca-virtual",
  "/tramites",
  "/curriculums",
  "/negocios",
  "/",
  "/_error",
  "/404"
];

// TODO: Todas las rutas que no requieren petición al backend
export const noRequireRequest = [
  "/registro",
  "/ingreso",
  "/nueva-contrasena",
  "/olvide-contrasena",
  "/terminos-condiciones",
  "/cpanel/signup",
  "/cpanel",
  "/logout",
  "/fast-login",
  "/_error",
  "/404"
];

export const routerLandingAvailable = [];

const AuthMiddlewareRouter = (ctx) => {
  const { pathname, reduxStore: store } = ctx;
  const {
    tokenUser: token,
    dataUser: { userTypeName },
  } = store.getState().auth;
  const auth = () => {
    //eslint-disable-line
    if (!token) {
      redirectTo("/ingreso", { res: ctx.res, status: 301 });
    }
  };

  const authNoNeedLogin = () => {
    if (token) {
      redirectTo(role.getUrl(userTypeName), { res: ctx.res, status: 301 });
    }
  };

  switch (pathname) {
    case "/fast-login":
      authNoNeedLogin();
      return;
    case "/registro":
      authNoNeedLogin();
      return;
    case "/ingreso":
      authNoNeedLogin();
      return;
    case "/nueva-contrasena":
      authNoNeedLogin();
      return;
    case "/olvide-contrasena":
      authNoNeedLogin();
      return;
    case "/terminos-condiciones":
      authNoNeedLogin();
      return;
    case "/cpanel/signup":
      authNoNeedLogin();
      return;
    case "/cpanel":
      authNoNeedLogin();
    case "/logout":
      auth();
      return;
    case "/perfil":
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
