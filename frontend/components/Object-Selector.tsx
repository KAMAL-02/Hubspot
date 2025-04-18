"use client";

import { useCRMStore } from "@/utils/useCRMstore";
import { useLoadingStore } from "@/utils/useLoadingStore";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

export default function CRMObjectSelector() {
  const {
    selectedObject,
    setSelectedObject,
    setRecords,
    customObjects,
    setCustomObjects,
  } = useCRMStore();
  const { setLoading } = useLoadingStore();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const coreObjects = ["contacts", "companies", "deals"];

  const handleClick = async (obj: string, isCustom = false) => {
    setSelectedObject(obj);

    try {
      setLoading(true);
      const url = isCustom
        ? `${BASE_URL}/crm/custom/${obj}`
        : `${BASE_URL}/crm/${obj}`;

      const res = await axios.get(url, {
        headers: {
          "access-token": accessToken || "",
          "refresh-token": refreshToken || "",
        },
      });

      const data = res.data;

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }

      setRecords(data.data.results || []);
    } catch (error) {
      console.log("Error fetching CRM data:", error);
      toast.error("Error fetching data");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch custom objects when component mounts
  useEffect(() => {
    const fetchCustomSchemas = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/crm/custom/schemas`, {
          headers: {
            "access-token": accessToken || "",
            "refresh-token": refreshToken || "",
          },
        });

        const data = res.data;
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
        }

        setCustomObjects(data.data.results || []);
      } catch (error) {
        console.log("Error fetching custom object schemas:", error);
        toast.error("Failed to load custom object");
      }
    };

    fetchCustomSchemas();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-2 border-r border-gray-300 max-w-sm">
      {coreObjects.map((obj) => (
        <button
          key={obj}
          onClick={() => handleClick(obj)}
          className={`text-left px-3 py-2 rounded cursor-pointer ${
            selectedObject === obj ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
          }`}
        >
          {obj.charAt(0).toUpperCase() + obj.slice(1)}
        </button>
      ))}

      {customObjects.length > 0 && (
        <>
          <div className="mt-4 font-semibold text-sm text-gray-500">Custom Objects</div>
          {customObjects.map((obj) => (
            <button
              key={obj.fullyQualifiedName}
              onClick={() => handleClick(obj.fullyQualifiedName, true)}
              className={`text-left px-3 py-2 rounded cursor-pointer text-sm ${
                selectedObject === obj.fullyQualifiedName
                  ? "bg-blue-100 font-semibold"
                  : "hover:bg-blue-50"
              }`}
            >
              {obj.labels.plural}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
