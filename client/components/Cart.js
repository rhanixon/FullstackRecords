import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Checkout} from './Checkout'
import {getCartThunk, removeFromCartThunk} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  handleClick(productId) {
    this.props.removeFromCart(productId)
    // toast.success('Item Removed')
  }

  render() {
    let cart = this.props.cart

    if (cart && cart.products) {
      let total = 0
      return (
        <div id="cart">
          <div id="your-cart">Your Cart</div>

          <div id="q-p">
            <div className="q">Quantity</div>
            <div className="p">Price</div>
          </div>

          <div>
            <div id="cart-items">
              {cart.products.map(product => {
                total += product.price
                return (
                  <div key={product.id} className="cart-item">
                    <div className="cart-comp">
                      <img className="cart-image" src={product.imgUrl} />
                      <div className="cart-title">{product.albumTitle}</div>
                    </div>

                    <div className="cart-comp">
                      <div className="cart-quantity"></div>
                      <div className="cart-price">${product.price / 100} </div>
                      <button
                        className="remove-button"
                        type="button"
                        onClick={() => this.handleClick(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div id="total">
            <div id="total-amount">${total / 100}</div>
          </div>

          <div id="cart-buttons">
            <div>
              <Checkout
                name="Shopping cart checkout"
                description="Shopping cart checkout"
                amount={total / 100}
                cart={this.props.cart}
                user={this.props.user}
                fetchCart={this.props.fetchCart}
              />
            </div>
          </div>
        </div>
      )
    } else {
      return <div>there is nothing in your cart</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(getCartThunk()),
    removeFromCart: productId => dispatch(removeFromCartThunk(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
