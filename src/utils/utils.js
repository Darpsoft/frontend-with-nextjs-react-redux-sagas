import { get } from "lodash";

/**
 * Get the name of the connected host
 *
 * @param {object} req Request of server
 * @param {bool} trueHost Get the actual route
 *
 * @return {string} Returns name host
 */

export const getHostname = (req, trueHost = false) => {
  let hostname = "localhost";
  if (req) {
    const host = req ? get(req.headers, "x-forwarded-host", req.headers.host) : "";
    hostname = host?.indexOf("localhost") !== -1 && !trueHost ? "localhost" : host;
  }
  return hostname;
};

/**
 *
 * @param {string} hostname Name of hostname
 * @param {string} cookieName Name cookie
 *
 * @return {string} Return cookie name in base64 with slice
 */

export const getCookieName = (hostname, cookieName) => {
  let cookieNameFinished;
  const isServer = typeof window === "undefined";
  const fullCookieName = `${hostname}-${cookieName}`;
  if (isServer) cookieNameFinished = Buffer.from(fullCookieName).toString("base64");
  else cookieNameFinished = btoa(fullCookieName);
  return cookieNameFinished.slice(0, 10);
};
