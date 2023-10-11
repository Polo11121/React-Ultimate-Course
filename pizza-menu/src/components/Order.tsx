type OrderProps = {
  openHour: number;
  closeHour: number;
};

export const Order = ({ closeHour, openHour }: OrderProps) => (
  <div className="order">
    <p>
      We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
      online.
    </p>
    <button className="btn"> Order</button>
  </div>
);
