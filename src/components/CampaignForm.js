import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addData, getData } from "../slice/campaign.slice";

const schema = yup
  .object({
    name: yup.string().required("Name is Required"),
    description: yup.string().required("Description is Required"),
    amount: yup.string().required("Amount is Required"),
    expirydate: yup.string().required("Date is Required"),
  })
  .required();

function CampaignForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const campaignData = useSelector((state) => state.campaign);
  console.log("campaignData", campaignData);

  useEffect(() => {
    dispatch(getData());
  }, []);

  const handleAddData = (data) => {
    dispatch(addData(data));
  };

  const onSubmit = async (data) => {
    handleAddData(data);
  };

  return (
    <div className="App">
      <h1 className="text-black text-[40px] text-center">Create Campaign</h1>
      <div class="w-full max-w-[30rem] mx-auto">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              {...register("name")}
              placeholder="Enter Your Campaign Name"
            />

            <p className="text-[red]">{errors.name?.message}</p>
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Description
            </label>
            <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("description")}
              cols={10}
              rows={7}
              type="text"
              placeholder="Enter Your Description"
            />
            <p className="text-[red]">{errors.description?.message}</p>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Amount (In Usd)
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("amount")}
              type="text"
              placeholder="Enter Your Goal Amount"
            />

            <p className="text-[red]">{errors.amount?.message}</p>
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Expiration Date
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("expirydate")}
              id="password"
              type="date"
              placeholder="Enter Your Description"
            />

            <p className="text-[red]">{errors.expirydate?.message}</p>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CampaignForm;
