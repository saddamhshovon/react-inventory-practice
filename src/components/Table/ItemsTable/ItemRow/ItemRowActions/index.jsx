import React from "react";
import { useNavigate } from "react-router-dom";

export default function ItemRowActions({ id, deleteModalData }) {
  const navigate = useNavigate();
  const [modalRef, setUrl] = deleteModalData;
  const handleDelete = () => {
    setUrl(`/items/${id}`);
    modalRef.current.showModal();
  };
  return (
    <>
      <button onClick={() => navigate(`/items/${id}`)}>View</button>
      <button onClick={() => navigate(`/items/${id}/update`)}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
