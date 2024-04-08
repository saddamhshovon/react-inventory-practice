import DeleteModal from "@/components/Modals/DeleteModal";
import ItemsTable from "@/components/Table/ItemsTable";
import useResponse from "@/hooks/useResponse";
import { get } from "@/libraries/axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Items() {
  const [items, dispatchItems] = useResponse();
  const [itemDeleted, dispatchItemDeleted] = useResponse();
  const [deleteUrl, setDeleteUrl] = useState(null);
  const deleteModalRef = useRef(null);

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
  }, [itemDeleted]);
  return (
    <>
      <Link to={"/items/create"}>Create</Link>

      {items.loading && <p>Loading......</p>}

      {items.success ? (
        <ItemsTable
          items={items.data?.data}
          total={items.data?.meta.total}
          deleteModalData={[deleteModalRef, setDeleteUrl]}
        />
      ) : (
        <p>{items.message}</p>
      )}

      <DeleteModal
        message={"Confirm deleting this item?"}
        url={deleteUrl}
        ref={deleteModalRef}
        state={itemDeleted}
        dispatch={dispatchItemDeleted}
      />
    </>
  );
}
