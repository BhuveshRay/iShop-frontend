import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./reducers/CartSlice";
import UserReducer from "./reducers/UserSlice";
import AdminSlice from "./reducers/AdminSlice";


const store = configureStore(
    {
        reducer: {
            "cart": CartReducer,
            "user": UserReducer,
            "admin": AdminSlice
        }
    }
);

export default store;