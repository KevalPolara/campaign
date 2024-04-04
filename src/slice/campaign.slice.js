import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apiclient/apiclient";

const initialState = {
  campaignData: [],
};

export const addData = createAsyncThunk(
  "campaign/addData",
  async (data, id) => {
    console.log("data", data, id);
    try {
      const response = await apiClient().post("campaign/addcampaign", data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const getData = createAsyncThunk("campaign/getData", async () => {
  try {
    const response = await apiClient().get("campaign/getcampaign");
    console.log("response", response.data);
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
      if (Array.isArray(action.payload)) {
        state.campaignData.push(action.payload.addCampaignData);
      }
    });

    builder.addCase(getData.fulfilled, (state, action) => {
      state.campaignData = action.payload;
    });
  },
});

export default campaignSlice.reducer;
