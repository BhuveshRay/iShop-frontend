import { createSlice } from '@reduxjs/toolkit';

const AdminSlice = createSlice(
    {
        name: 'admin',
        initialState: {
            data: null
        },
        reducers: {
            loginAdmin(state, {payload}){
                state.data = payload;
                localStorage.setItem("admin", JSON.stringify(payload));
            },
            logout(state){
                state.data = null;
                localStorage.removeItem("admin");
            },
            lsToAdmin(state){
                const lsAdmin = localStorage.getItem("admin");
                if(lsAdmin){
                    state.data = JSON.parse(lsAdmin);
                }
            },
            lsToCurrentState(currentState) {
                const lsToken = localStorage.getItem("token");
                if (lsToken != null) {
                    currentState.token = lsToken;
                }
                const lsAdmin = localStorage.getItem("admin");
                if (lsAdmin != null) {
                    const admin = JSON.parse(lsAdmin);
                    currentState.data = admin;
                }
            }
        }
    }
)

export const { loginAdmin, logout, lsToAdmin,lsToCurrentState } = AdminSlice.actions;
export default AdminSlice.reducer;