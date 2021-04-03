import React, { useEffect } from "react";
import LoadingComponent from "@components/LoadingComponent";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signOutSuccess } from "@redux/actions";

export const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    cerrarSesion();
  }, []);

  const cerrarSesion = async () => {
    await dispatch(signOutSuccess());
    setTimeout(() => {
      router.replace("/login");
    }, 1000);
  };

  return <LoadingComponent title="Estamos cerrando su sesión..." />;
};
export default Logout;
