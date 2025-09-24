import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from '../context/StoreContext'

const FoodItem = ({id, name, price, desc, img}) => {
    const [itemCount, setItemCount] = useState(0)
    const {cartItem, addToCart, removeFromCart} = useContext(StoreContext)
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img src={img} alt="img" className="food-item-image" />
            {
                !cartItem[id]
                ? <img src={assets.add_icon_white} className='add' onClick={() => addToCart(id)} alt='img' />
                : <div className="food-item-counter">
                    <img src={assets.remove_icon_red} alt='img' onClick={() => removeFromCart(id)} />
                    <p>{cartItem[id]}</p>
                    <img src={assets.add_icon_green} alt='img' onClick={() => addToCart(id)} />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt='img' />
            </div>
            <p className="food-item-desc">{desc}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem