import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

export const loadToken = async () => {
  try {
    const token = await AsyncStorage.getItem("jwt");
    return token !== null ? token : null;
  } catch (error) {
    console.error("Error al obtener el token:", error);
  }
};

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("jwt", token);
  } catch (error) {
    console.error("Error al guardar el token:", error);
  }
};

export const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem("jwt");
  } catch (error) {
    console.error("Error al eliminar el token:", error);
  }
};

export const decodeToken = (token) => {
  return jwtDecode(token);
};
