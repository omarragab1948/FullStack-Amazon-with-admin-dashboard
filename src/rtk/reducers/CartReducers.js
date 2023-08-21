import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity, selectedColor, userEmail } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.selectedColor === selectedColor
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.userEmail = userEmail;
      } else {
        const product = { ...action.payload, selectedColor, userEmail };
        // Set the image URL based on the selected color
        product.image = product.images.find(
          (img) => img.color === selectedColor
        )?.url;
        state.items.push(product);
      }
    },
    removeFromCart: (state, action) => {
      const { id, selectedColor } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.selectedColor === selectedColor)
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    incrementQuantity: (state, action) => {
      const { id, selectedColor } = action.payload;
      const itemToUpdate = state.items.find(
        (item) => item.id === id && item.selectedColor === selectedColor
      );

      if (itemToUpdate) {
        itemToUpdate.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const { id, selectedColor } = action.payload;
      const itemToUpdate = state.items.find(
        (item) => item.id === id && item.selectedColor === selectedColor
      );

      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
