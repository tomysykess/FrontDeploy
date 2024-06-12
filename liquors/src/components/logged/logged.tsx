import { useRouter } from "next/navigation";
import Link from "next/link";
//icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/interfaz";

export const Logged: React.FC = ():React.ReactNode => {
  const router = useRouter();
  
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const name: any = localStorage.getItem("userDataLogin")
    const nameParsed: IUser = JSON.parse(name)
    setUserName(nameParsed.name)
  }, [])

  const logoutHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    localStorage.removeItem("loginToken");
    router.push("/");
    window.location.reload();
    
  };

  return (
    <div>
      <ul className="flex space-x-6">
        <li>
          <Link className="buttonSecondary" href="/profile">
            <AccountCircleIcon />
            {userName}
          </Link>
        </li>
        <li>
          <span
            onClick={logoutHandler}
            className="buttonSecondary"
            style={{ cursor: "pointer" }}
          >
            <LogoutIcon></LogoutIcon>
            Log Out
          </span>
        </li>
      </ul>
    </div>
  );
};
