import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        // 로그인 되어있거나
        login: (state, action) => {
            state.user = action.payload;
        },
        // 로그아웃 되어있거나
        logout: state => {
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export const selectUser = state => state.user.user;

export default userSlice.reducer;