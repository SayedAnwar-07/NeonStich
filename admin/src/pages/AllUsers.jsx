import React, { useEffect, useState } from "react";
import backendURL from "../components/allURL";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${backendURL}/api/users/all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login to access this resource");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to view users");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch users");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left text-gray-500"></th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              IMAGE
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              NAME
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              ID
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              ROLE
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              JOIN DATE
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="pl-1 whitespace-nowrap text-sm font-medium text-gray-900 pl-2">
                {index + 1}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <img
                  src={
                    user.image ||
                    "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                  }
                  alt={user.name}
                  className="h-12 w-12 object-cover rounded"
                />
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.name}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user._id}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  className={` ${
                    user.role === "admin"
                      ? "bg-green-100 text-green-800 px-4 py-1 rounded-full"
                      : "bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                  <button className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                  <Link
                    to={`/edit-user/${user._id}`}
                    className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
