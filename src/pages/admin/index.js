import React, { useEffect } from "react";

import { Wrapper } from "@components/Wrapper";
import Home from "@containers/Home";

import { homeSaga } from "@containers/Home/redux/sagas";
import { homeReducer } from "@containers/Home/redux/reducers";

import injectSaga from "@utils/inject-saga";
import injectReducer from "@utils/inject-reducer";

import { compose } from "redux";
import { useDispatch } from "react-redux";
import { requestHomeStart } from "@containers/Home/redux/actions";

const PageHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initialRequest();
  }, []);

  const initialRequest = async () => {
    dispatch(requestHomeStart());
  };
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
};

const withReducer = injectReducer({ key: "home", reducer: homeReducer });
const withSaga = injectSaga({ key: "home", saga: homeSaga });

export default compose(withSaga, withReducer)(PageHome);
