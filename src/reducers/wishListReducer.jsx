// WishlistContext.js
import React, { createContext, useReducer, useEffect } from "react";
import Cookies from "js-cookie";

export const WishlistContext = createContext();

function wishlistReducer(state, action) {
  switch (action.type) {
    case "SET_WISHLIST":
      return Array.isArray(action.payload) ? action.payload : [];
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = Cookies.get("jwt_token");
      if (!token) return;

      try {
        const response = await fetch("https://bookhubbackend-4urx.onrender.com/api/getwishlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Failed to fetch wishlist");

        const data = await response.json();
        dispatch({ type: "SET_WISHLIST", payload: data });
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}
