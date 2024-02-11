import React, { useEffect, useState } from "react";
import { acceptUser, getUsers, rejectUser } from "../../services/apiHandler";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("User");
  const [spinner, setSpinner] = useState(false);
  const [search, setSearch] = useState("");
  const admin = useSelector((state) => state.user.user);
  const useDebounce = (fun, delay) => {
    setTimeout(() => {
      fun();
    }, delay);
  };
  const fetchUsersByRole = async () => {
    try {
      setSpinner(true);
      const data = await getUsers(admin?.token, selectedRole, search);
      if (data && data.data.data.users) {
        setUsers(data.data.data.users);
        setSpinner(false);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setSpinner(false);
    }
  };

  useEffect(() => {
    useDebounce(fetchUsersByRole, 1000);
  }, [selectedRole, search]); // Call fetchUsersByRole whenever selectedRole changes

  // Handler function to update selectedRole when the dropdown value changes
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const handleAccept = async (id) => {
    try {
      const res = await acceptUser(admin?.token, id);
      if (res.status === 200) {
        fetchUsersByRole();
      }
    } catch (error) {
      console.error("Error accepting user");
    }
  };
  const handleReject = async (id) => {
    try {
      const res = await rejectUser(admin?.token, id);
      if (res.status === 200) {
        fetchUsersByRole();
      }
    } catch (error) {
      console.error("Error accepting user");
    }
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="absolute top-[96px] pt-8 sm:top-[74px] w-full  md:pl-[70px] -z-50 ">
      <div className="w-full px-4 flex justify-center mb-8">
        <div className="flex items-center me-3">
          <h1 className="me-2 text-lg text-white font-bold">Users type:</h1>
          <select
            className="py-3 bg-second rounded-md text-white"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="User">User</option>
            <option value="Pending">Pending</option>
            <option value="Seller">Seller</option>
          </select>
        </div>
        <input
          className="w-3/5 p-2 rounded-md bg-second text-white focus:border-none focus:outline-none"
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className="flex items-center justify-center flex-wrap">
        {users && !spinner ? (
          users.map((user) => (
            <Link
              to={`/admindashboard/users/userinfo/${user?._id}`}
              className="mx-2 my-3  p-3 w-1/3 lg:w-1/5 bg-body shadow-md shadow-second text-white rounded-md hover:bg-second duration-300"
            >
              <h4 className="font-bold flex justify-start items-center text-black">
                User Name:
                {user.userName ? (
                  <span className="ml-2 text-white">{user.userName}</span>
                ) : (
                  <div className=" bg-white flex justify-center items-center ml-2">
                    <div
                      className={`border-2 my-1 border-solid mx-auto  border-gray-400 border-t-main rounded-full w-4 h-4 animate-spin`}
                    ></div>
                  </div>
                )}
              </h4>
              <h4 className="my-4 font-bold  flex justify-start items-center text-black">
                Email:
                {user.email ? (
                  <span className="ml-2 text-white">{user.email}</span>
                ) : (
                  <div className=" bg-white flex justify-center items-center ml-2">
                    <div
                      className={`border-2 my-1 border-solid mx-auto  border-gray-400 border-t-main rounded-full w-4 h-4 animate-spin`}
                    ></div>
                  </div>
                )}
              </h4>
              <h4
                className={`my-2 font-bold flex justify-start items-center text-black`}
              >
                Account type:
                <span
                  className={`${
                    user.role === "Pending" && "text-orange-400 "
                  } ml-2 flex justify-center items-center  text-white`}
                >
                  {user.role ? (
                    user.role
                  ) : (
                    <div className=" bg-white flex justify-center items-center ml-2">
                      <div
                        className={`border-2 my-1 border-solid mx-auto  border-gray-400 border-t-main rounded-full w-4 h-4 animate-spin`}
                      ></div>
                    </div>
                  )}
                </span>
              </h4>
              {user?.role === "Pending" && (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleAccept(user?._id)}
                    className="px-2 py-1 bg-main w-1/2 text-black font-bold rounded-md "
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(user?._id)}
                    className="px-2 py-1 bg-red-600 w-1/2 ms-1 text-white font-bold rounded-md "
                  >
                    Reject
                  </button>
                </div>
              )}
            </Link>
          ))
        ) : (
          <div className="w-full   top-0 left-0  flex justify-center items-center">
            <div
              className={`border-4 my-16 border-solid mx-auto  border-gray-400 border-t-second rounded-full w-16 h-16 animate-spin`}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
