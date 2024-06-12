import axios from "axios";

const registerUserFirebase = async (formData: any, auth:any, createUserWithEmailAndPassword: any ,setIsSuccess: any, setErrors: any, router: any, errors: any, setIsLoading: any, setToken: any) => {
      try {
            //___________________________________________POST REGISTER A FIREBASE_________________________________________
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            //DATA USUARIO REGISTRADO
            const userFirebase = userCredential.user; //Objeto que contiene información del usuario registrado. (token, mail, etc.
            const token = JSON.stringify(userFirebase.accessToken)
            localStorage.setItem("loginToken", token)
            //___________________________________________POST REGISTER A BACK END_________________________________________
            const dataRegisterBack = {
                  name: formData.name, 
                  email: userFirebase.email, 
                  firebaseUid: userFirebase.uid,
                  provider: null
            }
            const response = await axios.post("https://liquors-project.onrender.com/users/signup", dataRegisterBack )
            //DATA CARGADA AL LOCALSTORAGE (token, id)
            const dataRegisterBackLog = {
                  name: formData.name, 
                  email: userFirebase.email, 
                  id: response.data.id,
                  rol: response.data.role,
                  token: response.data.token
            }
            const newData = JSON.stringify(dataRegisterBackLog)
            localStorage.setItem("userDataLogin", newData)
            setIsSuccess(true);
            setErrors({});
            setTimeout(() => {
                  router.push("/")
            }, 2000);
      } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error en el registro:', errorCode, errorMessage);
            console.log(error);
            setErrors({ ...errors, submit: errorMessage }); 
      } finally {
            setIsLoading(false);
      }
};

export default registerUserFirebase;
