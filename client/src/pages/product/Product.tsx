import axios from "axios";
import "./product.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TProducts } from "../../models/types";
import { useGetToken } from "../../hooks/getTokenHook";
import { useDispatch } from "react-redux";
import { addToCart } from "../../components/CartSlice";

export default function Product() {
  let { productId } = useParams();
  const [product, setProduct] = useState<TProducts>();
  const [productQuntity, setProductQuntity] = useState<number>(1);
  const { headers } = useGetToken();
  const dispatch = useDispatch();

  const handelAddToCart = (product: TProducts) => {
    dispatch(addToCart({ ...product, cartTotalAmount: productQuntity }));
  };

  const fetchProduct = async () => {
    const res = await axios.get(`http://localhost:3001/products/${productId}`, {
      headers,
    });
    setProduct(res.data.product);
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {product && (
        <div className="product">
          <img src={product.imageURL} alt={product.productName} />
          <div className="content">
            <h3> {product.productName}</h3>
            <p>
              <b>Brand: </b>
              {product.brand}
            </p>
            <p id="description">
              <b>Description: </b>
              {product.description}
            </p>
            <p>
              <b>Price: </b>${product.price}
            </p>
            <span className="productQuntity">
              <button
                onClick={() => setProductQuntity(productQuntity - 1)}
                disabled={productQuntity < 2 ? true : false}
              >
                -
              </button>
              {productQuntity}
              <button onClick={() => setProductQuntity(productQuntity + 1)}>
                +
              </button>
            </span>
            {product.stockQuantity !== 0 && (
              <button
                className="add-to-cart-btn"
                onClick={() => handelAddToCart(product)}
              >
                Add To Cart
              </button>
            )}
            {product.stockQuantity === 0 && (
              <button className="out-off-stock-btn" disabled={true}>
                Out Off Stock
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
