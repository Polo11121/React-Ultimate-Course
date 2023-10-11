import { Order } from "components";

export const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour} />
      ) : (
        <p>
          We`re happy to welcome your between {openHour}:00 and {closeHour}:00
          o`clock.
        </p>
      )}
    </footer>
  );
};
