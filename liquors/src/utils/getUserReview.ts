import axios from "axios";
//import { IReview } from "@/interfaces/interfaz";
import { IdAndToken } from "@/interfaces/interfaz";
import { userReadReviews, userClearReviews } from "@/store/reducers/reviewsSlice";


export const getUserReview = async (userTokenAndId:IdAndToken,  dispatch: any,) => {
    try {
        const headers = {
            Authorization: `Bearer: ${userTokenAndId.token}`
        };
        const response = await axios.get(`https://liquors-project.onrender.com/reviews/user/${userTokenAndId.id}`, {headers})
        console.log("respuesta del back a getUserReviews:", response);
        dispatch(userClearReviews());
        dispatch(userReadReviews(response.data))
    } catch (error: any) {
        console.log("error getUserReviews:", error.response.data.message);
    }
}