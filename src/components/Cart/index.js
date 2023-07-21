import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaCheckCircle} from 'react-icons/fa'
import {BiRupee} from 'react-icons/bi'
// import {HiOutlineMinusSm} from 'react-icons/hi'
// import {BsPlus} from 'react-icons/bs'
import Header from '../Header'
import CartItem from './CartItem'
import Footer from '../Footer'

import './index.css'

const cartEmptyUrl =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625831743/cart-no-order_qivsro.png'

const cartStatusConstants = {
  initial: 'INITIAL',
  cartItemsFound: 'SUCCESS',
  noCartItems: 'FAILURE',
  paymentSuccess: 'PAYMENT',
}

class Cart extends Component {
  state = {cartData: [], cartStatus: cartStatusConstants.initial}

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getTheCartData()
  }

  // increment the cart quantity

  incrementCartItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        console.log(eachItem.quantity)
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getTheCartData()
  }

  // decrement the cart quantity

  decrementCartItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.quantity > 0) {
          console.log(eachItem.quantity)
          const updatedQuantity = eachItem.quantity - 1
          console.log('updated:>>', updatedQuantity)
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    console.log('updatedCartData :>> ', updatedCartData)
    // localStorage.setItem('cart_data', JSON.stringify(updatedCartData))
    // this.getTheCartData()
    this.removeCartItem(updatedCartData)
  }

  // remove the item

  removeCartItem = updatedData => {
    // const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = updatedData.filter(
      eachCartItem => eachCartItem.quantity > 0,
    )
    console.log(updatedCartData)
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getTheCartData()
  }

  // calculate the total amount

  calculateTheTotalAmount = () => {
    const {cartData} = this.state
    // console.log(cartData)
    const amountList = cartData.map(each => each.quantity * each.cost)
    // console.log(amountList)
    const totalAmount = amountList.reduce((a, b) => a + b)
    return totalAmount
  }

  // get the cart data

  getTheCartData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    if (cartData.length === 0) {
      // console.log(cartData.length)
      this.setState({
        cartStatus: cartStatusConstants.noCartItems,
      })
    } else {
      const cartItems = cartData.map(each => ({
        cost: each.cost,
        quantity: each.quantity,
        id: each.id,
        imageUrl: each.imageUrl,
        name: each.name,
      }))
      this.setState({
        cartStatus: cartStatusConstants.cartItemsFound,
        cartData: cartItems,
      })
    }
  }

  // go to home page on click

  goToHomePage = () => {
    const {history} = this.props
    history.replace('/')
  }

  // place the Order

  placeOrder = () => {
    this.setState({cartStatus: cartStatusConstants.paymentSuccess})
    localStorage.clear('cartData')
  }

  // cart empty view

  cartEmptyView = () => (
    <div className="cart-empty-view-container">
      <img src={cartEmptyUrl} alt="empty cart" className="cart-empty-image" />
      <h1 className="cart-empty-heading">No Order Yet!</h1>
      <p className="cart-empty-para">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="order-now">
          Order Now
        </button>
      </Link>
    </div>
  )

  // payment successful view

  paymentSuccessfulView = () => (
    <div className="cart-success-container">
      <FaCheckCircle className="cart-circle" />
      <h1 className="cart-success-name">Payment Successful</h1>
      <p className="cart-success-para">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="go-to-home">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  // cart item view

  cartItemsView = () => {
    const {cartData} = this.state
    // const cartData = JSON.parse(localStorage.getItem('cartData'))
    console.log(cartData)
    const totalAmount = this.calculateTheTotalAmount()
    return (
      <>
        <div className="cart-container">
          <div className="cart-item-container">
            <div className="desktop-heading-container">
              <h1 className="heading">Item</h1>
              <h1 className="heading">Quantity</h1>
              <h1 className="heading">Price</h1>
            </div>
            <ul className="mobile-cart-item-list">
              {cartData.map(eachItem => (
                <CartItem
                  key={eachItem.id}
                  eachCartItem={eachItem}
                  incrementQuantity={this.incrementCartItemQuantity}
                  decrementQuantity={this.decrementCartItemQuantity}
                />
              ))}
            </ul>
            <hr className="hr" />
            <div className="totl-container">
              <h1 className="order-heading">Order Total:</h1>
              <div className="total-amount-container">
                <BiRupee className="total-rupee" />
                <p className="total-amount" data-testid="total-price">
                  {totalAmount}.00
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={this.placeOrder}
              className="place-order-button"
            >
              Place Order
            </button>
          </div>
          <Footer />
        </div>
      </>
    )
  }

  // render cart page based on switch case

  onRenderDisplayCartPage = () => {
    const {cartStatus} = this.state

    switch (cartStatus) {
      case cartStatusConstants.cartItemsFound:
        return this.cartItemsView()
      case cartStatusConstants.noCartItems:
        return this.cartEmptyView()
      case cartStatusConstants.paymentSuccess:
        return this.paymentSuccessfulView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="bg-container">{this.onRenderDisplayCartPage()}</div>
      </div>
    )
  }
}

export default Cart
