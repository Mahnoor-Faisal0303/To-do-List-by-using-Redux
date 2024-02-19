import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
    isLoggedIn: boolean;
    loginInfo: {
        email: string,
        password: string,
    };
}

const initialState: LoginState = {
    isLoggedIn: false,
    loginInfo: {
        email: '',
        password: ''
    }
};

const loginSlice = createSlice({
    name: 'logins',
    initialState,
    reducers: {
        setCurrentUser: (state: LoginState, action: PayloadAction<{ email: string; password: string }>) => {
            state.loginInfo = action.payload;
            state.isLoggedIn = true;
        },
        setLoggedOut: (state) => {
            state.loginInfo = { email: '', password: '' };
            state.isLoggedIn = false;
        },
    },
});

export const { setCurrentUser, setLoggedOut } = loginSlice.actions;
export default loginSlice.reducer;
