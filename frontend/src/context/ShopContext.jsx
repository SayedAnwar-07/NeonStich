import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import backendURL from "../components/backendURL.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [cartItem, setCartItem] = useState({});
  const url = backendURL;
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Remove any leftover local cart
  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  // Load cart from backend using token
  useEffect(() => {
    const initializeUserCart = async () => {
      if (token) {
        try {
          const response = await axios.get(`${url}/api/carts/user-cart`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data && response.data.cartData) {
            setCartItem(response.data.cartData);
          }
        } catch (err) {
          console.error("Cart initialization error:", err);
        }
      }
    };

    initializeUserCart();
  }, [token, url]);
  // Add item to cart
  const addToCart = async (itemId, size) => {
    try {
      const newCart = { ...cartItem };
      newCart[itemId] = newCart[itemId] || {};
      newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;
      setCartItem(newCart);

      if (token) {
        setLoading(true);
        const response = await axios.post(
          `${url}/api/carts/add-cart`,
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data && response.data.cart) {
          setCartItem(response.data.cart);
        }
        setLoading(false);
        toast.success(response.data.message);
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error(err.response?.data?.message || "Failed to add to cart");
      setCartItem((prev) => ({ ...prev }));
    }
  };
  // Remove item from cart
  const removeFromCart = async (itemId, size, productName) => {
    try {
      if (!itemId || !size) {
        toast.error("Invalid item or size");
        return;
      }

      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete "${
          productName || "this item"
        }". This action cannot be undone!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#000",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        // Show loading state
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while we delete the product",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const newCart = { ...cartItem };
        if (newCart[itemId]?.[size]) {
          delete newCart[itemId][size];
          if (Object.keys(newCart[itemId]).length === 0) {
            delete newCart[itemId];
          }
        }
        setCartItem({ ...newCart });

        if (token) {
          const response = await axios.post(
            `${url}/api/carts/remove-cart`,
            { itemId, size },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data && response.data.cartData) {
            setCartItem(response.data.cartData);
          } else {
            toast.error("Failed to update cart from backend");
          }
        }

        Swal.fire(
          "Removed!",
          "The item has been removed from your cart.",
          "success"
        );
        setLoading(false);
      }
    } catch (err) {
      console.error("Remove from cart error:", err.response?.data || err);
      toast.error("Failed to remove item");
      setCartItem((prev) => ({ ...prev }));
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, size, quantity) => {
    if (!itemId || !size || isNaN(quantity)) {
      toast.error("Invalid item, size, or quantity");
      return;
    }

    if (quantity < 0) {
      toast.error("Quantity cannot be negative");
      return;
    }

    try {
      if (token) {
        const response = await axios.post(
          `${url}/api/carts/update-cart`,
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data && response.data.cartData) {
          setCartItem(response.data.cartData);
          toast.success("Cart updated");
        } else {
          toast.error("Cart update failed");
        }
      } else {
        // Handle guest user cart update (optional)
      }
    } catch (err) {
      console.error("Update quantity error:", err);
      toast.error(err.response?.data?.message || "Failed to update quantity");
    }
  };

  const getCartCount = () => {
    return Object.values(cartItem).reduce(
      (total, sizes) =>
        total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
      0
    );
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItem).reduce((total, [itemId, sizes]) => {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        return (
          total +
          Object.entries(sizes).reduce(
            (sum, [size, qty]) => sum + product.price * qty,
            0
          )
        );
      }
      return total;
    }, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setToken("");
    setCartItem({});
    navigate("/login");
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/api/products/all-products`);
        setProducts(response.data.data || []);
      } catch (err) {
        console.error("Failed to load products:", err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [url]);

  const contextValue = {
    products,
    currency,
    delivery_fee,
    cartItem,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loading,
    setLoading,
    handleLogout,
    navigate,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
