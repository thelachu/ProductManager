import "./Toolbar.css";
import search from "../assets/search.svg";
import list from "../assets/list.svg";
import grid from "../assets/grid.svg";
import Search from "./Search";
import { useState } from "react";

function Toolbar({ addProduct, showList, showGrid, activeView, searchHandle }) {
  return (
    <div className="toolbar">
      <div className="search-bar">
        <img className="search-icon" src={search} />
        <input
          className="input"
          placeholder="Search products by name..."
          onChange={searchHandle}
        />
      </div>

      <div className="view-toggle">
        <button
          title="List"
          className={activeView == "list" ? "active" : "btn"}
          onClick={showList}>
          <img src={list} />
        </button>
        <button
          title="Grid"
          className={activeView == "grid" ? "active" : "btn"}
          onClick={showGrid}>
          <img src={grid} />
        </button>
      </div>

      <button className="add-btn" onClick={addProduct}>
        + Add Product
      </button>
    </div>
  );
}

export default Toolbar;
