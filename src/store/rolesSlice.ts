import api from "../../api";
import { Role, RoleInput } from "./types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
    const response = await api.get("/roles/");
    return response.data;
})

export const createRole = createAsyncThunk("roles/createRole", async (role: RoleInput) => {
    const response = await api.post("/roles/", role);
    return response.data;
})

export const updateRole = createAsyncThunk("roles/updateRole", async (role: Role) => {
    const response = await api.put(`/roles/${role.id}/`, role);
    return response.data;
})

export const deleteRole = createAsyncThunk("roles/deleteRole", async (id: string) => {
    await api.delete(`/roles/${id}/`);
    return id;
})

interface RoleState {
    roles: Role[];
    loading: boolean;
    error: string | undefined;
}

const initialState = {
    roles: [],
    loading: false,
    error: undefined,
} as RoleState;

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(createRole.fulfilled, (state, action) => {
                state.loading = false;
                state.roles.push(action.payload);
            })
            .addCase(createRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                state.loading = false;
                const roleIndex = state.roles.findIndex((role) => role.id === action.payload.id);
                state.roles[roleIndex] = action.payload;
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = state.roles.filter((role) => role.id !== action.payload);
            })
            .addCase(deleteRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default rolesSlice.reducer;