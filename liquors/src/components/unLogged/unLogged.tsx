import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";

export const UnLogged: React.FC = () => {
  return (
    <div>
      <ul className="flex space-x-6">
        <li>
          <Link className="buttonSecondary" href="/login">
            Iniciar Sesión
          </Link>
        </li>
        <li>
          <Link className="buttonPrimary" href="/register">
            Registrarse
          </Link>
        </li>
      </ul>
    </div>
  );
};
