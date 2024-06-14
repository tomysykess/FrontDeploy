import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex justify-around items-center p-3 mx-large my-9">
      <div className="">
        <Link href="/">
          <p className="font-plus-jakarta-sans text-3xl font-extrabold text-wine ">
            Liquors
          </p>
        </Link>
      </div>
      <div>
        <ul className="flex space-x-6">
          <li>
            Contact Us
            <div className="flex flex-col">
              <li>Street Name 123, City, Country </li>
              <li>Phone: (123) 456-7890 </li>
              <li>info@example.com </li>
            </div>
          </li>
          <div className="flex flex-col">
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
          </div>
        </ul>
      </div>
    </div>
  );
};
