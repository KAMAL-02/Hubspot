"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/utils/useAuthStore";
import CRMData from "@/components/CRM-data";
import ClipLoader from "react-spinners/ClipLoader";

const Page = () => {
  const { isLoggedIn, setIsLoggedIn, loading } = useAuthStore();

  useEffect(() => {
    // Checks if the user is logged in or not
  }, [setIsLoggedIn]);

  return (
    <div
      className="flex justify-center items-center"
      style={{ textAlign: "center" }}
    >
      {isLoggedIn ? (
        <CRMData />
      ) : loading ? (
        <ClipLoader size={40} color="#3b82f6" />
      ) : (
        <div>Please log in to view the content.</div>
      )}
    </div>
  );
};

export default Page;
