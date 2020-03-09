import React from 'react'

export class FeaturedProducts extends React.Component {
  componentDidMount() {}

  render() {
    let ids = []
    for (let i = 0; i < 3; i++) {
      ids.push(Math.floor(Math.random() * 500))
    }
    const products = this.props.allProducts
    console.log('props', products, ids)

    return (
      <div>
        <h1>
          This Weeks Featured Albums:
          {products.map(product => (
            <div key={product.id}>
              {product.id === ids[0] ||
              product.id === ids[1] ||
              product.id === ids[2] ? (
                <img
                  src={product.imgUrl}
                  className="product-info all-images"
                  id="product-img"
                />
              ) : null}
            </div>
          ))}
        </h1>
      </div>
    )
  }
}

export default FeaturedProducts
