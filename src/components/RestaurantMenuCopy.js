import { useState, useEffect } from 'react'
import Shimmer from './Shimmer'

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState([])

  useEffect(() => {
    fetchMenu('')
  }, [])

  const fetchMenu = async () => {
    try {
      const data = await fetch(
        'https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=11.2587531&lng=75.78041&restaurantId=395946&catalog_qa=undefined&submitAction=ENTER'
      )
      const json = await data.json()

      setResInfo(json.data)

      console.log(json.data) // Log the entire structure of resInfo
    } catch (error) {
      console.error('Error fetching menu:', error)
    }
  }

  // if (
  //   resInfo === null ||
  // !resInfo.cards ||
  // !resInfo.cards[0] ||
  // !resInfo.cards[0].card
  // ) {
  //   return <Shimmer />
  // }

  const info = resInfo.cards[0].card.card.info

  if (!info) {
    console.error('Info property is undefined:', resInfo)
    return <Shimmer />
  }

  const {
    name = 'Default Name',
    cuisines = 'Default Cuisines',
    costForTwoMessage = 'Default Cost',
  } = info

  return (
    <div className="menu">
      <h1>{name}</h1>
      <ul>
        <li>{cuisines}</li>
        <h3>{costForTwoMessage}</h3>
      </ul>
      <h1>Menu</h1>
    </div>
  )
}

export default RestaurantMenu
