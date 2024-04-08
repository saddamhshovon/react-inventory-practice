import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, post } from "@/libraries/axios";
import useResponse from "@/hooks/useResponse";

export default function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemUpdateResponse, dispatchItemUpdateResponse] = useResponse();
  const [item, dispatchItem] = useResponse();

  const updateItem = async (event) => {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const description = event.target.description.value.trim();
    const quantity = event.target.quantity.value.trim();
    const image = event.target.image?.files[0];

    try {
      dispatchItemUpdateResponse({
        loading: true,
      });

      const itemResponse = await post(
        `items/${id}`,
        {
          _method: "PUT",
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

      dispatchItemUpdateResponse({
        loading: false,
        status: itemResponse.status,
        message: itemResponse.data?.message,
        data: itemResponse.data?.data,
      });

      event.target.reset();

      navigate(`/items/${id}`);
    } catch (error) {
      dispatchItemUpdateResponse({
        loading: false,
        status: error.response.status,
        message: error.response.data?.message,
        errors: error.response.data?.errors,
      });
    }
  };

  const getItem = async () => {
    try {
      dispatchItem({
        loading: true,
      });
      const itemResponse = await get(`items/${id}`);
      dispatchItem({
        loading: false,
        status: itemResponse.status,
        message: itemResponse.data?.message,
        data: itemResponse.data?.data,
      });
    } catch (error) {
      dispatchItem({
        loading: false,
        status: error.response.status,
        message: error.response.data?.message,
        errors: error.response.data?.errors,
      });
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <>
      <button onClick={() => navigate("/items")}>Go back</button>

      {item.loading && <p>Loading......</p>}

      {item.success ? (
        <>
          {itemUpdateResponse.message && (
            <p
              className={
                itemUpdateResponse.success ? "text-green-700" : "text-red-700"
              }
            >
              {itemUpdateResponse.message}
            </p>
          )}

          <form onSubmit={updateItem}>
            {itemUpdateResponse.errors?.name && (
              <p className="text-red-700">{itemUpdateResponse.errors?.name}</p>
            )}
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Item name"
              defaultValue={item.data.name}
              required
            />

            {itemUpdateResponse.errors?.description && (
              <p className="text-red-700">
                {itemUpdateResponse.errors?.description}
              </p>
            )}
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Item description"
              defaultValue={item.data.description}
            ></textarea>

            {itemUpdateResponse.errors?.quantity && (
              <p className="text-red-700">
                {itemUpdateResponse.errors?.quantity}
              </p>
            )}
            <label htmlFor="name">Quantity:</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              placeholder="Item quantity"
              defaultValue={item.data.quantity}
              required
            />

            {itemUpdateResponse.errors?.image && (
              <p className="text-red-700">{itemUpdateResponse.errors?.image}</p>
            )}
            <label htmlFor="name">Upload image.</label>
            <input type="file" name="image" id="image" />

            <button
              type="submit"
              disabled={itemUpdateResponse.loading === true}
            >
              {itemUpdateResponse.loading === true ? "Updating..." : "Update"}
            </button>
          </form>
        </>
      ) : (
        <p>{item.message}</p>
      )}
    </>
  );
}
