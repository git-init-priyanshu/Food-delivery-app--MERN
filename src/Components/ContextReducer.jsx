import { React, createContext, useReducer, useContext } from "react";

const CartStateContext = createContext();
const CartDisplayContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          quantity: action.quantity,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          arr[index] = {
            ...food,
            quantity: parseInt(action.quantity),
            price: action.price,
          };
        }
        return arr;
      });
      return arr;

    case "DROP":
      let emptyArr = [];
      return emptyArr;

    default:
      console.log("Error in Reducer");
  }
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDisplayContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDisplayContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDisplayContext);
