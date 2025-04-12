import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <ChakraProvider>
      <ToastContainer autoClose={1500} position="top-center" />
      <App />
      </ChakraProvider>
    </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
