// In your SearchResults component or page
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../Searchresult/searchresult.css";
import { search as searchFood } from "../../services/foodservices";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query");

  useEffect(() => {
    // Call your API to get search results
    const fetchResults = async () => {
      try {
        const data = await searchFood(query);
        setResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="results">
      <div className="searchheader">
        <h2 className="searchfor">Search Results for : {query}</h2>
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item.id} className="search-result-item">
              <h3>{item.name}</h3>
              <div
                className="item-image"
                style={{ backgroundImage: `url('/food/${item.image}')` }}
              >
                <img></img>
              </div>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
              <p>Available: {item.inStock ? "In Stock" : "Out of Stock"}</p>
              {/* Add more details as needed */}
            </div>
          ))
        ) : (
          <p>No results found for "{query}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
