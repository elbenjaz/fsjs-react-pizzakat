import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPizzaSlice } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react";
import Badge from 'react-bootstrap/Badge';
import { NavLink } from "react-router-dom";

import { PizzaContext } from "../context/PizzaContext";

const Menu = () => {
    const { cart, formatPrice } = useContext(PizzaContext);
    const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);

    return (
        <nav className="Menu d-flex flex-wrap justify-content-center justify-content-md-start align-items-center pb-4 pb-md-0">
            <NavLink to="/">
                <img src="/pizzakat.png" />
            </NavLink>

            <NavLink className={setActiveClass} to="/">
                <div><FontAwesomeIcon icon={faPizzaSlice} /></div>
                <span>Pizzas</span>
            </NavLink>

            <NavLink className={setActiveClass} to="/cart">
                <div>
                    <FontAwesomeIcon icon={faCartShopping} />
                    
                    { cart.total_items ? 
                    <Badge bg="success" className="ms-2 fs-6">
                        {cart.total_items}
                    </Badge> : null }

                    { cart.total_price ? 
                    <Badge bg="success" className="ms-2 fs-6">
                        <small>{formatPrice(cart.total_price)}</small>
                    </Badge> : null }
                </div>

                <span>Cart</span>
            </NavLink>
        </nav>
    );
};

export default Menu;
