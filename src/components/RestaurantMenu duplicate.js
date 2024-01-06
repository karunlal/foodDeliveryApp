import { useState, useEffect } from 'react'
import Shimmer from './Shimmer'
import { CDN_URL, LOGO_URL, MENU_API } from '../utils/constants'
import { useParams } from 'react-router-dom'

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState([])
  const [listOfMenu, setListOfMenu] = useState([])

  const params = useParams()
  console.log(params)
  useEffect(() => {
    fetchMenu('')
  }, [])

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId)
    const json = await data.json()

    setResInfo(json.data)
    console.log(resInfo)
    setListOfMenu(json.data)
    console.error(listOfMenu)
  }

  if (resInfo === null) {
    return <Shimmer />
  }

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards?.[0]?.card?.card?.info

  const cards = listOfMenu[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards || []
  const itemsCard =
    cards.length > 1
      ? cards[1]?.card?.card?.itemCards || []
      : cards[0]?.card?.card?.itemCards || []

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h2>{cuisines}</h2>
      <h3>{costForTwoMessage}</h3>
      <h1>Menu</h1>

      {itemsCard.map((menu, index) => (
        <ul key={index}>
          <li>
            {menu.card.info.name} - Rs
            {menu.card.info.price / 100}
          </li>
        </ul>
      ))}
    </div>
  )
}

export default RestaurantMenu
