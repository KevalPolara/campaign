import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apiclient/apiclient";

const initialState = {
  campaignData: [],
};

export const addData = createAsyncThunk("campaign/addData", async (data) => {
  console.log("data", data);
  try {
    const response = await apiClient().post("/addcampaign", data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
});

export const getData = createAsyncThunk("campaign/getData", async () => {
  try {
    const response = await apiClient().get("/getcampaign");
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
});

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addData.fulfilled, (state, action) => {
      const data = [];
      data.push(action.payload.addCampaignData);
      state.campaignData = data;
      console.log(state.campaignData);
    });

    builder.addCase(getData.fulfilled, (state, action) => {
      state.campaignData = action.payload;
    });
  },
});

export default campaignSlice.reducer;
