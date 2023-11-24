import React from "react";
import ManagerSidebar from "../ManagerSidebar/ManagerSidebar";
import "../ManagerProduct/ManagerProduct.css";

function ProductManagement() {
  return (
    <div className="product-management">
      <ManagerSidebar />
      <h1>Product Management</h1>
      <div className="product-list">
        {/* Product items will be listed here */}
        {/* You can replace this with dynamic content as needed */}
        <p>Product 1</p>
        <p>Product 2</p>
        <p>Product 3</p>
        {/* ... */}
      </div>
      {/* Add more product management features as needed */}
    </div>
  );
}

export default ProductManagement;
