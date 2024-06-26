"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logged } from "../logged/logged";
import { UnLogged } from "../unLogged/unLogged";
import Link from "next/link";
import ThemeToggleButton from "../providerDark/buttonDark";

export const NavBar: React.FC = () => {
  const pathname = usePathname();
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("loginToken");
      setToken(JSON.parse(userToken!));
    }
  }, [pathname]);

  //________________________________________________________________________

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-darkMode-grey3 shadow-md">
      <nav className="pt-2">
        <div className="flex justify-between items-center p-3 mx-large">
          <div>
            <Link href="/">
              <p className="font-plus-jakarta-sans text-3xl font-extrabold text-wine ">
                Liquors
              </p>
            </Link>
          </div>
          <div>
            <ul className="flex space-x-6">
              <li>
                <Link
                  className="buttonSecondary  dark:text-grey1"
                  href="/product"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  className="buttonSecondary  dark:text-grey1"
                  href="/recommendation"
                >
                  Recomendado del Mes
                </Link>
              </li>
              <li>
                <Link
                  className="buttonSecondary  dark:text-grey1"
                  href="/newsletter"
                >
                  Boletín
                </Link>
              </li>
              <li>
                <Link
                  className="buttonSecondary  dark:text-grey1"
                  href="/aboutUs"
                >
                  Información
                </Link>
              </li>
            </ul>
          </div>
          <div>{token ? <Logged /> : <UnLogged />}</div>
          <ThemeToggleButton></ThemeToggleButton>
        </div>
      </nav>
    </div>
  );
};
