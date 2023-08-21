import axios from "axios";
import { FetchDataType } from "./types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

export const fetchData = async () => {
  try {
    const response = await axios.get<FetchDataType>(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const searchCharacters = async (searchQuery: string) => {
  try {
    const response = await axios.get<FetchDataType>(
      apiUrl + `?search=${searchQuery}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching data:", error);
  }
};

export const fetchNextPage = async (nextUrl: string) => {
  try {
    const response = await axios.get<FetchDataType>(nextUrl);
    return response.data;
  } catch (error) {
    console.error("Error searching data:", error);
  }
};
