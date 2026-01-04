import empty from "../assets/empty.svg";
import "./GridView.css";

function GridView({ products, onEdit, onDelete }) {
  const visibleProducts = products || [];
  return (
    <div className="grid-product-container">
      <div className="grid-style">
        {visibleProducts.map((product, i) => (
          <div className="product-card" key={product.id}>
            <div className="card-header">
              <h3 className="product-name">{product.name}</h3>
              <span className="product-category">{product.category}</span>
            </div>

            <div className="card-body">
              <p className="product-price">₹{product.price}</p>
              <p className="product-stock">Stock:{product.stock} </p>
              <p className="product-description">{product.description}</p>
            </div>

            <div className="card-actions">
              <button
                className="grid-edit-btn"
                onClick={() => {
                  onEdit(i);
                }}>
                Edit
              </button>
              <button
                className="grid-delete-btn"
                onClick={() => {
                  onDelete(i);
                }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GridView;
