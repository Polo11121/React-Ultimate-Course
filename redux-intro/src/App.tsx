import { CreateCustomer, Customer } from "features/customer";
import { AccountOperations, BalanceDisplay } from "features/account";
import { useAppSelector } from "hooks";

export const App = () => {
  const fullName = useAppSelector((state) => state.customer.fullName);

  return (
    <div className="App">
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName ? (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      ) : (
        <CreateCustomer />
      )}
    </div>
  );
};
