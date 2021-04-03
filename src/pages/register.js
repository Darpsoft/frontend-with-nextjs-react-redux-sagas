import React from "react";

import { Wrapper } from "@components/Wrapper";
import Register from "@containers/Register";

const PageLogin = () => {
  return (
    <Wrapper isAuth={false}>
      <Register />
    </Wrapper>
  );
};

export default PageLogin;
