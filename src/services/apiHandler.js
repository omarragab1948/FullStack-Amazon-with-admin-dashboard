import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
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

export const signOut = async () => {
  try {
    const res = await axiosInstance.post("/signout");
    return res;
  } catch (err) {
    throw err;
  }
};
export const getCategories = async (token) => {
  try {
    const res = await axiosInstance.get("/getcategories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const addCategory = async (cat, token) => {
  console.log(cat, token);

  try {
    const res = await axiosInstance.post("/addcategory", cat, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res;
  } catch (err) {
    throw err;
  }
};
