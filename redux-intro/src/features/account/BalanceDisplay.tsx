import { connect } from "react-redux";
import { RootState } from "store";

type BalanceDisplayProps = {
  balance: number;
  isLoading: boolean;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);

const BalanceDisplayComponent = ({
  balance,
  isLoading,
}: BalanceDisplayProps) => (
  <div className="balance">
    {isLoading ? "Loading..." : formatCurrency(balance)}
  </div>
);

const mapStateToProps = (state: RootState) => ({
  balance: state.account.balance,
  isLoading: state.account.isLoading,
});

export const BalanceDisplay = connect(mapStateToProps)(BalanceDisplayComponent);
