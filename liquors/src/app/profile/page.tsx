'use client'
import { DashboardSelector } from "@/components/dashboardSelector/dashboardSelector";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Profile: React.FC = () => {

  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    setToken(loginToken);

    if (!loginToken) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      {token && (
        <DashboardSelector />
      )}
    </>
  );
};

export default Profile;
 