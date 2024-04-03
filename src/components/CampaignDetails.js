import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../slice/campaign.slice";

const CampaignDetails = () => {
  const campaignData = useSelector((state) => state.campaign.campaignData);
  const getCampaignData = campaignData.getCampaignData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const handleClick = () => {
    console.log("CAN I reach here");
  };

  return (
    <div>
      <h3 className="text-[black] text-[40px]">Campaigns List</h3>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Campaign name
              </th>
              <th scope="col" class="px-6 py-3">
                Campaign Description
              </th>
              <th scope="col" class="px-6 py-3">
                Expiry Date
              </th>
              <th scope="col" class="px-6 py-3">
                Goal Amount(in Usd)
              </th>
              <th scope="col" class="px-6 py-3">
                Donation Fund
              </th>
            </tr>
          </thead>
          <tbody>
            {getCampaignData &&
              getCampaignData.map((value) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="col" class="px-6 py-3">
                      {value.name}
                    </td>
                    <td scope="col" class="px-6 py-3">
                      {value.description}
                    </td>
                    <td scope="col" class="px-6 py-3">
                      {value.expirydate}
                    </td>
                    <td scope="col" class="px-6 py-3">
                      {value.amount}
                    </td>

                    <button
                      onClick={() => handleClick()}
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Add Donate
                    </button>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignDetails;
