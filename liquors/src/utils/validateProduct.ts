import { IProductForm, IProductFormErrorProps } from "@/components/productForm/types";

export function validateProductForm(data: IProductForm): IProductFormErrorProps {
    let errors: IProductFormErrorProps = {};
  
    // Validar nombre
    if (!data.name) {
      errors.name = 'El nombre es obligatorio.';
    } else if (data.name.trim().length > 50) {
      errors.name = 'El nombre no puede tener más de 50 caracteres.';
    }
  
    // Validar descripción
    if (!data.description) {
      errors.description = 'La descripción es obligatoria.';
    } else if (data.description.trim().length < 100 || data.description.trim().length > 500) {
      errors.description = 'La descripción debe tener más de 100 caracteres pero menos de 500.';
    }
  
    // Validar URL de imagen
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!data.imgUrl) {
      errors.imgUrl = 'La URL de la imagen es obligatoria.';
    } else if (!urlRegex.test(data.imgUrl)) {
      errors.imgUrl = 'La URL de la imagen no es válida.';
    }
  
    // Validar categoría
    if (!data.category) {
      errors.category = 'La categoría es obligatoria.';
    }
  
    // Validar ABV
    const abv = Number(data.abv);
    if (abv === undefined || data.abv === null) {
      errors.abv = 'El ABV es obligatorio.';
    } else if (abv <= 0 || abv > 99.99) {
      errors.abv = 'El ABV debe ser un número mayor que 0 y menor o igual a 99.99.';
    }
  
    // Validar país
    const countries = ["Argentina", "Brazil", "Canada", "France", "Germany", "Italy", "Japan", "Mexico", "Spain", "United Kingdom", "United States"];
    if (!data.country) {
      errors.country = 'El país es obligatorio.';
    } else if (!countries.includes(data.country)) {
      errors.country = 'El país debe ser un país existente.';
    }
  
    // Validar tamaño
    const size = Number(data.size);
    if (size === undefined || size === null) {
      errors.size = 'El tamaño es obligatorio.';
    } else if (size <= 0 || size > 2000) {
      errors.size = 'El tamaño debe ser un número mayor que 0 y menor o igual a 2000.';
    }
  
    return errors;
  }
  
  
