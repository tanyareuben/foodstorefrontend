import axios from "axios";

//food apis
export const getAll = async () => {
  const { data } = await axios.get("/products");
  console.log(data);
  return data;
};

export const getfoodCategory = async (category) => {
  try {
    const { data } = await axios.get("/products/byCategory/" + category);
    return data;
  } catch (error) {
    console.log("error fetching food for category ${category}:", error);
    return null;
  }
};

export const search = async (searchFood) => {
  try {
    const { data } = await axios.get(
      "/products/search/" + encodeURIComponent(searchFood)
    );
    return data;
  } catch (error) {
    console.error("Error during search:", error);
    throw error;
  }
};
