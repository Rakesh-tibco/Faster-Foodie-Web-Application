import { CDN_URL } from "../Utils/constants";

const RestaurantCard = (props) => {
  //console.log(props);
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    locality,
    avgRating,
    cuisines,
    sla,
  } = resData?.info;
  return (
    <div className="m-4 p-2 w-[250px] h-[450px] bg-orange-50 rounded-md hover:bg-orange-200 hover:shadow-lg leading-6">
      <img
        src={CDN_URL + cloudinaryImageId}
        className="rounded-md w-[240px] h-[230px] mb-2"
        alt="Food image"
      />
      <h4 className="font-bold py-2 text-lg">{name}</h4>
      <p className="text-sm">{locality}</p>
      <p className="text-sm">Rating {avgRating} of 5</p>
      <p className="text-sm">{cuisines.join(" , ")}</p>
      <p className="text-sm">{sla.slaString}</p>
    </div>
  );
};


//Higher order Component

// Input as RestaurantCard => RestaurantCardPromoted

export const withPromotedLable = (RestaurantCard ) => {
  
  return (props) => {
    const { resData } = props;
    return (
      <div>
        <label className="absolute p-2 rounded-md text-sm ml-6 mt-2 bg-orange-800 text-white">
          {resData?.info.aggregatedDiscountInfoV3?.header}{" "}
          {resData?.info.aggregatedDiscountInfoV3?.subHeader}
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  }
}
export default RestaurantCard;