"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MenuDashboard } from "@/components/dashboardJuan/menuDashboard/menuDashboard";
import { ProductForm } from "@/components/productForm/productForm";

const FormUser = () => {
  const [token, setToken] = useState<any>();
  const [role, setRole] = useState<any>({ rol: "" });
  console.log("rol de dashboardProducer", role);

  const router = useRouter();

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    setToken(loginToken);
    if (loginToken) {
      const dataLogin: any = localStorage.getItem("userDataLogin");
      const dataLoginParsed = JSON.parse(dataLogin);
      setRole(dataLoginParsed.role);
    } else {
      router.push("/");
    }
  }, [token]);

  return (
    <>
      {token && (
        <>
          <div className="bg-greyVivino flex flex-row pt-1 mb-1">
            <MenuDashboard />
            <div className="w-full mr-64">
              <ProductForm />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FormUser;
