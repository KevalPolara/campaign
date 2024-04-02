import { configureStore } from "@reduxjs/toolkit";
import campaignSlice from "../../slice/campaign.slice";

export const store = configureStore({
  reducer: {
    campaign : campaignSlice
  },
});
