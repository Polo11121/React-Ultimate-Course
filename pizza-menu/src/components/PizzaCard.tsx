type PizzaCardProps = {
  photoName: string;
  name: string;
  ingredients: string;
  price: number;
  soldOut?: boolean;
};

export const PizzaCard = ({
  photoName,
  name,
  ingredients,
  price,
  soldOut,
}: PizzaCardProps) => (
  <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
    <img src={photoName} alt={name} />
    <div>
      <h1>{name}</h1>
      <p>{ingredients}</p>
      <span>{soldOut ? "SOLD OUT" : price}</span>
    </div>
  </li>
);
