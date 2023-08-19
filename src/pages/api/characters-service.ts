import axios from "axios";
import { FetchDataTpye } from "./types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

export const fetchData = async (): Promise<FetchDataTpye | undefined> => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const searchCharacters = async (
  searchQuery: string
): Promise<FetchDataTpye | undefined> => {
  console.log(apiUrl);
  try {
    const response = await axios.get(apiUrl + `?search=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error("Error searching data:", error);
  }
};
