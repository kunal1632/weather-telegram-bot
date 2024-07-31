import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllUser, removeUser } from "../../services/operations/adminAPI";
import { MdDelete } from "react-icons/md";

const Users = () => {
  const token = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getAllUser(token);
      console.log(response);
      setUsers(response);
    })();
  }, [token]);

  const handleRemoveUser = async (user) => {
    try {
      await removeUser(user.chatId);
      setUsers((prevUsers) =>
        prevUsers.filter((userOld) => userOld._id !== user._id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-900 min-h-[40%] px-10 py-5 border border-slate-600 rounded-lg mt-10">
      <h2 className="text-2xl text-white text-center">All subscribed users</h2>

      <div className="flex flex-col mt-5">
        <p className="text-blue-500 text-xl font-bold">
          List of all the subscribed users
        </p>
        <div className="flex flex-col gap-3 mt-3 ml-5">
          {[...users].reverse().map((user) => (
            <div
              className="flex justify-between md:w-[50%] flex-col md:flex-row"
              key={user._id}
            >
              <p className="text-white text-lg">
                {user.firstName} - {user.chatId} - {user.city}
              </p>
              <button
                onClick={() => handleRemoveUser(user)}
                className={` w-32 py-1 font-semibold rounded-xl bg-red-500 hover:bg-red-600  transition-all duration-200 cursor-pointer flex gap-3 items-center justify-center`}
              >
                Remove <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
