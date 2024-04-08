import useAuth from "@/hooks/useAuth";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function GuestRouteOutlet() {
  const authenticated = useAuth();
  return !authenticated ? <Outlet /> : <Navigate to="/" />;
}
