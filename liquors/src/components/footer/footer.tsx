import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-white pb-1 pt-1 dark:bg-darkMode-grey3">
      <div className="flex justify-around items-center p-3 mx-large my-9  dark:bg-darkMode-grey3 ">
        <div className="dark:bg-darkMode-greyVivino">
          <Link href="/">
            <p className="font-plus-jakarta-sans text-3xl font-extrabold text-wine dark:bg-darkMode-grey3">
              Liquors
            </p>
          </Link>
        </div>
        <div className="dark:bg-darkMode-grey3">
          <ul className="flex space-x-6 dark:bg-darkMode-grey3">
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
