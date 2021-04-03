import { put, takeLatest, select, all, call } from "redux-saga/effects";
import request, { showMessageError, postOptions, getOptions, getOptionsWithToken, patchOptions } from "@utils/request";
import { setThemeType, setThemeColor, onNavStyleChange } from "../../../redux/actions/settings";
import { showLoader, hideLoader, userSignInSuccess } from "@redux/actions/auth";
import moment from "moment";

import { LandingServices } from "../../../utils/services/landing";
import {
  INITIAL_REQUEST_SOCIETY_START,
  REQUEST_AD_START,
  REQUEST_AD_SUCCESS,
  INITIAL_REQUEST_LANDING_PAGE_START,
  INITIAL_REQUEST_LANDING_PAGE_SUCCESS,
  INITIAL_REQUEST_SOCIETY_SUCCESS,
} from "../../../redux/constants";
import { addCookies } from "../../../utils/cookiesMiddleware";

import { INITIAL_CUSTOMIZATION_REQUEST, THEME_TYPE_DARK, INITIAL_UPDATE_CUSTOMIZATION_START } from "@constants/ThemeSetting";
import { getCookieName } from "@utils/utils";
import { SocietiesServices } from "@utils/services/societies";
/**
 * Landing Page
 */

function insetColorFile(color, theme_type) {
  let colorNode = document.getElementsByClassName("gx-style")[0];
  let themeNode = document.getElementsByClassName("style_dark_theme")[0];

  if (themeNode || colorNode) return;

  if (color) {
    let link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.className = "gx-style";
    link.href = `/css/${color}.css`;
    document.body.appendChild(link);
  }

  if (theme_type === THEME_TYPE_DARK) {
    document.body.classList.add("dark-theme");
    let link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "/css/dark_theme.css";
    link.className = "style_dark_theme";
    document.body.appendChild(link);
  }
}

export function* initialRequestLandingPage({ payload: { resolve, reject } }) {
  let options, url, customizations;
  const landingServices = new LandingServices();
  const societiesServices = new SocietiesServices();
  let {
    auth: {
      dataUser: { customizablePageId, id: userId },
      tokenUser,
    },
  } = yield select((state) => state);
  const storage = yield select((state) => state);
  try {
    yield landingServices.setStorageDefault(storage);
    const services = yield landingServices.getServices();

    yield societiesServices.resetFilter();
    yield societiesServices.setFilterFields({ id: true, name: true, parentId: true });
    yield societiesServices.setFilterRelation([{ relation: "fileStorages", scope: { where: { tag: "societie" } } }]);
    const societies = yield societiesServices.getSocieties();

    const payload = {
      society: storage.auth.society ?? {},
      services: services ?? [],
      landingSocieties: societies,
    };

    if (customizablePageId && tokenUser) {
      url = `${process.env.URL_API}/customizable-page/${customizablePageId}`;
      options = yield getOptionsWithToken(tokenUser);
      customizations = yield call(request, url, options);

      yield insetColorFile(customizations.themeColor, customizations.theme_type);
    } else if (tokenUser) {
      url = `${process.env.URL_API}/customizable-page`;
      options = yield postOptions({ themeType: "THEME_TYPE_SEMI_DARK", navStyle: "NAV_STYLE_FIXED" });
      const { id } = yield call(request, url, options); //eslint-disable-line

      customizablePageId = id;

      url = `${process.env.URL_API}/users/${userId}`;
      options = yield patchOptions({ customizablePageId });
      yield call(request, url, options); //eslint-disable-line

      yield put(userSignInSuccess({ dataUser: { customizablePageId } }));
    }

    yield all([put({ type: INITIAL_CUSTOMIZATION_REQUEST, payload: customizations ?? {} }), put({ type: INITIAL_REQUEST_LANDING_PAGE_SUCCESS, payload })]);
    yield call(resolve, "Se obtuvieron los datos correctamente");
  } catch (err) {
    yield call(reject, "Ocurrió un problema al intentar cargar los datos, se intentará de nuevo...");
    yield showMessageError(err);
  }
}

export function* requestAds() {
  const types = ["bc028bb0-bdeb-4263-94c4-a23aeed18d35", "9d408660-537f-4a0b-b0d4-d8614ec9904c", "3a16bd33-4f71-4795-a0cb-d5726fda3766"];
  let url;

  try {
    const filter = {
      where: {},
      fields: {
        view: true,
        link: true,
        start: true,
        end: true,
        workSpaceId: true,
      },
      include: [
        {
          relation: "workSpace",
          scope: {
            fields: {
              value: true,
            },
          },
        },
      ],
    };

    url = `${process.env.URL_API}/advertises?filter=${JSON.stringify(filter)}`;
    let ads = yield call(request, url);

    ads = ads
      .filter(({ start, end }) => moment(start) <= moment() && moment() <= moment(end))
      .map((item) => {
        if (item.workSpaceId == types[2])
          return {
            ...item,
            type: "header",
          };
        if (item.workSpaceId == types[0] || item.workSpaceId == types[1])
          return {
            ...item,
            type: "lateral",
          };
        return {};
      });

    const payload = { advertysing: ads };

    yield put({ type: REQUEST_AD_SUCCESS, payload });
  } catch (err) {
    yield showMessageError(err);
  }
}

export function* landingPageSaga() {
  yield takeLatest(INITIAL_REQUEST_LANDING_PAGE_START, initialRequestLandingPage);
  yield takeLatest(REQUEST_AD_START, requestAds);
}

/**
 * Dashboard
 */

export function* initialRequestDashboard({ payload: { resolve, reject } }) {
  let customizations, options;

  try {
    let {
      auth: {
        dataUser: { customizablePageId, id: userId },
        tokenUser,
        hostname,
      },
    } = yield select((state) => state);
    let url = `/api/globalStorage`;

    const requestGlobalStorage = yield request(url, getOptions());

    if (customizablePageId) {
      url = `${process.env.URL_API}/customizable-page/${customizablePageId}`;
      options = yield getOptionsWithToken(tokenUser);
      customizations = yield call(request, url, options);

      yield insetColorFile(customizations.themeColor, customizations.theme_type);
    } else {
      url = `${process.env.URL_API}/customizable-page`;
      options = yield postOptions({ themeType: "THEME_TYPE_SEMI_DARK", navStyle: "NAV_STYLE_FIXED" });
      const { id } = yield call(request, url, options); //eslint-disable-line

      customizablePageId = id;

      url = `${process.env.URL_API}/users/${userId}`;
      options = yield patchOptions({ customizablePageId });
      yield call(request, url, options); //eslint-disable-line

      yield put(userSignInSuccess({ dataUser: { customizablePageId } }));
    }

    // yield addCookies(getCookieName(hostname, "societies"), JSON.stringify(requestGlobalStorage.societies));
    yield all([
      put({ type: "RESET_CURRICULUM_VITAE" }),
      put({ type: INITIAL_REQUEST_SOCIETY_SUCCESS, payload: requestGlobalStorage }),
      put({ type: INITIAL_CUSTOMIZATION_REQUEST, payload: customizations ?? {} }),
    ]);
    yield call(resolve, "Se obtuvieron los datos correctamente");
  } catch (err) {
    yield call(reject, "Ocurrió un problema al intentar cargar los datos, se intentará de nuevo...");
    yield showMessageError(err);
  }
}

export function* updateCustomization({ payload }) {
  const { type, value } = payload;
  const {
    auth: {
      dataUser: { customizablePageId },
    },
  } = yield select((state) => state);

  try {
    yield put(showLoader());

    let url = `${process.env.URL_API}/customizable-page/${customizablePageId}`;
    let options = yield patchOptions({ [type]: value });
    yield call(request, url, options);

    switch (type) {
      case "navStyle":
        yield put(onNavStyleChange(value));
        break;
      case "themeColor":
        yield put(setThemeColor(value));
        break;
      case "themeType":
        yield put(setThemeType(value));
        break;
      default:
        break;
    }
    yield put(hideLoader());
  } catch (err) {
    yield showMessageError(err);
    yield put(hideLoader());
  }
}

export function* dashboardSaga() {
  yield takeLatest(INITIAL_REQUEST_SOCIETY_START, initialRequestDashboard);
  yield takeLatest(INITIAL_UPDATE_CUSTOMIZATION_START, updateCustomization);
}
