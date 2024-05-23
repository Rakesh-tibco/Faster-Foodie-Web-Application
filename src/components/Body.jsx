import RestaurantCard from "./RestaurantCard";
import { useState , useEffect } from "react";
import restlists from "../Utils/mockData";
import Shimmer from "./Shimmer";

const Body = () => {

  // React useState Hooks is used to change the state of components
  const [listOfRestaurants, setlistOfRestaurants] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] =
    useState([]);
  const [searchText,setSearchText] = useState("");

  useEffect(() => {
     fetchData();
  }, []);

  //whenever state variable update , react triggers a reconsilation cycle(re-render the component)
  console.log("re-render");

  const fetchData = async () => {
    const data = await fetch(
      // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.4358011&lng=81.846311&is-seo-homepage-enabled=true"
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1165549&lng=79.05617269999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    // optional chaining
    setlistOfRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilteredRestaurant(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  }
  

  return  listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              //filter the restaurant cards and update the UI
              console.log(searchText);
              const searchfilterlist = listOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setfilteredRestaurant(searchfilterlist);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="btn"
          onClick={() => {
            const filtered = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );

            setfilteredRestaurant(filtered);
          }}
        >
          Top Restaurants
        </button>
      </div>
      <div className="rest-container">
        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
