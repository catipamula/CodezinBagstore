import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api/api";
import "./Home.css";

const Home = ({ updateCart, cartCount, setCartCount }) => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const addToCartHandler = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("❌ Please login to add items to cart.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });

      const data = await res.json();

      if (res.ok) {
        const cartRes = await fetch("http://127.0.0.1:8000/api/cart/", {
          headers: { Authorization: `Token ${token}` },
        });
        const cartData = await cartRes.json();
        let processedCartData = [];

        if (cartData.cart) processedCartData = cartData.cart;
        else if (cartData.items) processedCartData = cartData.items;
        else if (Array.isArray(cartData)) processedCartData = cartData;
        else if (cartData.results) processedCartData = cartData.results;

        updateCart(processedCartData);
        setCartCount(processedCartData.length);
        console.log("✅ Product added to cart successfully!");
      } else {
        console.log(`❌ Failed to add product: ${data.error || data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const filteredProducts = products
    .filter((p) =>
      categoryFilter === "all" ? true : p.category === categoryFilter
    )
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "price_low") return a.price - b.price;
      if (sortOption === "price_high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="home-container">
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <div className="compact-filters">
          <select
            onChange={(e) => setCategoryFilter(e.target.value)}
            value={categoryFilter}
            className="compact-select"
          >
            <option value="all">All Categories</option>
            <option value="backpack">Backpacks</option>
            <option value="handbag">Handbags</option>
            <option value="wallet">Wallets</option>
          </select>
          <select
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
            className="compact-select"
          >
            <option value="default">Sort By</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCartHandler={addToCartHandler}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
