import "./Shop.css";
import { useState, useEffect } from "react";
import { useGetToken } from "../../hooks/getTokenHook";
import axios from "axios";
import { TProducts } from "../../models/types";
import { useNavigate } from "react-router-dom";

export default function ShopPage() {
  const [products, setProducts] = useState<TProducts[]>([]);
  const [page, setpage] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<string>("");
  const { headers } = useGetToken();
  const categories = [
    "Graphic Card",
    "Storage",
    "RAM",
    "Processors",
    "Computer Case",
    "Accessories",
  ];
  const navigate = useNavigate();

  const handelcategories = (e: any) => {
    if (e.target.checked) {
      setSelectedCategories(selectedCategories + `,${e.target.value}`);
    } else {
      setSelectedCategories(
        selectedCategories.replace(`,${e.target.value}`, "")
      );
    }
    setpage(1);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handelpage = () => {
    setpage(page + 1);
  };

  const fetchProducts = async () => {
    const res = await axios.get(
      `http://localhost:3001/products?categories=${selectedCategories}&&page=${page}`,
      {
        headers,
      }
    );
    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedCategories]);

  return (
    <div className="shop">
      <div className="filter">
        <h3>Categories</h3>
        {categories.map((category) => {
          return (
            <label className="filterLabel" key={category}>
              <input
                type="checkbox"
                value={category}
                onChange={handelcategories}
              />
              <span className="checkmark">{category}</span>
            </label>
          );
        })}
      </div>
      <div className="products">
        {products.map((product) => (
          <div
            className="productCard"
            key={product._id}
            onClick={() => {
              navigate(`/product/${product._id}`);
            }}
          >
            <img src={product.imageURL} alt={product.productName} />
            <div className="productCardContent">
              <h4> {product.productName}</h4>
              <p>${product.price}</p>
            </div>
            {product.stockQuantity !== 0 && (
              <span className="available-span">available</span>
            )}
            {product.stockQuantity === 0 && (
              <span className="out-off-stock-span">Out Off Stock</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
