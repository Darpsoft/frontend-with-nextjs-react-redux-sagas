import { addCookies } from "./cookiesMiddleware";
import { getCookieName } from "./utils";

export const saveState = (hostname, state) => {
  try {
    const serializedState = JSON.stringify(state);
    addCookies(getCookieName(hostname, "storage"), serializedState);
  } catch (err) {
    console.log("Error saving to Cookies", err);
  }
};
