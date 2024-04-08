import useResponse from "@/hooks/useResponse";
import { get } from "@/libraries/axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Items() {
  const [response, dispatch] = useResponse();

  const getItems = async () => {
    try {
      dispatch({
        loading: true,
      });
      const itemsResponse = await get("items");
      dispatch({
        loading: false,
        status: itemsResponse.status,
        message: itemsResponse.data?.message,
        data: itemsResponse.data,
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
    getItems();
  }, []);
  return (
    <>
      <h1>Items</h1>
      {response.loading && <p>Loading......</p>}
      {!response.loading && response.success ? (
        response.data?.data.map((item) => {
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
        <p>{response.message}</p>
      )}
    </>
  );
}
