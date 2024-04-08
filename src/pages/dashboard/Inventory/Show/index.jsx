import DeleteModal from "@/components/Modals/DeleteModal";
import useResponse from "@/hooks/useResponse";
import { get } from "@/libraries/axios";
import React, { useEffect, useRef } from "react";

export default function Inventory() {
  const [inventory, dispatchInventory] = useResponse();
  const [inventoryDeleted, dispatchInventoryDeleted] = useResponse();
  const deleteModalRef = useRef(null);

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
  }, [inventoryDeleted]);

  return (
    <>
      {inventory.loading && <p>Loading......</p>}

      {inventory.success ? (
        <>
          <ul>
            <li>Id: {inventory.data.id}</li>
            <li>Name: {inventory.data.name}</li>
            <li>Description: {inventory.data.description}</li>
          </ul>
          <button onClick={() => deleteModalRef.current.showModal()}>
            Delete
          </button>
        </>
      ) : (
        <p>{inventory.message}</p>
      )}

      <DeleteModal
        message={"Confirm deleting this inventory?"}
        url={"inventories"}
        ref={deleteModalRef}
        state={inventoryDeleted}
        dispatch={dispatchInventoryDeleted}
      />
    </>
  );
}
