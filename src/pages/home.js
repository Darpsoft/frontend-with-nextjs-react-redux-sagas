import { Wrapper } from "@components/Wrapper";
import Home from "@containers/Home";
import { requestHomeStart } from "@redux/actions";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

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

export default PageHome;
