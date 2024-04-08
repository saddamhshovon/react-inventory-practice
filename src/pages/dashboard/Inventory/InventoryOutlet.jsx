import React from "react";
import { Outlet } from "react-router-dom";

export default function InventoryOutlet() {
  return (
    <>
      <h1>Inventory</h1>
      <Outlet />
    </>
  );
}
