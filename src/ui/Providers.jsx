import { store } from "@store/store.js";
import { Provider } from "react-redux";
import ProtectedRoute from "./ProtectedRoute.jsx";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <ProtectedRoute>{children}</ProtectedRoute>
    </Provider>
  );
};

export default Providers;
