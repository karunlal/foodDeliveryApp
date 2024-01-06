import { useState, useEffect } from 'react'
import RestaurantCard from './RestaurantCard'
import resList from '../utils/mockData'
import Shimmer from './Shimmer'
import { Link } from 'react-router-dom'
const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([])
  const [filteredRestaurant, setFilteredRestaurant] = useState([])

  const [searchText, setSearchText] = useState('')
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
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    )
    setListOfRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    )
    setFilteredRestaurant(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    )
    console.log(listOfRestaurants)
  }

  return listOfRestaurants.length === 0 ? (
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
              setSearchText(e.target.value)
            }}
          />

          <button
            onClick={() => {
              {
                console.log(searchText)

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
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.4
            )
            setListOfRestaurants(filteredList)
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((Restaurants) => (
          <Link to={'/restaurant/' + Restaurants.info.id}>
            <RestaurantCard key={Restaurants.info.id} resData={Restaurants} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Body
