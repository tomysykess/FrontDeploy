import { ISuscribe } from "@/interfaces/interfaz";

export const arraySuscribe: ISuscribe[] = [
  {
    title: "Plan Premium",
    description1: "Acceso ilimtado a nuestros artículos.",
    description2: "Boletín informativo.",
    description3: `Acceso a la caja 'Recomendada del Mes'.`,
    description4: "Descuentos en eventos.",
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
