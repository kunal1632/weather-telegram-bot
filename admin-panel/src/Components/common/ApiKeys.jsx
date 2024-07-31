import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  addApiKey,
  getAllApiKey,
  removeApiKey,
  setActiveKey,
} from "../../services/operations/adminAPI";

const ApiKeys = () => {
  const token = useSelector((state) => state.auth);
  const [apiKeys, setApiKeys] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getAllApiKey(token);
      console.log(response);
      setApiKeys(response);
    })();
  }, [token]);

  const onSubmit = async (data) => {
    const apiKey = data.apiKey;

    try {
      const response = await addApiKey(apiKey, token);
      console.log(response);
      setApiKeys([...apiKeys, response]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyActive = async (apiKey) => {
    try {
      await setActiveKey(apiKey._id);
      setApiKeys((prevApiKeys) =>
        prevApiKeys.map((key) =>
          key._id === apiKey._id
            ? { ...key, isActive: true }
            : { ...key, isActive: false }
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteApi = async (apiKey) => {
    try {
      await removeApiKey(apiKey._id);
      setApiKeys((prevApiKeys) =>
        prevApiKeys.filter((key) => key._id !== apiKey._id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-900 min-h-[40%] px-10 py-5 border border-slate-600 rounded-lg mt-10">
      <h2 className="text-2xl text-white text-center">Weather Api Keys</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex  flex-col mt-5">
          <label className=" text-xl font-bold text-blue-500" htmlFor="apiKey">
            Add a new api key<sup className="text-red-500">*</sup>
          </label>
          <div className="flex flex-col md:flex-row gap-10 mt-5">
            <input
              id="apiKey"
              type="text"
              placeholder="Enter your api key"
              className="md:w-[50%] w-full px-5 py-2 bg-slate-700 rounded-xl text-white"
              {...register("apiKey", { required: true })}
            />
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 w-48 text-lg px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer"
            >
              Save
            </button>
          </div>
          {errors.apiKey && (
            <span className="ml-2 text-sm text-red-500">
              Api key is required
            </span>
          )}
        </div>
      </form>

      <div className="mt-5">
        <p className="text-blue-500 text-xl font-bold">Saved Keys</p>
        <div className="flex flex-col gap-3 mt-3 ml-5">
          {[...apiKeys].reverse().map((apiKey) => (
            <div
              className="flex justify-between md:w-[50%] flex-col md:flex-row"
              key={apiKey._id}
            >
              <p className="text-white text-lg text-">{apiKey.key}</p>
              <div className="flex gap-3 items-center justify-center">
                <button
                  onClick={() => handleKeyActive(apiKey)}
                  className={` w-32 py-1 font-semibold rounded-xl ${
                    apiKey.isActive
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  } transition-all duration-200 cursor-pointer`}
                >
                  {apiKey.isActive ? "Active" : "Set Active"}
                </button>
                <button
                  className="text-2xl text-red-500 cursor-pointer hover:opacity-80 transition-all duration-200"
                  onClick={() => {
                    handleDeleteApi(apiKey);
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;
