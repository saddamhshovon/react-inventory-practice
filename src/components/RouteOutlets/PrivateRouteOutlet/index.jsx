import useAuth from "@/hooks/useAuth";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRouteOutlet() {
  const authenticated = useAuth();
  return authenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
