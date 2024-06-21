import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL as string;
const ADD_REVIEW_URL = `${API_URL}review/add`
const GET_ALL_REVIEWS_URL = `${API_URL}review/`

export interface Review {
    name: string;
    surname: string;
    message: string;
    phoneNumber: string;
    rating: number;
}

class ReviewService {

    async addReview(review: Review): Promise<any> {
        return axios.post(
            ADD_REVIEW_URL,
            {
                name: review.name,
                surname: review.surname,
                message: review.message,
                phoneNumber: review.phoneNumber,
                rating: review.rating
            }
        )
    }

    async getAllReviews(): Promise<Review[]> {
        const response = axios.get(GET_ALL_REVIEWS_URL);
        return response.then((response) => {
            return response.data as Review[]
        });
    }
}

export default new ReviewService();