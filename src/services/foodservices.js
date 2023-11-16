import axios from "axios";

//food apis
export const getAll = async () => {
  const { data } = await axios.get("/api/foods");
  return data;
};

export const getfoodCategory = async (category) => {
  try {
    const { data } = await axios.get("/api/foods/category/" + category);
    return data;
  } catch (error) {
    console.log("error fetching food for category ${category}:", error);
    return null;
  }
};
