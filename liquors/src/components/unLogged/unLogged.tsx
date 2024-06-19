import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";

export const UnLogged: React.FC = () => {
  return (
    <div>
      <ul className="flex space-x-6  dark:text-grey1">
        <li>
          <Link className="buttonSecondary  dark:text-grey1" href="/login">
            Iniciar Sesión
          </Link>
        </li>
        <li>
          <Link className="buttonPrimary  dark:text-grey1" href="/register">
            Registrarse
          </Link>
        </li>
      </ul>
    </div>
  );
};
