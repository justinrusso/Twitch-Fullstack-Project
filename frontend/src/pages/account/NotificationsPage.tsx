import { Box, Button, Divider, List, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

import TransactionData from "../../../../types/entity/data/TransactionData";
import { TransactionDeleteResponseErrors } from "../../../../types/responses/TransactionDeleteResponse";
import { TransactionPatchResponseErrors } from "../../../../types/responses/TransactionPatchResponse";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import TransactionListItem from "../../components/transactions/TransactionListItem";
import { useAppBar } from "../../contexts/AppBarProvider";
import { useTemporaryNotifications } from "../../contexts/TemporaryNotificationsProvider";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { TransactionsFilter } from "../../store/transactions/helpers";
import { selectAllTransactions } from "../../store/transactions/selectors";
import {
  deleteTransactionRequest,
  getTransactions,
  payTransactionRequest,
} from "../../store/transactions/thunks";
import { formatCurrency } from "../../utils/currency";
import { capitalize, getUsersFullName } from "../../utils/string";

type ActionType = "decline" | "pay";

export default function NotificationsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const temporaryNotifications = useTemporaryNotifications();

  const { setTitle } = useAppBar();

  useEffect(() => {
    setTitle("Notifications");
  }, [setTitle]);

  const transactions = useAppSelector(selectAllTransactions());

  useEffect(() => {
    dispatch(getTransactions(TransactionsFilter.OwedPaymentRequests));
  }, [dispatch]);

  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionData | null>(null);
  const [actionType, setActionType] = useState<ActionType>("decline");

  const showConfirmation = (
    actionType: ActionType,
    transaction: TransactionData
  ) => {
    setSelectedTransaction(transaction);
    setActionType(actionType);
  };

  const handleConfirm = async (
    transaction: TransactionData | null,
    action: ActionType
  ) => {
    if (!transaction) {
      return;
    }

    const thunkFunction =
      action === "decline" ? deleteTransactionRequest : payTransactionRequest;
    try {
      await dispatch(thunkFunction(transaction.id)).unwrap();
      temporaryNotifications.enqueueNotification({
        message: `Payment request ${action === "decline" ? "denied" : "paid"}!`,
        severity: "success",
      });
    } catch (error) {
      let notificationMessage = "An error has occured, please try again.";
      if (error instanceof Error) {
        temporaryNotifications.enqueueNotification({
          message: notificationMessage,
          severity: "error",
        });
        throw error;
      }
      const errors =
        error instanceof Object
          ? (error as
              | TransactionPatchResponseErrors
              | TransactionDeleteResponseErrors)
          : undefined;

      if ((errors as TransactionPatchResponseErrors | undefined)?.amount) {
        // Safely assert since the if statement ensures amount exists on object
        notificationMessage = (errors as TransactionPatchResponseErrors)
          .amount!;
      }
      temporaryNotifications.enqueueNotification({
        message: notificationMessage,
        severity: "error",
      });
    }
    setSelectedTransaction(null);
  };

  return (
    <>
      <Typography variant="h4" component="h1" textAlign="center">
        Notifications
      </Typography>
      {transactions.length > 0 ? (
        <>
          <List sx={{ width: "100%" }}>
            {transactions.map((transaction, i) => (
              <Fragment key={transaction.id}>
                <TransactionListItem
                  transaction={transaction}
                  actions={
                    <>
                      <Button
                        onClick={() => showConfirmation("decline", transaction)}
                      >
                        Decline
                      </Button>
                      <Button
                        onClick={() => showConfirmation("pay", transaction)}
                      >
                        Pay
                      </Button>
                    </>
                  }
                />
                {i !== transactions.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </Fragment>
            ))}
          </List>
          <ConfirmationDialog
            title={`${capitalize(actionType)} Transaction Request`}
            onCancel={() => setSelectedTransaction(null)}
            onConfirm={() => handleConfirm(selectedTransaction, actionType)}
            open={selectedTransaction !== null}
          >
            {selectedTransaction && (
              <Typography>
                Are you sure you'd like to {actionType} the payment request from{" "}
                {getUsersFullName(selectedTransaction.creator)} for{" "}
                {formatCurrency(selectedTransaction.amount)}?
              </Typography>
            )}
          </ConfirmationDialog>
        </>
      ) : (
        <>
          <Box pt={2}>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ color: "text.secondary" }}
            >
              You're all caught up!
            </Typography>
          </Box>
        </>
      )}
    </>
  );
}
