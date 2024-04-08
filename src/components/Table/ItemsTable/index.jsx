import React from "react";
import ItemRow from "./ItemRow";

export default function ItemsTable({ items, total = 0, deleteModalData }) {
  return (
    <table>
      <thead>
        <tr>
          <td>Id.</td>
          <td>Name</td>
          <td>Description</td>
          <td>Quantity</td>
          <td>Image</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {items && total ? (
          items.map((item) => {
            return (
              <ItemRow
                key={item.id}
                item={item}
                deleteModalData={deleteModalData}
              />
            );
          })
        ) : (
          <tr className="text-black">
            <td colSpan={6} className="px-6 py-3 border-2">
              No Items...
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={6}>Total: {total}</td>
        </tr>
      </tfoot>
    </table>
  );
}
