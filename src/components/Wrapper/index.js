import React from "react";

export const Wrapper = ({ children, isAuth = true }) => {
  if (!isAuth) {
    return <>{children}</>;
  }
  return <>{children}</>;
};
