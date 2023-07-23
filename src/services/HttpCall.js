import axios from "axios"

export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        // Handle errors or log them as needed
        console.error('Error fetching data:', error.message);
        throw error;
    }
};