import axios from "axios";
import api, { apiUrl } from "../../api";
import { AgentInput, TWOFAData, User, UserInput } from "./types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner"


export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await api.get("/users/");
    return response.data;
})

export const createAgent = createAsyncThunk("users/createAgent", async (user: AgentInput) => {
    const response = await axios.post(`${apiUrl}agents/`, user, { headers: { "Content-Type": "application/json" } });
    return response.data;
})

export const createUser = createAsyncThunk("users/createUser", async (user: UserInput) => {
    const response = await api.post(`/users/`, user);
    toast.success("User created successfully")
    return response.data;
})

export const fetchUser = createAsyncThunk("users/fetchUser", async (id: string) => {
    const response = await api.get(`/users/${id}/`);
    return response.data;
})


export const updateUser = createAsyncThunk("users/updateUser", async ({ id, user }: { id: string, user: UserInput }) => {
    const response = await api.put(`/users/${id}/`, user);
    toast.success("User updated successfully")
    return response.data;
})

export const deleteUser = createAsyncThunk("users/deleteUser", async (id: string) => {
    await api.delete(`/users/${id}/`);
    toast.success("User deleted successfully")
    return id;
})

export const setUp2FA = createAsyncThunk("users/setup2FA", async (data: { id: string }) => {
    const response = await api.post("/2fa/setup/", data);
    return response.data;
})

export const verify2FA = createAsyncThunk("users/verify2FA", async (data: { user_id: string, otp: string }) => {
    const response = await api.post("/2fa/verify/", data);
    return response.data;
})

interface UserState {
    users: User[];
    user: User;
    twoFAData: TWOFAData;
    loading: boolean;
    error: string | undefined;
}

const initialState = {
    users: [],
    user: {} as User,
    twoFAData: {} as TWOFAData,
    loading: false,
    error: undefined,
} as UserState;

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createAgent.pending, (state) => {
                state.loading = true;
            })
            .addCase(createAgent.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createAgent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(setUp2FA.pending, (state) => {
                state.loading = true;
            })
            .addCase(setUp2FA.fulfilled, (state, action) => {
                state.loading = false;
                state.twoFAData = action.payload;
            })
            .addCase(setUp2FA.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(verify2FA.pending, (state) => {
                state.loading = true;
            })
            .addCase(verify2FA.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(verify2FA.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default usersSlice.reducer;

