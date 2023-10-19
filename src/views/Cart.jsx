import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from "react";
import { Badge, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { PizzaContext } from "../context/PizzaContext";

const Cart = () => {
    const {
        title, 
        cart, 
        addToCart, removeFromCart, emptyCart,
        formatPrice
    } = useContext(PizzaContext);

    const [orderCompleted, setOrderCompleted] = useState(false);

    const submitOrder = () => {
        emptyCart();
        setOrderCompleted(true);
    };
    
    useEffect(() => {
        document.title = `${title} - Cart`;
    }, []);

    if (orderCompleted) {
        return (
            <div className="container">
                <div className="Cart">
                    <div className="feedback d-flex align-items-center justify-content-center mx-auto mt-2 text-center">
                        <div className="dialog dialog-left">
                            <span>
                                Thank you! <br/>
                                <b>This time your order is free ❤</b>
                            </span>
                        </div>
                        <img className="ms-4" src="../dialog2.gif" />
                    </div>
                </div>
            </div>
        );
    }

    if (!cart.items.length) {
        return (
            <div className="container">
                <div className="Cart">
                    <div className="feedback d-flex align-items-center justify-content-center mx-auto mt-2 text-center">
                        <img className="me-4" src="../dialog1.gif" />
                        <div className="dialog dialog-right">
                            <span>
                                Your cart is empty!
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="Cart">
                <h4>Your Cart</h4>

                <div className="my-4">
                    {cart.items.sort((a, b) => a.name.localeCompare(b.name)).map(item => (
                        <div key={item.id} className="cart-item d-flex flex-column flex-md-row justify-content-between p-4">
                            <div>
                                <Link to={`/pizza/${item.id}`}>
                                    <div className="d-flex align-items-center">
                                        <img src={item.img} />
                                        <div className="ms-2">
                                            <span className="handwritten">{item.name}</span>
                                            <br/>
                                            <Badge bg="success" className="ms-2 fs-6">{formatPrice(item.price)}</Badge>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="mt-4 text-center d-flex align-items-center justify-content-center">
                                <Button type="button" variant="danger" onClick={()=>removeFromCart(item)}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </Button>
                                
                                <div className="cart-item-quantity mx-2">{item.quantity}</div>

                                <Button type="button" variant="success" onClick={()=>addToCart(item)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="feedback d-flex align-items-center justify-content-end mx-auto mt-2 text-center">
                    <div className="dialog dialog-left">
                        <span>
                            Total: <b>{formatPrice(cart.total_price)}</b>
                            <br/>
                            <Button variant="success" className="mt-2" onClick={()=> {submitOrder()}}>
                                Confirm your order
                            </Button>
                        </span>
                    </div>
                    <img className="ms-4" src="../dialog2.gif" />
                </div>
            </div>
        </div>
    );
};

export default Cart;
