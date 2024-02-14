import { useState, useEffect } from 'react'
import RestaurantCard, { withStaredLabel } from './RestaurantCard'
import resList from '../utils/mockData'
import Shimmer from './Shimmer'
import { Link } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([])
  const [filteredRestaurant, setFilteredRestaurant] = useState([])

  const [searchText, setSearchText] = useState('')

  const RestaurantCardStared = withStaredLabel(RestaurantCard)
  //console.log('BodyRendered')
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await fetch(
      'https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=11.2587531&lng=75.78041&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
    )

    const json = await data.json()
    console.log(json)
    console.log(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    )
    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    )
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    )
    //console.log(listOfRestaurants)
    // console.log(filteredRestaurant)
  }

  const onlineStatus = useOnlineStatus()

  if (onlineStatus === false)
    return <h1>You are offline. Kindly check your internet connection</h1>

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            className="border border-solid border-black "
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
          />

          <button
            className="px-4 py-2 bg-green-100 rounded-lg"
            onClick={() => {
              {
                //console.log(searchText)

                const filteredRestaurant = listOfRestaurants.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                )
                setFilteredRestaurant(filteredRestaurant)
              }
            }}
          >
            Search
          </button>
        </div>
        <div className="flex - items-center">
          <button
            className="px-4 py-2  bg-gray-200 m-4 rounded-lg"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating >= 4.5
              )
              setFilteredRestaurant(filteredList)
              {
                console.log('Clicked')
                console.log(listOfRestaurants)
                console.log(filteredRestaurant)
              }
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurant.map((Restaurants) => (
          <div key={Restaurants.info.id}>
            <Link to={'/restaurant/' + Restaurants.info.id}>
              {/* if the restaurant is greater than 4.3 rating it is StartRated*/}
              <RestaurantCard resData={Restaurants} />
              {/* {Restaurants.info.avgRating > 4.3 ? (
                <RestaurantCardStared resData={Restaurants} />
              ) : (
                <RestaurantCard resData={Restaurants} />
              )} */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Body
