import { useState, useEffect } from 'react'
import Shimmer from './Shimmer'
import { CDN_URL, LOGO_URL, MENU_API } from '../utils/constants'
import { useParams } from 'react-router-dom'

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState([])
  const [listOfMenu, setListOfMenu] = useState([])

  const { resid } = useParams()

  useEffect(() => {
    fetchMenu('')
  }, [])

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resid)
    const json = await data.json()
    setResInfo(json.data)
    //console.log(json.data.cards[0].card.card.info)
    setListOfMenu(
      json.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card
        .itemCards
    )
    console.log(
      json.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card
    )
  }
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
  const { itemsCards } =
    resInfo?.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card
      .itemCards

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h2>{cuisines.join(' | ')}</h2>
      <h3>{costForTwoMessage}</h3>
      <h1>Menu</h1>

      {listOfMenu.map((menu) => (
        <ul key={menu.card.id}>
          <li>
            {menu.card.info.name}
            {'------------  Rs - '}
            {menu.card.info.price / 100 || menu.card.info.defaultPrice / 100}

            <img
              src={
                'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/' +
                menu.card.info.imageId
              }
              alt="menu-logo"
            />
          </li>
        </ul>
      ))}
    </div>
  )
}

export default RestaurantMenu
