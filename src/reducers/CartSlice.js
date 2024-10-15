import { createSlice } from "@reduxjs/toolkit"

const CartSlice = createSlice(
    {
        name: "cart",
        initialState: {
            cart: [],
            //{pId:2345, qty:1}
            total: 0,
            // actualTotal: 0
        },
        reducers: {
            emptyCart(state){
                state.cart = [];
                state.total = 0;
                localStorage.removeItem("cartData");
            },
            lsToCart(state){
                const lsCartData = localStorage.getItem("cartData");
                   if(lsCartData) {
                    const d = JSON.parse(lsCartData);
                    state.cart = d.cart;
                    state.total = d.total;
                   } 
            },
            addToCart(state, { payload }) {
                const found = state.cart.find(item => item.pId === payload.pId);
                if (found) {
                    found.qty++;
                } else {
                    state.cart.push({ pId: payload.pId, qty: 1 })
                }
                state.total += Number(payload.price)
            },
            removeFromCart(state, { payload }) { // action.payload
                const newData = state.cart.filter(
                    (item) => {
                        if (item.pId === payload.pId) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                )
                state.cart = [...newData];
                state.total -= payload.total_price;
            },
            changeQty(state, { payload }) {
                const found = state.cart.find(item => item.pId === payload.pId);
                if (found) {
                    found.qty = payload.new_qty
                }
                if (payload.flag === true) {
                    state.total += Number(payload.price);
                } else {
                    state.total -= Number(payload.price);
                }
            },
            dbCart(state, { payload}){
               state.cart = payload.userDBCart;
               state.total = payload.total;
            }
        }
    }
)

export const {lsToCart, addToCart, removeFromCart, changeQty, emptyCart, dbCart } = CartSlice.actions;
export default CartSlice.reducer;