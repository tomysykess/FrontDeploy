import NewsletterForm from "@/components/emailJSForm/EmailJSForm";
import NewsList from "@/components/newsList/NewsList";

const Newsletter = () => {
  return (
    <div className="bg-greyVivino dark:bg-darkMode-greyVivino">
      <div className="p-20 pb-0">
        <h1 className="text-wine text-center text-6xl font-plus-jakarta-sans  mb-8">
          Bienvenido a nuestro Boletín
        </h1>
        <p className="font-plus-jakarta-sans text-2xl text-center mb-16  dark:text-darkMode-white ">
          Te invitamos a explorar nuestras últimas noticias y artículos, donde
          descubrirás novedades, tendencias y fascinantes historias del mundo de
          las bebidas. ¡Sumérgete y disfruta!
        </p>
      </div>
      <NewsList />
      <NewsletterForm></NewsletterForm>
    </div>
  );
};

export default Newsletter;
