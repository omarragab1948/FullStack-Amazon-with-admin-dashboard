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
export const deleteCategory = async (id, token) => {
  try {
    const res = await axiosInstance.delete(`/deletecategory/${id}`, {
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
export const getUserInfo = async (token) => {
  try {
    const res = await axiosInstance.get("/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};
export const getUserInfoForAdmin = async (token, id) => {
  try {
    const res = await axiosInstance.get(`/userinfoforadmin?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};
export const editUserInfo = async (token, userInfo) => {
  try {
    const res = await axiosInstance.put("/edituserinfo", userInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};
export const getUsers = async (token, role, search) => {
  try {
    const res = await axiosInstance.get(
      `/getusers?role=${role}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};
export const acceptUser = async (token, id) => {
  try {
    const res = await axiosInstance.post(`/acceptuser?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};
export const rejectUser = async (token, id) => {
  try {
    const res = await axiosInstance.post(`/rejectuser?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};
export const sellProduct = async (token, product) => {
  try {
    const res = await axiosInstance.post("/sellproduct", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};
export const getProducts = async (token, status, search) => {
  console.log(status)
  try {
    const res = await axiosInstance.get(
      `/getproducts?status=${status}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};
