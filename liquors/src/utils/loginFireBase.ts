import axios from "axios";

const loginUserFireBase = async (formData: any, auth:any, signInWithEmailAndPassword: any ,setIsSuccess: any, setError: any, router: any, setIsLoading: any) => {

  try {
        //___________________________________________POST LOGIN A FIREBASE_________________________________________
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        //TOKEN LOGIN FIREBASE, CARGO AL LOCALSTORAGE
        const user = JSON.stringify(userCredential.user.accessToken);
        localStorage.setItem("loginToken", user)
        //UID LOGIN FIREBASE, CARGO AL LOCALSTORAGE /--> este tomi lo envia al back para recibir otro
        const userUid = userCredential.user.uid
        JSON.stringify(userUid)
        localStorage.setItem("uidLoginFirebase", userUid)
        //__________________________________________POST LOGIN A BACK END_________________________________________
        const loginObjet = {
          email: userCredential.user.email,
          firebaseUid: userCredential.user.uid
          }
        const response = await axios.post("https://liquors-project.onrender.com/users/signin", loginObjet)
        //USERDATA LOGIN
        const userDataLogin: any = {
          name: formData.name, 
          email: userCredential.user.email,
          id: response.data.id,
          role: response.data.role,
          token: response.data.token
        }
        const newData = JSON.stringify(userDataLogin)
        localStorage.setItem("userDataLogin", newData)
        setIsSuccess(true);
        setError(null)
        setTimeout(() => {
          router.push("/")
        }, 2000);
  } catch (error: any) {
        const errorMessage = error.message;
        console.error('Error en el inicio de sesión:', error);
        setError(errorMessage);
        setIsSuccess(false);
  } finally {
       setIsLoading(false);
  }
};

export default loginUserFireBase;