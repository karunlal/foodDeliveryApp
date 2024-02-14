import { useState } from 'react'
import Shimmer from './Shimmer'
import { CDN_URL, LOGO_URL, MENU_API } from '../utils/constants'
import { useParams } from 'react-router-dom'
import useRestaurantMenu from '../utils/useRestaurant'
import RestaurantCategory from './RestaurantCategory'

const RestaurantMenu = () => {
  const { resid } = useParams()
  const resInfo = useRestaurantMenu(resid)
  console.log('resid:', resid)
  const [showIndex, setShowIndex] = useState('null')

  if (
    !resInfo ||
    !resInfo.cards ||
    !resInfo.cards[0] ||
    !resInfo.cards[0].card ||
    !resInfo.cards[0].card.card ||
    !resInfo.cards[0].card.card.info
  ) {
    return <Shimmer />
  }

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info
  const itemsCards =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
      ?.itemCards || []

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    )

  console.log(categories)

  //console.log(itemsCards)

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        <h2>
          {cuisines.join(' , ')}- {costForTwoMessage}
        </h2>
      </p>

      {/**/}
      {categories.map((category, index) => (
        // controlled component
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() =>
            setShowIndex(index === showIndex ? 'null' : index)
          }
        />
      ))}
    </div>
  )
}

export default RestaurantMenu
