import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "@/libraries/axios";
import useResponse from "@/hooks/useResponse";

export default function UpdateInventory() {
  const navigate = useNavigate();
  const [inventoryUpdateResponse, dispatchInventoryUpdateResponse] =
    useResponse();
  const [inventory, dispatchInventory] = useResponse();

  const updateInventory = async (event) => {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const description = event.target.description.value.trim();

    try {
      dispatchInventoryUpdateResponse({
        loading: true,
      });

      const inventoryResponse = await post("inventories", {
        name,
        description,
      });

      dispatchInventoryUpdateResponse({
        loading: false,
        status: inventoryResponse.status,
        message: inventoryResponse.data?.message,
        data: inventoryResponse.data?.data,
      });

      event.target.reset();

      navigate("/inventory");
    } catch (error) {
      dispatchInventoryUpdateResponse({
        loading: false,
        status: error.response.status,
        message: error.response.data?.message,
        errors: error.response.data?.errors,
      });
    }
  };

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
      <button onClick={() => navigate("/inventory")}>Go back</button>

      {inventory.loading && <p>Loading......</p>}

      {inventory.success ? (
        <>
          {inventoryUpdateResponse.message && (
            <p
              className={
                inventoryUpdateResponse.success
                  ? "text-green-700"
                  : "text-red-700"
              }
            >
              {inventoryUpdateResponse.message}
            </p>
          )}

          <form onSubmit={updateInventory}>
            {inventoryUpdateResponse.errors?.name && (
              <p className="text-red-700">
                {inventoryUpdateResponse.errors?.name}
              </p>
            )}
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Inventory name"
              defaultValue={inventory.data.name}
              required
            />

            {inventoryUpdateResponse.errors?.description && (
              <p className="text-red-700">
                {inventoryUpdateResponse.errors?.description}
              </p>
            )}
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Inventory description"
              defaultValue={inventory.data.description}
            ></textarea>

            <button
              type="submit"
              disabled={inventoryUpdateResponse.loading === true}
            >
              {inventoryUpdateResponse.loading === true
                ? "Updating..."
                : "Update"}
            </button>
          </form>
        </>
      ) : (
        <p>{inventory.message}</p>
      )}
    </>
  );
}
