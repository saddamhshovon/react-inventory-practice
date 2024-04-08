import useResponse from "@/hooks/useResponse";
import { get } from "@/libraries/axios";
import React, { useEffect } from "react";

export default function Inventory() {
  const [response, dispatch] = useResponse();

  const getInventory = async () => {
    try {
      dispatch({
        loading: true,
      });
      const inventoryResponse = await get("inventories");
      dispatch({
        loading: false,
        status: inventoryResponse.status,
        message: inventoryResponse.data?.message,
        data: inventoryResponse.data?.data,
      });
    } catch (error) {
      dispatch({
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
      <h1>Inventory</h1>
      {response.loading && <p>Loading......</p>}
      {!response.loading && response.success ? (
        <ul>
          <li>Id: {response.data.id}</li>
          <li>Name: {response.data.name}</li>
          <li>Description: {response.data.description}</li>
        </ul>
      ) : (
        <p>{response.message}</p>
      )}
    </>
  );
}
