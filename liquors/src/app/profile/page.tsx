"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MenuDashboard } from "@/components/dashboardJuan/menuDashboard/menuDashboard";
import { AccountInfoCard } from "@/components/dashboardJuan/dashboardUser/dashboardUser";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
/* import { getUserProfile } from "@/utils/putUserProfile"; */

const Profile: React.FC = (): React.ReactNode => {
  /*const getToken = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("loginToken") || null;
    }
    return null;
  };*/

  //const [token] = useState(getToken)

  const [token, setToken] = useState<string | null>(null);

  // Estado del usuario
  const [dataUser, setDataUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    imageUrl: "",
  });

  const router = useRouter();

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    setToken(loginToken);
  }, []);

  useEffect(() => {
    const userDataFromStorage: any = localStorage.getItem("userDataLogin");
    const dataParsed = JSON.parse(userDataFromStorage);
    if (dataParsed) {
      setDataUser(dataParsed);
      /*       getUserProfile(dataUser.id); */
    }
  }, []);

  return (
    <>
      {token && (
        <>
          <div className="bg-greyVivino dark:bg-darkMode-greyVivino flex flex-row pt-1 mb-1 h-screen">
            <MenuDashboard />
            <div className="w-full">
              <h1 className="font-plus-jakarta-sans pt-4 text-3xl text-center text-wine font-semibold">
                ¡Bienvenido, {dataUser.name}!
              </h1>
              <br></br>
              <div className="flex flex-col items-center w-auto">
                <hr className="w-auto border-gray-300" />
              </div>
              <AccountInfoCard />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
