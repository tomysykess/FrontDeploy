import { ISuscribe } from "@/interfaces/interfaz";

export const arraySuscribe: ISuscribe[] = [
  {
    title: "Plan Premium",
    description1: "Acceso ilimitado a nuestros artículos y reseñas destacadas.",
    description2:"Boletín informativo para estar al día de productos recomendados.",
    description3: "Acceso a la caja 'Recomendada del Mes' con productos a elegir.",
    description4:"Descuentos en productos seleccionados de nuestros vendedores asociados.",
    price: 100,
    type: "premium",
    role: 4,
  },

  {
    title: "Plan Empresas",
    description1: "Posibilidad de crear productos",
    description2: "Visualización de estadísticas de productos publicados",
    description3: "Administra tus productos en cualqueir momento",
    description4: "Incluye productos en 'Recomendado del mes'",
    price: 200,
    type: "seller",
    role: 3,
  },
];
