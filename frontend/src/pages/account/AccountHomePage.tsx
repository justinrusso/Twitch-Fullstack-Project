import { List, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import LoadingCircle from "../../components/common/LoadingCircle";
import TransactionListItem from "../../components/transactions/TransactionListItem";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { TransactionsFilter } from "../../store/transactions/helpers";
import { selectAllTransactions } from "../../store/transactions/selectors";
import { getTransactions } from "../../store/transactions/thunks";

export default function AccountHomePage(): JSX.Element {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const transactions = useAppSelector(selectAllTransactions());

  useEffect(() => {
    dispatch(getTransactions(TransactionsFilter.Completed))
      .unwrap()
      .then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <LoadingCircle />;
  }

  return transactions.length > 0 ? (
    <List>
      {transactions.map((transaction) => (
        <TransactionListItem key={transaction.id} transaction={transaction} />
      ))}
    </List>
  ) : (
    <Typography textAlign="center" sx={{ color: "text.secondary", pt: 2 }}>
      No transaction history. Start by sending some money!
    </Typography>
  );
}
