import { pizzaData } from "data";
import { PizzaCard } from "components";

export const Menu = () => (
  <main className="menu">
    <h2>Our Menu</h2>
    {pizzaData.length ? (
      <>
        <p>
          Authentic Italian cuisine. 6 creative dishes to choose from. All from
          our stone oven, all organic, all delicious.
        </p>
        <ul className="pizzas">
          {pizzaData.map((pizza) => (
            <PizzaCard key={pizza.name} {...pizza} />
          ))}
        </ul>
      </>
    ) : (
      <p>We're still working on our menu.Please come back later :)</p>
    )}
  </main>
);
