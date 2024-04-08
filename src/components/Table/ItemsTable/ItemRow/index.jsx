import React from "react";
import ItemRowActions from "./ItemRowActions";

export default function ItemRow({ item, deleteModalData }) {
  return (
    <>
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.quantity}</td>
        <td>
          <img
            src={item.image}
            height={20}
            width={20}
            alt={item.name}
            loading="lazy"
          />
        </td>
        <td>
          <ItemRowActions id={item.id} deleteModalData={deleteModalData} />
        </td>
      </tr>
    </>
  );
}
