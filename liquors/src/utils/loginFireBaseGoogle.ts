import axios from "axios";

const loginUserFireBaseGoogle = async (auth: any, provider: any, router: any, setErrorGoogle:any, setIsLoadingGoogle: any, setIsSuccessGoogle: any, signInWithPopup: any) => {
    try {
        //___________________________________________LOGIN GOOGLE A FIREBASE_________________________________________
        const result = await signInWithPopup(auth, provider);
        //LOGIN TOKEN
        const userData = JSON.stringify(result.user.accessToken);
        localStorage.setItem("loginToken", userData)
        //UID 
        const userDataUid = JSON.stringify(result.user.uid);
        localStorage.setItem("uidFirebaseGoogleLogin", userDataUid)
        //____________________________________POST REGISTER/LOGIN GOOGLE A BACK END______________________________________
        const registerObjetGoogle = {
            name: result.user.displayName,
            email: result.user.email,
            firebaseUid: result.user.uid,
            provider: result.user.providerData[0].providerId, 
            //provider: backend valida esta propiedad, si ya existe una cuenta que tenga esta propiedad y el valor de dicha propiedad sea "google.com", 
            //directamente evita el registro y me manda el token de login.
        }
        const response = await axios.post("https://liquors-project.onrender.com/users/signup", registerObjetGoogle)
        //USER DATA LOGIN/REGISTER GOOGLE
        console.log("respuesta back login google", response);
        const userDataLogin: any = {
            name: result.user.displayName,
            email: result.user.email,
            id: response.data.id,
            role: response.data.role,
            token: response.data.token
        }
        const newData = JSON.stringify(userDataLogin)
        localStorage.setItem("userDataLogin", newData)
        setErrorGoogle(null)
        setIsSuccessGoogle(true);
        router.push("/")
    } catch (error: any) {
        console.log("error firebase google login", error);
        setErrorGoogle(error.response.data.message);
        setIsSuccessGoogle(false);
    } finally {
        setIsLoadingGoogle(false);
    }
  };
  
export default loginUserFireBaseGoogle;