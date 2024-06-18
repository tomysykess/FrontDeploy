import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex justify-around items-center p-3 mx-large my-9 ">
      <div>
        <Link href="/">
          <p className="font-plus-jakarta-sans text-3xl font-extrabold text-wine">
            Liquors
          </p>
        </Link>
      </div>
      <div>
        <ul className="flex space-x-6">
          <li className="font-plus-jakarta-sans font-semibold">
            Contáctanos
            <ul className="flex flex-col">
              <li className="font-plus-jakarta-sans font-normal">
                Street Name 123, Buenos Aires, Argentina
              </li>
              <li className="font-plus-jakarta-sans font-normal">
                Teléfono: (123) 456-7890
              </li>
              <li className="font-plus-jakarta-sans font-normal">
                info@example.com
              </li>
            </ul>
          </li>
          <li className="flex flex-col">
            <ul className="flex flex-col">
              <li>
                <Link className="buttonSecondary" href="/recommendation">
                  Recomendado del Mes
                </Link>
              </li>
              <li>
                <Link className="buttonSecondary" href="/newsletter">
                  Boletín
                </Link>
              </li>
              <li>
                <Link className="buttonSecondary" href="/aboutUs">
                  Información
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
