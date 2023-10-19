import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPizzaSlice, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react";
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

import { PizzaContext } from "../context/PizzaContext";

const Pizza = ({pizza}) => {
    const { addToCart, formatPrice } = useContext(PizzaContext);

    /*
    const navigate = useNavigate();

    const goToPizza = (pizza) => {
        navigate(`/pizza/${pizza.id}`);
    };
    */

    return (
        <div className="pizza-card d-flex flex-column justify-content-between text-center" data-id_pizza={pizza.id}>
            <div className="text-center">
                <img className="mb-5" src={pizza.img} />
            </div>

            <b>{pizza.name.toUpperCase()}</b>
            
            <div><Badge bg="success" className="fs-6">{formatPrice(pizza.price)}</Badge></div>

            <div className="my-3">
                {pizza.ingredients.sort().map((ingredient) => (
                    <span key={ingredient} className="pizza-card-ingredient badge text-bg-secondary mx-1" data-type={ingredient}>{ingredient}</span>
                ))}
            </div>
            
            <Link className="btn btn-warning" to={`/pizza/${pizza.id}`}>
                <FontAwesomeIcon icon={faPizzaSlice} /> Details
            </Link>

            {/*
            <button className="btn btn-warning" onClick={() => goToPizza(pizza)}>
                <FontAwesomeIcon icon={faPizzaSlice} /> Details
            </button>
            */}

            <button className="btn btn-success mt-1" onClick={() => addToCart(pizza)}>
                <FontAwesomeIcon icon={faPlus} />
                <FontAwesomeIcon icon={faCartShopping} /> Add to cart
            </button>
        </div>
    );
}

export default Pizza;
