import { useContext } from 'react'
import { CDN_URL } from '../utils/constants'
import UserContext from './userContext'
const RestaurantCard = (props) => {
  const { resData } = props
  const { loggedInUser } = useContext(UserContext)
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    resData?.info

  return (
    <div className="m-4 p-4 w-[250px] h-[350px] flex flex-col  hover:bg-gray-200">
      <img
        className="rounded-lg h-40 w-full object-cover mb-2 "
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
      />
      <h3 className="font-bold text-lg">{name}</h3>
      <h3 className="text-sm max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
        {cuisines.join('|')}{' '}
      </h3>
      <h3 className="text-sm">{avgRating} stars</h3>
      <h3 className="text-sm">{costForTwo}</h3>
      <h3 className="text-sm">{sla.slaString}</h3>
      <h3 className="text-sm font-bold">User:{loggedInUser}</h3>
    </div>
  )
}

export const withStaredLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg- bg-white text-red-700 font-bold text-5xl  p-1 rounded-lg">
          *
        </label>
        <RestaurantCard {...props} />
      </div>
    )
  }
}
export default RestaurantCard
