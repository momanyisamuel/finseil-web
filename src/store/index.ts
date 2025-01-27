import { configureStore } from "@reduxjs/toolkit";
import leadsSlice from "./leadsSlice";
import usersSlice from "./usersSlice";
import rolesSlice from "./rolesSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    leads: leadsSlice,
    users: usersSlice,
    roles: rolesSlice,
    auth: authSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;