import Link from "next/link";

export const NotProduct = () => {

    return (
        <div className="bg-greyVivino flex flex-col justify-center items-center mt-32 mr-64 w-full">
            <h1 className="pb-6 text-gray-600 text-xl font-normal">Aun no cuentas con productos publicados</h1>
            <p className="text-gray-600">Publica tu producto <Link href="/profile/dashboardProducer/formUser" className="buttonPrimary hover:cursor-pointer">Aqui</Link></p>
        </div>
    );
}