import { CDN_URL } from '../utils/constants'
const RestaurantCard = (props) => {
  const { resData } = props
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    resData?.info

  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
      />

      <h3>{name} </h3>
      <h3>{cuisines.join('|')} </h3>
      <h3>{avgRating} stars</h3>
      <h3>{costForTwo}</h3>
      <h3>{sla.slaString}</h3>
    </div>
  )
}

export default RestaurantCard
