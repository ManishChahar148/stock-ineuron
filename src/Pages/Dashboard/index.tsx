/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    axios
      .get("https://ineuron-stock-server.onrender.com/api/v1/data")
      .then((res) => {
        setData(res?.data?.data || []);
      })
      .catch();
  }, []);

  return (
    <>
      <div
        data-testid="container"
        className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw]"
      >
        <ul role="list" className="divide-y divide-gray-200">
          {data.map((row) => {
            return (
              <li>
                <a className="block hover:bg-gray-50" href={`/details/${row?.id}`}>
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex">
                          <p className="truncate font-medium text-indigo-600">
                            {row.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-16 flex flex-shrink-0">
                      <p className={`bg-${row?.color}-100 text-${row?.color}-800 inline-flex rounded-full px-2 text-xs font-semibold leading-5`}>
                        {row.tag}
                      </p>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 text-gray-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
