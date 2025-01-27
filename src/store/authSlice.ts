import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { apiUrl } from "../../api";
import { IdVerificationResponse, SMSInput, User } from "./types";
import axios from "axios";

// Auth Slice

export const getLoggedInUser = createAsyncThunk("auth/getLoggedInUser", async (id: string) => {
    const response = await api.get(`/users/${id}/`);
    return response.data;
});

export const verifyUser = createAsyncThunk("auth/verifyUser", async (id_number: string) => {
    const response = await axios.post(`${apiUrl}verifyID/`, { identifier: id_number }, { headers: { "Content-Type": "application/json" } });
    return response.data
});

export const sendSMS = createAsyncThunk("auth/sendSMS", async (smsData: SMSInput) => {
    const response = await axios.post(`${apiUrl}sms/send/`, smsData, { headers: { "Content-Type": "application/json" } });
    return response.data;
});

interface AuthState {
    user: User;
    idVerificationResponse: IdVerificationResponse;
    loading: boolean;
    error: string | undefined;
}

const initialState = {
    user: {} as User,
    idVerificationResponse: {} as IdVerificationResponse,
    loading: false,
    error: undefined,
} as AuthState;


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLoggedInUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(getLoggedInUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
        builder.addCase(verifyUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(verifyUser.fulfilled, (state, action) => {
            state.idVerificationResponse = action.payload;
            state.loading = false;
        });
        builder.addCase(verifyUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
        builder.addCase(sendSMS.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(sendSMS.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(sendSMS.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
