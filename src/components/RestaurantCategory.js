import ItemList from './ItemList'
import { useState } from 'react'

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  //const [itemsCheck, setItemsCheck] = useState(showItems)
  const handleClick = () => {
    setShowIndex()
  }
  return (
    <div>
      {/*Header*/}
      <div className="w-6/12 mx-auto my-4 bg-gray-100  shadow-lg p-4  ">
        <div className="flex justify-between " onClick={handleClick}>
          <span className="font-bold text-lg cursor-pointer">
            {data.title} ({data.itemCards.length})
          </span>
          <span className="cursor-pointer">⇓</span>
        </div>
        {/* {Accordion Body} */}

        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  )
}

export default RestaurantCategory
