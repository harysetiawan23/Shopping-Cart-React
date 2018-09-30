import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import Product from './Components/Product';
import ShoppingCart from './Components/ShoppingCart';

class App extends Component {

  state = {
    products :[],
    cartItems :[]
  };


  handleAddItemToCart = product =>{
    let cartItems = this.state.cartItems;
    
    const alreadyExists = cartItems.some(
      cartItem => cartItem.product.id === product.id
    );
  
    console.log(alreadyExists);
  

    if(alreadyExists){
      cartItems = cartItems.map(cartItem=>{
        if(cartItem.product.id=== product.id){
          cartItem.qty = cartItem.qty +1;
        }
        return cartItem;
      });
    }else{
      cartItems.push({
        product:product,
        qty:1
      });
    }

    
    this.setState({cartItems:cartItems});
  }

  handleRemoveItemFromCart = product =>{
      const cartItems = this.state.cartItems;

      const selectedItemIndex = cartItems.findIndex(cartItem=>{
        return cartItem.product.id === product.id;
      })


      const selectedItem = cartItems[selectedItemIndex];
      if(selectedItem.qty>1){
        selectedItem.qty--;
      }else{
        cartItems.splice(selectedItem,1);
      }

      this.setState({cartItems:cartItems});

  }

  
  

  componentDidMount = () => {
    console.log("Did Mount");
    fetch("https://product-list.glitch.me/")
    .then(response => response.json())
    .then(product => {
      this.setState({products:product});
    })
  };

  render() {

    var ProductList = this.state.products.map(product=>(
                  <Product 
                    onAddItemToCart={this.handleAddItemToCart}
                    key={product.id}
                    id={product.id}
                    image={product.imageSrc} 
                    name={product.name}
                    description={product.desc}
                    price={product.price}
                    tags={["shoes","fashion"]}
                  />
    ));
  
  
    return (
      <div className="container">
      <Navbar/>
     
      <div className="columns">
        <div className="column is-two-thirds">
          <div>
            <h3 className="title">Our Products</h3>
            <div className="columns">

              {/* Product */}
              {ProductList}             

            </div>
          </div>
        </div>

        {/* Shopping Cart */}
        <ShoppingCart 
          cartItems={this.state.cartItems}
          onRemoveItemFromCart={this.handleRemoveItemFromCart}
        />


      </div>
    </div>
    
    );
  }
}

export default App;