import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect } from "react";
import { Badge, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Error404 from "./Error404";

import { PizzaContext } from "../context/PizzaContext";

const Pizza = () => {
    const { title, pizzas, addToCart, formatPrice } = useContext(PizzaContext);
    const { id_pizza } = useParams();

    const pizza = pizzas[pizzas.findIndex(pizza => pizza.id === id_pizza)];

    if (!pizza) { 
        return <Error404 />;
    }

    useEffect(() => {
        document.title = `${title} - ${pizza.name}`;
    }, []);

    return (
        <div className="container">
            <div className="Pizza d-flex flex-column flex-md-row justify-content-between text-center">
                <div className="d-flex align-items-center justify-content-center mb-4 mb-md-0">
                    <img src={pizza.img} />
                </div>

                <div>
                    <h4>{pizza.name}</h4>
                    
                    <div><Badge bg="success" className="fs-6">{formatPrice(pizza.price)}</Badge></div>

                    <div className="my-4">
                        {pizza.ingredients.sort().map((ingredient) => (
                            <span key={ingredient} className="pizza-card-ingredient badge text-bg-secondary mx-1" 
                                data-type={ingredient}>
                                {ingredient}
                            </span>
                        ))}
                    </div>

                    <div className="mx-4 my-4 text-start">
                        <small>{pizza.desc}</small>
                    </div>
                    
                    <Button variant="success" className="mt-1" onClick={() => addToCart(pizza)}>
                        <FontAwesomeIcon icon={faPlus} />
                        <FontAwesomeIcon icon={faCartShopping} />
                        Add to cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Pizza;
