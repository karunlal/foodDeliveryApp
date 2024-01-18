import { CDN_URL } from '../utils/constants'
import foodDummy from '../assets/foodDummy.jpg'

const ItemList = ({ items }) => {
  console.log(items)
  const image =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/'
  console.log(image)

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-300 border-b-2 text-left flex items-center justify-between"
        >
          <div className="9/12 ">
            <span className="block py-2">
              <span>{item.card.info.name}</span> - ₹
              {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
            </span>
          </div>
          <p className="text-l ">{item.card.info.description}</p>
          <div className="w-3/12 flex justify-end">
            {item?.card?.info?.imageId ? (
              <img
                src={CDN_URL + item?.card?.info?.imageId}
                alt={item.card.info.name}
                className="object-cover w-32 h-24"
              />
            ) : (
              <img src={foodDummy} className="object-cover w-32 h-24" />
            )}

            <div className="absolute">
              <button className="rounded-s-lg bg-white shadow-lg  m-auto">
                Add +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ItemList
