import { useRouter } from "next/navigation";
import Link from "next/link";
//icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/interfaz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const Logged: React.FC = (): React.ReactNode => {
  const router = useRouter();

  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const name: any = localStorage.getItem("userDataLogin");
    const nameParsed: IUser = JSON.parse(name);
    if (nameParsed) {
      setUserName(nameParsed.name);
    }
  }, []);

  const logoutHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("userDataLogin");
    router.push("/");
  };

  const favHandler = () => {
    router.push("/profile/dashboardUser/favoritos");
  };

  return (
    <div>
      <ul className="flex space-x-6">
        <li>
          <span
            onClick={favHandler}
            style={{ cursor: "pointer" }}
            className="buttonSecondary  dark:text-grey1"
          >
            <FavoriteBorderIcon />
            Favoritos
          </span>
          <Link
            className="buttonSecondary ml-5  dark:text-grey1"
            href="/profile"
          >
            <AccountCircleIcon />
            {userName}
          </Link>
        </li>
        <li>
          <span
            onClick={logoutHandler}
            className="buttonSecondary  dark:text-grey1"
            style={{ cursor: "pointer" }}
          >
            <LogoutIcon></LogoutIcon>
            Cerrar Sesión
          </span>
        </li>
      </ul>
    </div>
  );
};
