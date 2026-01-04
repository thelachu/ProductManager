import { useEffect, useState } from "react";
import "./App.css";
import GridView from "./components/GridView.jsx";
import Header from "./components/Header.jsx";
import ListView from "./components/ListView.jsx";
import Toolbar from "./components/Toolbar.jsx";
import Search from "./components/Search.jsx";
import Empty from "./components/Empty.jsx";
import Pagenation from "./Pagination.jsx";

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Men Shirt",
      category: "Men",
      price: 999,
      stock: 10,
      description: "Cotton casual shirt",
    },
    {
      id: 2,
      name: "Women Kurti",
      category: "Women",
      price: 1299,
      stock: 5,
      description: "Printed ethnic kurti",
    },
    {
      id: 3,
      name: "Jeans",
      category: "Men",
      price: 1799,
      stock: 8,
      description: "Slim fit denim jeans",
    },
    {
      id: 4,
      name: "T-Shirt",
      category: "Men",
      price: 599,
      stock: 20,
      description: "Round neck cotton t-shirt",
    },
    {
      id: 5,
      name: "Saree",
      category: "Women",
      price: 2499,
      stock: 3,
      description: "Silk traditional saree",
    },
    {
      id: 6,
      name: "Shoes",
      category: "Footwear",
      price: 2999,
      stock: 6,
      description: "Running sports shoes",
    },
    {
      id: 7,
      name: "Sandals",
      category: "Footwear",
      price: 899,
      stock: 12,
      description: "Comfortable daily wear sandals",
    },
    {
      id: 8,
      name: "Watch",
      category: "Accessories",
      price: 1999,
      stock: 4,
      description: "Analog wrist watch",
    },
    {
      id: 9,
      name: "Backpack",
      category: "Bags",
      price: 1499,
      stock: 7,
      description: "Laptop travel backpack",
    },
    {
      id: 10,
      name: "Cap",
      category: "Accessories",
      price: 399,
      stock: 15,
      description: "Adjustable cotton cap",
    },
    {
      id: 11,
      name: "Hoodie",
      category: "Men",
      price: 1599,
      stock: 9,
      description: "Winter fleece hoodie",
    },
    {
      id: 12,
      name: "Leggings",
      category: "Women",
      price: 699,
      stock: 14,
      description: "Stretchable cotton leggings",
    },
    {
      id: 13,
      name: "Formal Shoes",
      category: "Footwear",
      price: 2499,
      stock: 5,
      description: "Leather office wear shoes",
    },
    {
      id: 14,
      name: "Sunglasses",
      category: "Accessories",
      price: 1199,
      stock: 11,
      description: "UV protected sunglasses",
    },
    {
      id: 15,
      name: "Handbag",
      category: "Bags",
      price: 1899,
      stock: 6,
      description: "Stylish women handbag",
    },
  ]);

  const [view, setView] = useState("list");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  //view list or grid
  function showGrid() {
    setView("grid");
  }

  function showList() {
    setView("list");
  }
  //delete a product
  function onDelete(index) {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  }

  function onSave(form) {
    if (editingIndex !== null) {
      setProducts((prev) =>
        prev.map((p, i) => (i === editingIndex ? form : p))
      );
    } else {
      setProducts((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setEditingIndex(null);
    setEditingProduct(null);
    setSubmitted(false);
  }
  //Search handle
  function searchHandle(e) {
    setSearchText(e.target.value);
    setCurrentPage(1);
  }
  //search visbile products for time
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  const filteredProducts =
    debouncedSearch.trim() === ""
      ? products
      : products.filter((p) =>
          p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, endIndex);

  function addProduct() {
    setEditingProduct(null);
    setEditingIndex(null);
    setSubmitted(true);
  }
  // to hanndle resize for mobile and tabs to change list and grid
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setView("grid");
      } else {
        setView("list");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onCancel() {
    setEditingIndex(null);
    setEditingProduct(null);
    setSubmitted(false);
  }
  //to edit a product
  function onEdit(index) {
    setEditingProduct(visibleProducts[index]);
    setEditingIndex(
      products.findIndex((p) => p.id === visibleProducts[index].id)
    );
    setSubmitted(true);
  }

  function submit(s) {
    setSubmitted(s);
  }

  return (
    <>
      <Header />
      <Toolbar
        addProduct={addProduct}
        showGrid={showGrid}
        showList={showList}
        activeView={view}
        searchHandle={searchHandle}
      />

      {submitted && (
        <Search
          onSave={onSave}
          onCancel={onCancel}
          editingProduct={editingProduct}
          submit={submit}
        />
      )}

      {view === "list" && (
        <ListView
          products={visibleProducts}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}

      {view === "grid" && (
        <GridView
          products={visibleProducts}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}

      {filteredProducts.length === 0 && <Empty />}

      {totalPages > 1 && (
        <Pagenation
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}

export default App;
