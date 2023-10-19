import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Slide, toast } from 'react-toastify';

const PizzaProvider = ({ children }) => {
    const title          = "PizzaKat";
    const url_pizzas     = "/pizzas.json";
    const cart_max_items = 10;
    const defaultCart = {
        items : [],
        total_items : 0,
        total_price : 0
    };

    const [pizzas, setPizzas] = useState([]);
    const [cart, setCart] = useState(defaultCart);

    const 
        addToCart = (pizza) => {
            if (cart.total_items >= cart_max_items) {
                feedback(`Sorry, too many items!`, "error");
                return false;
            }

            let newCart = {...cart};

            const index = newCart.items.findIndex(item => item.id === pizza.id);

            if (index === -1) {
                newCart.items = [...newCart.items, {...pizza, quantity: 1 }];
            } else {
                newCart.items[index].quantity++;
            }

            //updateCartTotal(newCart);
            newCart.total_price += pizza.price;
            newCart.total_items ++;

            setCart(newCart);

            feedback(`Added to cart: ${pizza.name}`, "success");
        },

        removeFromCart = (pizza) => {
            let newCart = {...cart};

            const index = newCart.items.findIndex(item => item.id === pizza.id);

            if (index === -1) {
                return false;
            }

            if (newCart.items[index].quantity === 1) {
                newCart.items.splice(index ,1);
            } else {
                newCart.items[index].quantity--;
            }

            //updateCartTotal(newCart);
            newCart.total_price -= pizza.price;
            newCart.total_items --;

            setCart(newCart);

            feedback(`Removed from cart: ${pizza.name}`, "error");
        },

        updateCartTotal = (newCart) => {
            newCart.total_price = newCart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            newCart.total_items = newCart.items.reduce((acc, item) => acc + item.quantity, 0);
        },
    
        emptyCart = () => {
            setCart(defaultCart);
        },

        formatPrice = (price) => {
            return new Intl.NumberFormat('es-CL', { 
                style    : 'currency',
                currency : 'CLP' 
            }).format(price);
        },

        feedback = (text, type) => {
            toast.dismiss();

            if (typeof toast[type] === 'function') {
                toast[type](text, {
                    hideProgressBar : true,
                    transition      : Slide,
                    theme           : "dark"
                });
            }
        };

    const [loading, setLoading] = useState(true);

    const getPizzasAPI = () => {
        axios.get(url_pizzas)
            .then(response => {
                setPizzas(response.data);
            })
            .catch(error => {
                console.error("Error trying to get data:", error);
            }).finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getPizzasAPI();

        document.title = title;
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="PizzaContext">
                    <div className="pizza-loading text-center">
                        <p>Loading Pizzas data ...</p>
                        <img src="../cat.png" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <PizzaContext.Provider
            value={{
                title,
                pizzas, setPizzas,
                cart, setCart,
                addToCart, removeFromCart, emptyCart,
                formatPrice
            }}>
            {children}
        </PizzaContext.Provider>
    );
};

export const PizzaContext = createContext();
export default PizzaProvider;
