import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export const UserData: React.FC = () => {
    const pathname = usePathname();
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        email: "",
        rol: ""
        });
        
        useEffect(() => {
            if (typeof window !== "undefined" && window.localStorage) {
                const storeData = localStorage.getItem("userDataLogin");
                setUserData(JSON.parse(storeData!));
                }
                }, [pathname]);
                
    const roles = ["Usuario", "Administrador", "Vendedor", "Premium"];
    
    return (
        <div className="flex flex-col justify-center w-fit p-6 bg-greyVivino">
            <h1 className="pb-8 text-gray-600 text-xl font-normal">Datos del usuario</h1>
            <p className="pb-2 text-gray-600 text-l font-normal">Nombre de la marca: {userData.name}</p>
            <p className="pb-2 text-gray-600 text-l font-normal">Email: {userData.email}</p>
            <div className="flex flex-row gap-2">
            <p className="pb-2 text-gray-600 text-l font-normal">Tipo de usuario: </p>
            <p className="pb-2 text-gray-600 text-l font-bold">
                {Number(userData.rol) === 1 && roles[0]}
                {Number(userData.rol) === 2 && roles[1]}
                {Number(userData.rol) === 3 && roles[2]}
                {Number(userData.rol) === 4 && roles[3]}
            </p>
            </div>
        </div>
    );
}

export default UserData;