import { useEffect, useState } from "react";
import { MENU_API_URL } from "../Utils/constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API_URL + resId);
    const json = await data.json();
    setResInfo(json.data);
  //  console.log(json);
  };

  return resInfo;
};

export default useRestaurantMenu;
