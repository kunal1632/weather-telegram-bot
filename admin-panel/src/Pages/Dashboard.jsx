import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const [settings, setSettings] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("token", token);
      history.push("/admin");
    }
  }, [history]);

  useEffect(() => {
    const fetchSettings = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          "http://localhost:3000/admin/settings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSettings(response.data);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {settings ? (
        <p>Settings: {JSON.stringify(settings)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
