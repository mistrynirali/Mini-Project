import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'

import './index.css'

class CartItem extends Component {
  increment = () => {
    const {eachCartItem, incrementQuantity} = this.props
    incrementQuantity(eachCartItem.id)
  }

  decrement = () => {
    const {eachCartItem, decrementQuantity} = this.props
    decrementQuantity(eachCartItem.id)
  }

  render() {
    const {eachCartItem} = this.props
    // console.log(eachCartItem)
    const price = eachCartItem.cost * eachCartItem.quantity
    console.log(price)
    return (
      <li className="cart-item-list-container">
        <div data-testid="cartItem" className="cart-list-item">
          <img
            src={eachCartItem.imageUrl}
            alt="cart-item"
            className="item-image"
          />
          <h1 className="cart-item-name">{eachCartItem.name}</h1>
        </div>
        <div className="each-item-counter-container">
          <button
            data-testid="decrement-quantity"
            type="button"
            className="minus-icon-container"
            onClick={this.decrement}
          >
            <HiOutlineMinusSm className="minus-icon" />
          </button>
          <p data-testid="item-quantity" className="count-value">
            {eachCartItem.quantity}
          </p>
          <button
            data-testid="increment-quantity"
            type="button"
            className="plus-icon-container"
            onClick={this.increment}
          >
            <BsPlus className="plus-icon" />
          </button>
        </div>
        <div className="item-rate-container">
          <BiRupee className="item-rupee" />
          <p className="item-cost">{eachCartItem.cost}</p>
        </div>
      </li>
    )
  }
}

export default CartItem
