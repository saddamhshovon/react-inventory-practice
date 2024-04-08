import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "@/libraries/axios";
import useResponse from "@/hooks/useResponse";

export default function CreateInventory() {
  const navigate = useNavigate();
  const [response, dispatch] = useResponse();

  const createInventory = async (event) => {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const description = event.target.description.value.trim();

    try {
      dispatch({
        loading: true,
      });

      const inventoryResponse = await post("inventories", {
        name,
        description,
      });

      dispatch({
        loading: false,
        status: inventoryResponse.status,
        message: inventoryResponse.data?.message,
        data: inventoryResponse.data?.data,
      });

      event.target.reset();
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
    if (response.success) {
      navigate("/inventory");
    }
  }, [response]);

  return (
    <>
      <button onClick={() => navigate("/inventory")}>Go back</button>
      {response.message && (
        <p className={response.success ? "text-green-700" : "text-red-700"}>
          {response.message}
        </p>
      )}
      <form onSubmit={createInventory}>
        {response.errors?.name && (
          <p className="text-red-700">{response.errors?.name}</p>
        )}
        <label htmlFor="name">Enter inventory name.</label>
        <input
          type="name"
          name="name"
          id="name"
          placeholder="Inventory name"
          required
        />

        {response.errors?.description && (
          <p className="text-red-700">{response.errors?.description}</p>
        )}
        <label htmlFor="description">Enter inventory description.</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          placeholder="Inventory description"
        ></textarea>

        <button type="submit" disabled={response.loading === true}>
          {response.loading === true ? "Creating..." : "Create"}
        </button>
      </form>
    </>
  );
}
