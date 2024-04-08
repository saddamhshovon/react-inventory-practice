import useResponse from "@/hooks/useResponse";
import { get } from "@/libraries/axios";
import React, { useEffect } from "react";

export default function Inventory() {
  const [inventory, dispatchInventory] = useResponse();

  const getInventory = async () => {
    try {
      dispatchInventory({
        loading: true,
      });
      const inventoryResponse = await get("inventories");
      dispatchInventory({
        loading: false,
        status: inventoryResponse.status,
        message: inventoryResponse.data?.message,
        data: inventoryResponse.data?.data,
      });
    } catch (error) {
      dispatchInventory({
        loading: false,
        status: error.response.status,
        message: error.response.data?.message,
        errors: error.response.data?.errors,
      });
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <>
      {inventory.loading && <p>Loading......</p>}

      {inventory.success ? (
        <ul>
          <li>Id: {inventory.data.id}</li>
          <li>Name: {inventory.data.name}</li>
          <li>Description: {inventory.data.description}</li>
        </ul>
      ) : (
        <p>{inventory.message}</p>
      )}
    </>
  );
}
