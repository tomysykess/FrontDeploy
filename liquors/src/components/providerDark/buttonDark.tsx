import { useTheme } from "./ProviderDark";

const ButtonDark = () => {
  const { theme, toggleTheme }: any = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-wine text-greyVivino
"
    >
      {theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
    </button>
  );
};

export default ButtonDark;
