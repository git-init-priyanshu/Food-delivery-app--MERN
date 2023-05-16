import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screens/Home";
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import { CartProvider } from "./Components/ContextReducer";
import MyOrders from "./Screens/MyOrders";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/myorders" element={<MyOrders />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
