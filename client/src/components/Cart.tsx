import "./Cart.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "..";
import { TCart } from "../models/types";
import { useDispatch } from "react-redux";
import { editQuantity, deleteProduct } from "./CartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function Cart({
  cartStyle,
}: {
  cartStyle: { display: string };
}) {
  const products: TCart[] = useSelector((state: RootState) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deleteProduct(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="cart" style={cartStyle}>
      <div className="inCart">
        <span>
          <p>items:{products.length}</p>
          <p>
            total :
            {products.reduce((accumulator, product) => {
              return accumulator + product.price * product.cartTotalAmount;
            }, 0)}
          </p>
        </span>
        {products &&
          products.map((product) => {
            return (
              <div className="cartProduct" key={product._id}>
                <img
                  src={product.imageURL}
                  alt={product.productName}
                  onClick={() => {
                    navigate(`/product/${product._id}`);
                  }}
                />
                <div className="cartProductContent">
                  <p
                    onClick={() => {
                      navigate(`/product/${product._id}`);
                    }}
                  >
                    {" "}
                    {product.productName}
                  </p>
                  <p>${product.price}</p>
                  <span className="cartProductQuntity">
                    <button
                      onClick={() =>
                        dispatch(
                          editQuantity({
                            id: product._id,
                            cartTotalAmount: product.cartTotalAmount - 1,
                          })
                        )
                      }
                      disabled={product.cartTotalAmount < 2 ? true : false}
                    >
                      -
                    </button>
                    {product.cartTotalAmount}
                    <button
                      onClick={() =>
                        dispatch(
                          editQuantity({
                            id: product._id,
                            cartTotalAmount: product.cartTotalAmount + 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </span>
                </div>
                <FontAwesomeIcon
                  className="cartTrashIcon"
                  icon={faTrash}
                  onClick={() => dispatch(deleteProduct(product._id))}
                />
              </div>
            );
          })}
        {products.length >= 1 && (
          <Link className="chechoutBtn" to="/checkout">
           <p> Checkout</p>
          </Link>
        )}
      </div>
    </div>
  );
}
