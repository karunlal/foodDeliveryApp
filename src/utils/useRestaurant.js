import { useEffect, useState } from 'react'
import { MENU_API } from '../utils/constants'

const useRestaurantMenu = (resid) => {
  const [resInfo, setResInfo] = useState(null)
  //console.log(MENU_API)
  // console.log(resid)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await fetch(MENU_API + resid)

    const json = await data.json()
    setResInfo(json.data)

    //console.log(resInfo)
  }

  return resInfo
}

export default useRestaurantMenu
