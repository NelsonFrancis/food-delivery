import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {cartItem, foodList, removeFromCart, getTotalCartAmount} = useContext(StoreContext);
  const navigate = useNavigate();

  return (
      <>
        {
        getTotalCartAmount() === 0 
        ? <p className='no-items'>Oops!! No items in cart</p> 
        : <>
        <div className='cart'>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {foodList.map((item, index) => {
              if(cartItem[item._id]>0){
                return(
                  <div key={index}>
                    <div className="cart-items-title cart-items-item">
                      <img src={`${import.meta.env.VITE_URL}/images/${item.image}`} alt='img' />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p>{cartItem[item._id]}</p>
                      <p>${item.price * cartItem[item._id]}</p>
                      <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                    </div>
                    <hr />
                  </div>
                )
              }
            })}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery fee</p>
                  <p>${2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${getTotalCartAmount() + 2}</b>
                </div>
              </div>
              <button onClick={()=>navigate('/order')}>Proceed to checkout</button>
            </div>
            <div className="cart-promo-code">
              <div>
                <p>If you have promo code enter it here</p>
                <div className="cart-promocode-input">
                  <input type='text' placeholder='Enter promo code' />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>}
    </>
  )
}

export default Cart