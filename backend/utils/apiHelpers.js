import axios from "axios";


export const fetchData = async (url, method = "GET", body = null) => {
    try {
        const options = {
            method,
            headers: { "Content-Type": "application/json" },
        };

        if (body) {
            options.data = JSON.stringify(body); // Corpo em JSON
        }

        const response = await axios(url, options);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error.message);
        throw error;
    }
};
 
