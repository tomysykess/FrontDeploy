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
          <li className="font-plus-jakarta-sans">
            Contact Us
            <ul className="flex flex-col">
              <li className="font-plus-jakarta-sans">
                Street Name 123, City, Country
              </li>
              <li className="font-plus-jakarta-sans">Phone: (123) 456-7890</li>
              <li className="font-plus-jakarta-sans">info@example.com</li>
            </ul>
          </li>
          <li className="flex flex-col">
            <ul className="flex flex-col">
              <li>
                <Link className="buttonSecondary" href="/recommendation">
                  Pick of the Month
                </Link>
              </li>
              <li>
                <Link className="buttonSecondary" href="/newsletter">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link className="buttonSecondary" href="/aboutUs">
                  About Us
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
