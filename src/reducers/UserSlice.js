import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice(
    {
        name: 'user',
        initialState: {
            data: null
        },
        reducers: {
            loginUser(state, {payload}){
                state.data = payload;
                localStorage.setItem("user", JSON.stringify(payload));
            },
            logout(state){
                state.data = null;
                localStorage.removeItem("user");
            },
            lsToUser(state){
                const lsUser = localStorage.getItem("user");
                if(lsUser){
                    try {
                        state.data = JSON.parse(lsUser);
                    } catch (e) {
                        console.error("Failed to parse user data from localStorage:", e);
                        state.data = null;
                    }
                } else {
                    state.data = null;
                }
                // const lsUser = localStorage.getItem("user");
                // if(lsUser){
                //     state.data = JSON.parse(lsUser);
                // }
            }
        }
    }
)

export const { loginUser, logout, lsToUser } = UserSlice.actions;
export default UserSlice.reducer;