import axios from "axios";

export const putUserProfile = async (id: string, downloadURL: any) => {
  try {
    const dataImg = {
      profileImage: downloadURL,
    };

    await axios.put(
      `https://liquors-project.onrender.com/users/${id}`,
      dataImg
    );
    console.log("Datos de usuario guardados exitosamente");
  } catch (error) {
    console.error("Error al guardar los datos del usuario:", error);
  }
};

export const getUserProfile = async (id: string) => {
  try {
    const res = await axios.get(
      `https://liquors-project.onrender.com/users/${id}`
    );
    const data = res.data.profileImage;
    localStorage.setItem("profile", data);
  } catch (error) {}
};
