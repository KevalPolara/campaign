import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, getData } from "../slice/campaign.slice";
import apiClient from "../apiclient/apiclient";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    user_id: yup.string().required("User Id is Required"),
    username: yup.string().required("username is Required"),
    crypto_wallet_address: yup
      .string()
      .required("crypto wallet address is Required"),
  })
  .required();

function CampaignOwner() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  useEffect(() => {
    getData();
  });

  const [id, setId] = useState(null);

  const getData = async () => {
    try {
      const response = await apiClient().get("campaignowner/getcampaignowner");
      const getOwnerData = response.data.getCampaignOwnerData;
      console.log("getOwnerData", getOwnerData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddData = async (data, e) => {
    try {
      const response = await apiClient().post(
        "campaignowner/addcampaignowner",
        data
      );
      console.log(response.data.addCampaignOwnerData.id);
      setId(response.data.addCampaignOwnerData.id);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    console.log("data", data);

    handleAddData(data);
    getData();
    reset();
  };

  const handleClick = () => {

    console.log("id" , id);

    navigate("/create_campaign", {
      state: {
        id: id,
      },
    });
  };

  return (
    <div className="App">
      <div className="flex justify-center items-center">
        <h1 className="text-black text-[40px] text-center pr-[20px]">
          Campaign Owner
        </h1>
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Campaign
        </button>
      </div>
      <div className="w-full max-w-[30rem] mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          method="post"
        >
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User_Id
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                {...register("user_id")}
                placeholder="Enter Your User Id"
              />

              <p className="text-[red]">{errors.name?.message}</p>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                UserName
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("username")}
                cols={10}
                rows={7}
                type="text"
                placeholder="Enter Your UserName"
              />
              <p className="text-[red]">{errors.description?.message}</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Crypto Wallet Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("crypto_wallet_address")}
                type="text"
                placeholder="Enter Your Crypto Wallet Address"
              />

              <p className="text-[red]">{errors.amount?.message}</p>
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
}

export default CampaignOwner;
