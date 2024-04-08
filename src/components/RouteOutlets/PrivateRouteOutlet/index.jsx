import useAuth from "@/hooks/useAuth";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRouteOutlet() {
  const authenticated = useAuth();
  return authenticated ? (
    <>
      <nav>
        <ul>
          <li>Nav 1</li>
          <li>Nav 2</li>
          <li>Nav 3</li>
          <li>Nav 4</li>
        </ul>
      </nav>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
