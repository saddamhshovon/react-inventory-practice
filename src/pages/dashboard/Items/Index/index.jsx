import useResponse from "@/hooks/useResponse";
import { get } from "@/libraries/axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Items() {
  const [items, dispatchItems] = useResponse();

  const getItems = async () => {
    try {
      dispatchItems({
        loading: true,
      });
      const itemsResponse = await get("items");
      dispatchItems({
        loading: false,
        status: itemsResponse.status,
        message: itemsResponse.data?.message,
        data: itemsResponse.data,
      });
    } catch (error) {
      dispatchItems({
        loading: false,
        status: error.response.status,
        message: error.response.data?.message,
        errors: error.response.data?.errors,
      });
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <Link to={"/items/create"}>Create</Link>

      {items.loading && <p>Loading......</p>}

      {items.success ? (
        items.data?.data.length ? (
          items.data?.data.map((item) => {
            return (
              <ul key={item.id}>
                <li>Id: {item.id}</li>
                <li>Name: {item.name}</li>
                <li>Description: {item.description}</li>
                <li>Quantity: {item.quantity}</li>
                <li>Created at: {item.created_at}</li>
                <li>
                  Image: <img src={item.image} alt={item.name} />
                </li>
                <Link to={`/items/${item.id}`}>View</Link>
                <Link to={`/items/${item.id}/update`}>Update</Link>
              </ul>
            );
          })
        ) : (
          <p>You don't have any items.</p>
        )
      ) : (
        <p>{items.message}</p>
      )}
    </>
  );
}
