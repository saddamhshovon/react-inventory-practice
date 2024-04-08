import { del } from "@/libraries/axios";
import React, { forwardRef, useState } from "react";

const DeleteModal = forwardRef(
  ({ message = "Are you sure?", url, state, dispatch }, ref) => {
    const handleConfirm = async () => {
      try {
        dispatch({
          loading: true,
        });

        const deleteResponse = await del(url);

        dispatch({
          loading: false,
          status: deleteResponse.status,
          message: deleteResponse.data?.message,
          data: deleteResponse.data?.data,
        });

        ref.current.close();
      } catch (error) {
        dispatch({
          loading: false,
          status: error.response.status,
          message: error.response.data?.message,
          errors: error.response.data?.errors,
        });
      }
    };
    return (
      <dialog ref={ref}>
        <p>{message}</p>
        <button onClick={() => ref.current.close()}>Cancel</button>
        <button onClick={handleConfirm} disabled={state.loading === true}>
          {state.loading === true ? "Deleting..." : "Confirm"}
        </button>
      </dialog>
    );
  }
);

export default DeleteModal;
