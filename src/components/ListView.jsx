import { useState } from "react";
import edit from "../assets/edit.svg";
import deleteBtn from "../assets/delete.svg";

import "./ListView.css";
function ListView({ products = [], onEdit, onDelete }) {
  const visibleProducts = products;
  return (
    <main>
      <div className="products-container">
        <div className="list-style">
          <div className="table-container">
            <table className="products-table">
              {visibleProducts.length > 0 && (
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
              )}

              <tbody>
                {visibleProducts.map((product, i) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                      <span>{product.category}</span>
                    </td>
                    <td>₹{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.description}</td>
                    <td>
                      <div className="action-btns">
                        <button
                          onClick={() => {
                            onEdit(i);
                          }}
                          className="edit-btn">
                          <img src={edit}></img>
                        </button>
                        <button
                          onClick={() => {
                            onDelete(i);
                          }}
                          className="delete-btn">
                          <img src={deleteBtn}></img>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ListView;
