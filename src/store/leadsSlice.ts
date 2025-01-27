import { toast } from "sonner";
import api from "../../api";
import { Lead, LeadInput } from "./types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLeads = createAsyncThunk("leads/fetchLeads", async () => {
    const response = await api.get("/leads/");
    console.log(response)
    return response.data;
})

export const createLead = createAsyncThunk("leads/createLead", async (lead: LeadInput) => {
    const response = await api.post("/leads/", lead);
    toast.success("Lead created successfully");
    return response.data;
})

export const createZohoLead = createAsyncThunk("leads/createZohoLead", async (lead: LeadInput) => {
    const response = await api.post("/zoho/crm/leads/", lead);
    console.log(response)
    toast.success("Lead created successfully");
    return response.data;
})

export const fetchLead = createAsyncThunk("leads/fetchLead", async (id: string) => {
    const response = await api.get(`/leads/${id}/`);
    return response.data;
})

export const updateLead = createAsyncThunk("leads/updateLead", async (lead: Lead) => {
    const response = await api.put(`/leads/${lead.id}/`, lead);
    toast.success("Lead updated successfully");
    return response.data;
})

export const deleteLead = createAsyncThunk("leads/deleteLead", async (id: string) => {
    await api.delete(`/leads/${id}/`);
    toast.success("Lead deleted successfully");
    return id;
})

interface LeadState {
    leads: Lead[];
    lead: Lead;
    loading: boolean;
    error: string | undefined;
}

const initialState = {
    leads: [],
    lead: {} as Lead,
    loading: false,
    error: undefined,
} as LeadState;

const leadsSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeads.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLeads.fulfilled, (state, action) => {
                state.loading = false;
                state.leads = action.payload;
            })
            .addCase(fetchLeads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createLead.pending, (state) => {
                state.loading = true;
            })
            .addCase(createLead.fulfilled, (state, action) => {
                state.loading = false;
                state.leads.push(action.payload);
            })
            .addCase(createLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createZohoLead.pending, (state) => {
                state.loading = true;
            })
            .addCase(createZohoLead.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createZohoLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchLead.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLead.fulfilled, (state, action) => {
                state.loading = false;
                state.lead = action.payload;
            })
            .addCase(fetchLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateLead.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateLead.fulfilled, (state, action) => {
                state.loading = false;
                state.leads.push(action.payload);
            })
            .addCase(updateLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteLead.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteLead.fulfilled, (state, action) => {
                state.loading = false;
                state.leads = state.leads.filter((lead) => lead.id !== action.payload);
            })
            .addCase(deleteLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default leadsSlice.reducer;