import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});
export const signUp = async (user) => {
  try {
    const res = await axiosInstance.post("/signup", user);
    return res;
  } catch (err) {
    throw err;
  }
};

export const signIn = async (user) => {
  try {
    const res = await axiosInstance.post("/signin", user);
    return res;
  } catch (err) {
    throw err;
  }
};
