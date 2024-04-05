import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import apiClient from "../apiclient/apiclient";
import { useLocation } from "react-router-dom";

const schema = yup
  .object({
    amount: yup.string().required("User Id is Required"),
    nickname: yup.string().required("username is Required"),
  })
  .required();

const CampaignDonator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const location = useLocation();
  console.log("location", location.state.id);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await apiClient().get(
        "/camapaigndonator/getcampaigndonator"
      );
      console.log("response", response.data.getCampaignDonatorData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddData = async (data) => {
    console.log("can i reach here", data);
    try {
      const response = await apiClient().post(
        "/camapaigndonator/addcampaigndonator",
        { ...data, campaign_id: location.state.id }
      );

      console.log(response.data.addCampaignDonatorData.amount);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSubmit = async (data) => {
    handleAddData(data);
    getData();
    reset();
  };

  return (
    <div className="App">
      <div className="flex justify-center items-center">
        <h1 className="text-black text-[40px] text-center pr-[20px]">
          Campaign Donator
        </h1>
      </div>
      <div className="w-full max-w-[30rem] mx-auto">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amount to be Donate
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                {...register("amount")}
                placeholder="Enter Your Amount You Want to Donate"
              />

              <p className="text-[red]">{errors.name?.message}</p>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                NickName
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("nickname")}
                cols={10}
                rows={7}
                type="text"
                placeholder="Enter Your NickName"
              />
              <p className="text-[red]">{errors.description?.message}</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </>
        </form>
      </div>
    </div>
  );
};

export default CampaignDonator;
