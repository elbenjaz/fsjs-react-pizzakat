import { useContext, useEffect } from "react";

import { PizzaContext } from "../context/PizzaContext";
import Pizza from "../components/Pizza";

const Home = () => {
    const { title, pizzas } = useContext(PizzaContext);

    useEffect(() => {
        document.title = `${title} - Pizzas`;
    }, []);

    return (
        <div className="Pizzas">
            <div className="feedback d-flex align-items-center justify-content-center mx-auto mt-2 text-center">
                <img className="me-4" src="../cat.png" />
                <div className="dialog dialog-right">
                    <span>
                        Welcome to PizzaKat!<br/>
                        <b>The best pizzas in the world</b>
                    </span>
                </div>
            </div>

            <div className="d-flex flex-wrap justify-content-center">
                {pizzas.sort((a, b) => a.name.localeCompare(b.name)).map((pizza) => (
                    <Pizza key={pizza.id} pizza={pizza} />
                ))}
            </div>
        </div>
    );
};

export default Home;
