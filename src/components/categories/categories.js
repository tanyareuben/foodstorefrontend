import React, { useState } from "react";
import "../categories/categories.css";
import CategoryItem from "../categoryitems/categoryitem";

function Categories({}) {
  const [cart, setCart] = useState([]);
  const categoriesData = [
    { id: 1, name: "Pantry", image: "pantry.png" },
    { id: 2, name: "Vegetables", image: "broccoli2.png" },
    { id: 3, name: "Fruits", image: "orange.png" },
    { id: 4, name: "Proteins", image: "meat.png" },
    { id: 5, name: "Grains", image: "wheat.png" },
    { id: 6, name: "Beverages", image: "lemonade.png" },
    { id: 7, name: "Dairy", image: "cheese.png" },
    { id: 8, name: "Sea Food", image: "seafood.png" },
    // Add more categories as needed
  ];

  const maxVisibleCategories = 6;
  const [scrollIndex, setScrollIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(
    categoriesData[0].name
  );
  const scrollLeft = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  };

  const scrollRight = () => {
    if (scrollIndex + maxVisibleCategories < categoriesData.length) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="categories-list-container">
      <div className="category-list">
        <div className="scroll-arrow left-arrow" onClick={scrollLeft}>
          <img src="thumbnail/arrow-left.png" alt="Left Arrow" />
        </div>
        {categoriesData
          .slice(scrollIndex, scrollIndex + maxVisibleCategories)
          .map((category) => (
            <div
              key={category.id}
              className={`category-box ${
                selectedCategory === category.name ? "selected" : ""
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <img
                src={`/thumbnail/${category.image}`}
                alt={category.name}
                className="category-image"
              />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        <div className="scroll-arrow right-arrow" onClick={scrollRight}>
          <img src="/thumbnail/arrow-right.png" alt="Right Arrow" />
        </div>
      </div>
      <div className="category-item-container">
        <CategoryItem
          selectedCategory={selectedCategory}
          cart={cart}
          setCart={setCart}
        />
      </div>
    </div>
  );
}

export default Categories;
