import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../slice/campaign.slice";
import { useNavigate } from "react-router-dom";

const CampaignDetails = () => {
  const campaignData = useSelector((state) => state.campaign.campaignData);
  const getCampaignData = campaignData.getCampaignData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const handleClick = (id) => {
    console.log("id" , id);
    navigate("/campaign_donator" ,  {
      state : {
        id : id
      }
    });
  };

  return (
    <div>
      <h3 className="text-[black] text-[40px]">Campaigns List</h3>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Campaign name
              </th>
              <th scope="col" className="px-6 py-3">
                Campaign Description
              </th>
              <th scope="col" className="px-6 py-3">
                Expiry Date
              </th>

              <th scope="col" className="px-6 py-3">
                Goal Amount(in Usd)
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>

              <th scope="col" className="px-6 py-3">
                Donation Fund
              </th>
            </tr>
          </thead>
          <tbody>
            {getCampaignData &&
              getCampaignData.map((value) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="col" className="px-6 py-3">
                      {value.name}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {value.description}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {value.expirydate}
                    </td>

                    <td scope="col" className="px-6 py-3">
                      {value.amount}
                    </td>

                    <td
                      scope="col"
                      style={{ color: value.status === "expired" ? "red" : "" }}
                      className="px-6 py-3"
                    >
                      {value.status}
                    </td>

                    {
                      <button
                        onClick={() => handleClick(value.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        disabled={value.status === "expired" ? true : false}
                      >
                        Add Donate
                      </button>
                    }
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
