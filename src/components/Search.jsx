import { useEffect, useState, useRef } from "react";
import "./Search.css";

function Search({ onCancel, onSave, editingProduct, submit }) {
  const [submitted, setSubmitted] = useState(false);
  const boxRef = useRef(null);

  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function cancelHandle() {
    setSubmitted(false);
    onCancel();
  }

  useEffect(() => {
    function outsideClick(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        cancelHandle();
      }
    }
    document.addEventListener("mousedown", outsideClick);
    return () => document.removeEventListener("mousedown", outsideClick);
  }, []);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        id: editingProduct.id ?? null,
        name: editingProduct.name ?? "",
        price: editingProduct.price ?? "",
        stock: editingProduct.stock ?? "",
        category: editingProduct.category ?? "",
        description: editingProduct.description ?? "",
      });
    } else {
      setForm({
        id: null,
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
      });
    }
    setSubmitted(false);
  }, [editingProduct]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    if (!form.name || !form.category || Number(form.price) <= 0) return;
    if (Number(form.stock) < 0) return;

    onSave({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });

    submit(false);
    onCancel();
  }

  return (
    <div className="search-container">
      <form ref={boxRef} className="search-box" onSubmit={handleSubmit}>
        <h2 className="modal-title">
          {editingProduct ? "Edit A Product" : "Add New Product"}
        </h2>

        <div className="form-group">
          <label>Name *</label>
          <input
            name="name"
            value={form.name}
            placeholder="Product Name"
            onChange={handleChange}
          />
          {submitted && !form.name && (
            <span className="error-text">Name is required</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price *</label>
            <input
              name="price"
              type="number"
              value={form.price}
              placeholder="0.00"
              onChange={handleChange}
            />
            {submitted && Number(form.price) <= 0 && (
              <span className="error-text">Valid price required</span>
            )}
          </div>

          <div className="form-group">
            <label>Stock *</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="0"
            />
            {submitted && Number(form.stock) <= 0 && (
              <span className="error-text">Invalid stock</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Category *</label>
          <input
            name="category"
            value={form.category}
            placeholder=""
            onChange={handleChange}
          />
          {submitted && !form.category && (
            <span className="error-text">Category is required</span>
          )}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="modal-actions">
          <button type="button" onClick={cancelHandle} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
