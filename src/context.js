import React, {Component} from 'react';
import {storeProducts, detailProduct} from './data.js';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen:false,
        modalProduct:detailProduct,
        cartSubtotal: 0,
        cartTax:0,
        cartTotal:0
    }

    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let products = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            products = [...products, singleItem]
        })

        this.setState(() => {
            return {products}
        })
    }

    getItem = (id) => {
        const product = this.state.products.find(item => 
            item.id === id
        );

        return product;
    }

    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct:product}
        })
    }

    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(() => {
            return { products: tempProducts, cart:[...this.state.cart, product]}
        }, () => {
            this.addTotals();
        })
    }

    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {modalProduct: product, modalOpen:true}
        })
    }

    closeModal = () => {
        this.setState(() => {
            return {modalOpen:false}
        })
    }

    increment = (id) => {
        let tmpCart = [...this.state.cart];
        const selectedProduct = tmpCart.find(item=> item.id === id);

        const index = tmpCart.indexOf(selectedProduct);
        const product = tmpCart[index];

        product.count++;
        product.total = product.count * product.price;

        this.setState(() => {
            return {
                cart:[...tmpCart]
            }
        }, () => {
            this.addTotals();
        })
    }

    decrement = (id) => {
        let tmpCart = [...this.state.cart];
        const selectedProduct = tmpCart.find(item=> item.id === id);

        const index = tmpCart.indexOf(selectedProduct);
        const product = tmpCart[index];

        product.count = product.count - 1;

        if(product.count === 0){
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;

            this.setState(() => {
                return {
                    cart:[...tmpCart]
                }
            }, () => {
                this.addTotals();
            })
        }
        

        
    }

    removeItem = (id) => {
        let tmpProducts = [...this.state.products];
        let tmpCart = [...this.state.cart];

        tmpCart = tmpCart.filter(item => item.id !== id);
        const index = tmpProducts.indexOf(this.getItem(id));

        let removedProduct = tmpProducts[index];
        
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {
                cart:[...tmpCart],
                products: [...tmpProducts]
            }
        }, () => {
            this.addTotals()
        })

    }

    clearCart = () => {
        this.setState(() => {
            return {cart:[]}
        }, () => {
            this.setProducts();
            this.addTotals();
        })
    }

    addTotals = () => {
        let subtotal = 0;
        this.state.cart.map(item => (subtotal += item.total));
        const tax = subtotal * 0.16;
        const total = subtotal + tax;

        this.setState(() => {
            return {
                cartSubtotal:subtotal,
                cartTax:tax,
                cartTotal:total
            }
        })
    }
 
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};