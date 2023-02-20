/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios
      .get("https://ineuron-stock-server.onrender.com/api/v1/data")
      .then((res) => {
        setData(res?.data?.data || []);
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      });
  }, []);

  if(loading) return <h4>Loading...</h4>

  return (
    <>
      <div
        data-testid="container"
        className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw]"
      >
        <ul role="list" className="divide-y divide-gray-200">
          {data.map((row) => {
            return (
              <li key={row.id}>
                <Link className="block hover:bg-gray-50" to={`/details/${row?.id}`}>
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
                      <p className={`${row?.color === 'green' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} inline-flex rounded-full px-2 text-xs font-semibold leading-5`}>
                        {row.tag}
                      </p>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5 text-gray-400"
                      >
                        <path                          
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
