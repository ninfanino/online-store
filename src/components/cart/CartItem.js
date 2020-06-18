import React from 'react';

const CartItem = ({item, value}) => {
    const {id, title, img, price, total, count} = item;
    const {increment, decrement, removeItem} = value;
    return (
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={img} style={{width:'50px', height:'50px'}} className="img-fluid" alt="Product" />
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">
                    Product:
                </span>
                {title}
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">
                    Price:
                </span>
                {price}
            </div>

            <div className="col-10 mx-auto col-lg-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <div className="btn btn-black mx-1"
                            onClick={() => {
                                decrement(id)
                            }}
                        > - </div>

                        <div className="btn btn-black mx-1"> {count} </div>

                        <div className="btn btn-black mx-1"
                            onClick={() => {
                                increment(id)
                            }}
                        > + </div>
                    </div>
                </div>
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon"
                    onClick={() => removeItem(id)}
                >
                    <i className="fas fa-trash"></i>
                </div>
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <strong>item total: ${total}</strong>
            </div>
        </div>
    )
}

export default CartItem;