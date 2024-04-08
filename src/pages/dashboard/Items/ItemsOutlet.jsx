import React from "react";
import { Outlet } from "react-router-dom";

export default function ItemsOutlet() {
  return (
    <>
      <h1>Items</h1>
      <Outlet />
    </>
  );
}
