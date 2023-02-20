/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Variable = () => {
  const navigate = useNavigate();
  const { variable, idx, id } = useParams();

  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios
      .get(
        `https://ineuron-stock-server.onrender.com/api/v1/data/variable/${variable}/${idx}/${id}`
      )
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      });
  }, []);

  const { type } = data;


  if(loading) return <h4>Loading...</h4>

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className=" w-full inline-flex gap-2 items-center my-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          ></path>
        </svg>
        Go back
      </button>
      <div className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw] px-4 py-5 sm:px-6 w-full">
        <h3 className="text-2xl font-medium leading-6 text-gray-900">
          Variable params
        </h3>
        <hr className="w-full border-[0.1px] border-gray-200 mt-5" />
        {type === "indicator" && (
          <ul role="list" className="divide-y divide-gray-200">
            <div>
              <h3 className="text-lg text-left font-medium leading-6 my-4 text-gray-900 uppercase">
                rsi
              </h3>
              <div>
                <label
                  htmlFor="number"
                  className="block text-left text-sm font-medium text-gray-700"
                >
                  period
                </label>
                <div className="mt-1.5">
                  <input
                    data-testid="indicator-input"
                    type="tel"
                    name="param_value"
                    id="param_value"
                    max="99"
                    min="1"
                    className="block w-full rounded-md border-[0.1px] border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-3"
                    placeholder="period value"
                    defaultValue={data.default_value}
                  />
                </div>
              </div>
            </div>
          </ul>
        )}

        {type === "value" && (
          <ul role="list" className="divide-y divide-gray-200">
            {data?.values
              .sort((a: number, b: number) => a - b)
              .map((v: number) => (
                <li className="flex py-4">
                  <p className="font-medium text-gray-900">{v}</p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Variable;
