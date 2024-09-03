import React, { useEffect, useState } from "react";
import "./scroll.css";

const InfiniteScroll = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&_page=${page}`
      );
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="card-container">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img
              src={product.image}
              alt={product.title}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">
                {product.description.substr(0, 100)}...
              </p>{" "}
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="loading">Loading...</div>}{" "}
    </>
  );
};

export default InfiniteScroll;
