import useResponse from "@/hooks/useResponse";
import { get } from "@/libraries/axios";
import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function ShowItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [response, dispatch] = useResponse();

  const getItem = async () => {
    try {
      dispatch({
        loading: true,
      });
      const itemResponse = await get(`items/${id}`);
      dispatch({
        loading: false,
        status: itemResponse.status,
        message: itemResponse.data?.message,
        data: itemResponse.data?.data,
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
    getItem();
  }, []);
  return (
    <>
      <h1>Items</h1>
      <button onClick={() => navigate("/items")}>Go Back</button>
      {response.loading && <p>Loading......</p>}
      {!response.loading && response.success ? (
        <ul key={response.data?.id}>
          <li>Id: {response.data?.id}</li>
          <li>Name: {response.data?.name}</li>
          <li>Description: {response.data?.description}</li>
          <li>Quantity: {response.data?.quantity}</li>
          <li>Created at: {response.data?.created_at}</li>
          <li>
            Image: <img src={response.data?.image} alt={response.data?.name} />
          </li>
          <Link to={`/items/${response.data?.id}/update`}>Update</Link>
        </ul>
      ) : (
        <p>{response.message}</p>
      )}
    </>
  );
}
