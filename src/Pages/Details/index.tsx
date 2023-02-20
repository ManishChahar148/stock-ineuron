/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [data, setData] = useState<any>({});

  useEffect(() => {
    axios
      .get(`https://ineuron-stock-server.onrender.com/api/v1/data/${id}`)
      .then((res) => {
        console.log(res?.data?.data);

        setData(res?.data?.data);
      })
      .catch();
  }, []);

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="inline-flex w-full gap-2 items-center my-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
        </svg>
        Go back
      </button>
      <div className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw] px-4 py-5 sm:px-4 w-4ull">
        <h3 className="text-2xl font-medium text-left leading-6 text-gray-900">
          {data?.name}
        </h3>
        <div className="mt-3 flex flex-shrink-0">
          <p className="bg-green-100 text-green-800 inline-flex rounded-full px-2 text-xs font-semibold leading-5">
            {data?.tag}
          </p>
        </div>
        <hr className="w-full border-[0.1px] border-gray-200 mt-5" />
        <ul role="list" className="divide-y divide-gray-200">
          {data?.criteria?.map((item: any) => {
            const type = item?.type;
            if (type === "plain_text") {
              return (
                <li key={item?.text} className="flex py-4">
                  <p className="font-medium text-gray-900">{item?.text}</p>
                </li>
              );
            }

            if(type === 'variable') {
              const vars = item.variable;
              let text = item.text;
              const keys = Object.keys(vars);
              keys.forEach((key) => {
                if(vars[key]?.type === 'value') {
                  const val = vars[key]?.values[0];
                  text = text.replaceAll(key, val);
                }

                if(vars[key].type === 'indicator') {
                  const val = vars[key].default_value;
                  text = text.replaceAll(key, val);
                }
              })

              return (
                <li key={item?.text} className="flex py-4">
                  <p className="font-medium text-gray-900">{text}</p>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default Details;
