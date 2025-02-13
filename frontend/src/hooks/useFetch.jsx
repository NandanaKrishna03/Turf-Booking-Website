import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch = (url) => {
    const [data, setData] = useState();
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: url,
            });
            console.log("API Response:", response); // Log the full response
            console.log("API Data:", response?.data); // Log the data
            setData(response?.data?.data); // Ensure this matches the backend response structure
            setIsloading(false);
        } catch (error) {
            console.log("API Error:", error); // Log the error
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return [data, isLoading, error];
};