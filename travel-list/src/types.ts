export type Item = {
  id: number;
  description: string;
  packed: boolean;
  quantity: number;
};

export type SortBy = "quantity" | "description" | "packed";
