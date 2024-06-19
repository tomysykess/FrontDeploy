import Link from "next/link";

export const Footer = () => {
  return (
    <div className="dark:bg-darkMode-greyVivino">
      <div className="flex justify-around items-center p-3 mx-large my-9  dark:bg-darkMode-greyVivino ">
        <div className="dark:bg-darkMode-greyVivino">
          <Link href="/">
            <p className="font-plus-jakarta-sans text-3xl font-extrabold text-wine dark:bg-darkMode-greyVivino">
              Liquors
            </p>
          </Link>
        </div>
        <div className="dark:bg-darkMode-greyVivino">
          <ul className="flex space-x-6 dark:bg-darkMode-greyVivino">
            <li className="font-plus-jakarta-sans font-semibold  dark:text-grey1">
              Contáctanos
              <ul className="flex flex-col">
                <li className="font-plus-jakarta-sans font-normal  dark:text-grey1">
                  Street Name 123, Buenos Aires, Argentina
                </li>
                <li className="font-plus-jakarta-sans font-normal  dark:text-grey1">
                  Teléfono: (123) 456-7890
                </li>
                <li className="font-plus-jakarta-sans font-normal  dark:text-grey1">
                  info@example.com
                </li>
              </ul>
            </li>
            <li className="flex flex-col">
              <ul className="flex flex-col">
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
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
