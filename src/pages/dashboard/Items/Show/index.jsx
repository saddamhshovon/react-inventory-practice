import useResponse from "@/hooks/useResponse";
import { get } from "@/libraries/axios";
import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function ShowItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, dispatchItem] = useResponse();

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
      <button onClick={() => navigate("/items")}>Go Back</button>

      {item.loading && <p>Loading......</p>}

      {item.success ? (
        <ul key={item.data?.id}>
          <li>Id: {item.data?.id}</li>
          <li>Name: {item.data?.name}</li>
          <li>Description: {item.data?.description}</li>
          <li>Quantity: {item.data?.quantity}</li>
          <li>Created at: {item.data?.created_at}</li>
          <li>
            Image: <img src={item.data?.image} alt={item.data?.name} />
          </li>
          <Link to={`/items/${item.data?.id}/update`}>Update</Link>
        </ul>
      ) : (
        <p>{item.message}</p>
      )}
    </>
  );
}
