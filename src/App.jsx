import { Routes, Route } from "react-router-dom";

import GuestRouteOutlet from "./components/RouteOutlets/GuestRouteOutlet";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

import PrivateRouteOutlet from "@/components/RouteOutlets/PrivateRouteOutlet";

import Dashboard from "@/pages/dashboard/Dashboard";

import InventoryOutlet from "@/pages/dashboard/Inventory/InventoryOutlet";
import Inventory from "@/pages/dashboard/Inventory/Show";
import CreateInventory from "@/pages/dashboard/Inventory/Create";
import UpdateInventory from "@/pages/dashboard/Inventory/Update";

import ItemsOutlet from "@/pages/dashboard/Items/ItemsOutlet";
import Items from "@/pages/dashboard/Items/Index";
import ShowItem from "@/pages/dashboard/Items/Show";
import CreateItem from "@/pages/dashboard/Items/Create";
import UpdateItem from "@/pages/dashboard/Items/Update";

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
            <Route path="create" element={<CreateItem />} />
            <Route path=":id" element={<ShowItem />} />
            <Route path=":id/update" element={<UpdateItem />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
