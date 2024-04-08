import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "@/libraries/axios";
import useResponse from "@/hooks/useResponse";

export default function CreateItem() {
  const navigate = useNavigate();
  const [response, dispatch] = useResponse();

  const createItem = async (event) => {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const description = event.target.description.value.trim();
    const quantity = event.target.quantity.value.trim();
    const image = event.target.image.files[0];

    try {
      dispatch({
        loading: true,
      });

      const itemResponse = await post(
        "items",
        {
          name,
          description,
          quantity,
          image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch({
        loading: false,
        status: itemResponse.status,
        message: itemResponse.data?.message,
        data: itemResponse.data?.data,
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

  useEffect(() => {}, [response]);

  return (
    <>
      <button onClick={() => navigate("/items")}>Go back</button>

      {response.message && (
        <p className={response.success ? "text-green-700" : "text-red-700"}>
          {response.message}
        </p>
      )}

      <form onSubmit={createItem}>
        {response.errors?.name && (
          <p className="text-red-700">{response.errors?.name}</p>
        )}
        <label htmlFor="name">Enter item name.</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Item name"
          required
        />

        {response.errors?.description && (
          <p className="text-red-700">{response.errors?.description}</p>
        )}
        <label htmlFor="description">Enter item description.</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          placeholder="Item description"
        ></textarea>

        {response.errors?.quantity && (
          <p className="text-red-700">{response.errors?.quantity}</p>
        )}
        <label htmlFor="name">Enter item quantity.</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          placeholder="Item quantity"
          required
        />

        {response.errors?.image && (
          <p className="text-red-700">{response.errors?.image}</p>
        )}
        <label htmlFor="name">Upload item image.</label>
        <input type="file" name="image" id="image" required />

        <button type="submit" disabled={response.loading === true}>
          {response.loading === true ? "Creating..." : "Create"}
        </button>
      </form>
    </>
  );
}
