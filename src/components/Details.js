import React, {Component} from 'react';
import {ProductConsumer} from '../context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const {id, img, info, price, title, inCart } = value.detailProduct;

                    return(
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-pink my-5">
                                    <h1>{title}</h1>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img src={img} className="img-fluid" alt="Product" />
                                </div>

                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2 className="text-title text-uppercase text-muted mt-3 mb-2">
                                        Model: <span>{title}</span>
                                    </h2>
                                    <h4 className="text-pink">
                                        <strong>price: <span>$</span>{price}</strong>
                                    </h4>

                                    <h5 className="text-capitalize font-weight-bold mt-3 mb-0">
                                        Info
                                    </h5>
                                    <p className="text-muted lead">
                                        {info}
                                    </p>

                                    <div>
                                        <Link to="/">
                                            <ButtonContainer>
                                                Back to Products
                                            </ButtonContainer>
                                        </Link>

                                        <ButtonContainer
                                        disabled={inCart ? true : false}
                                        onClick={() => {
                                            value.addToCart(id)
                                        }}>
                                            {inCart ? "inCart" : "Add to Cart"}
                                        </ButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
        )
    }
}