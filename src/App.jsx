import { Routes, Route } from "react-router-dom";

import GuestRouteOutlet from "./components/RouteOutlets/GuestRouteOutlet";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

import PrivateRouteOutlet from "@/components/RouteOutlets/PrivateRouteOutlet";

import Dashboard from "@/pages/inventory/Dashboard";

import InventoryOutlet from "@/pages/inventory/Inventory/InventoryOutlet";
import Inventory from "@/pages/inventory/Inventory/Show";
import CreateInventory from "@/pages/inventory/Inventory/Create";
import UpdateInventory from "@/pages/inventory/Inventory/Update";

import ItemsOutlet from "@/pages/inventory/Items/ItemsOutlet";
import Items from "@/pages/inventory/Items/Index";
import ShowItem from "@/pages/inventory/Items/Show";
import CreateItem from "@/pages/inventory/Items/Create";
import UpdateItem from "@/pages/inventory/Items/Update";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<GuestRouteOutlet />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route element={<PrivateRouteOutlet />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="inventory/*" element={<InventoryOutlet />}>
            <Route path="" element={<Inventory />} />
            <Route path="create" element={<CreateInventory />} />
            <Route path="update" element={<UpdateInventory />} />
          </Route>

          <Route path="items/*" element={<ItemsOutlet />}>
            <Route path="" element={<Items />} />
            <Route path=":id" element={<ShowItem />} />
            <Route path=":id/create" element={<CreateItem />} />
            <Route path=":id/update" element={<UpdateItem />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
