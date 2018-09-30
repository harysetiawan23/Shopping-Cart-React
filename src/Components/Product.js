import React from 'react';


function Product(props){
    var tagsList = props.tags.map((tag)=>(<span class="tag is-rounded">{tag}</span>));
    return(
        <div className="column">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3"><img alt={props.name} src={props.image} /></figure>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">{props.name}</p>
                        {tagsList}
                        <div className="content">{props.description}<br /></div>
                        <h5>Rp {props.price}</h5><button className="button is-primary" 
                        onClick={event=>{
                          event.preventDefault();
                          console.log(props);
                          props.onAddItemToCart(props);
                          }}>Add To Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    )
}

export default Product;