import { connect } from "react-redux";
import { RootState } from "store";

type BalanceDisplayProps = {
  balance: number;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);

const BalanceDisplayComponent = ({ balance }: BalanceDisplayProps) => (
  <div className="balance">{formatCurrency(balance)}</div>
);

const mapStateToProps = (state: RootState) => ({
  balance: state.account.balance,
});

export const BalanceDisplay = connect(mapStateToProps)(BalanceDisplayComponent);
