import {
  ListItem,
  ListItemAvatar,
  Box,
  Typography,
  Stack,
} from "@mui/material";

import PublicUserData from "../../../../types/entity/data/PublicUserData";
import TransactionData from "../../../../types/entity/data/TransactionData";
import { useAppSelector } from "../../hooks/redux";
import { selectUser } from "../../store/user/selectors";
import { formatCurrency } from "../../utils/currency";
import { formatDate } from "../../utils/date";
import { getUsersFullName } from "../../utils/string";
import UserAvatar from "../common/UserAvatar";

function formatMainMessage(
  user: PublicUserData,
  transaction: TransactionData
): string {
  const userPaying = transaction.payer.id === user.id;
  const paid = transaction.paid;
  const wasRequest = transaction.payee.id === transaction.creator.id;

  if (paid) {
    if (wasRequest) {
      // Someone requested a payment and it was completed
      if (userPaying) {
        return `${getUsersFullName(
          transaction.payee
        )} charged you ${formatCurrency(transaction.amount)}`;
      } else {
        return `You charged ${getUsersFullName(
          transaction.payee
        )} ${formatCurrency(transaction.amount)}`;
      }
    } else {
      // Someone directly sent the other person money
      if (userPaying) {
        return `You paid ${getUsersFullName(
          transaction.payee
        )} ${formatCurrency(transaction.amount)}`;
      } else {
        return `${getUsersFullName(
          transaction.payee
        )} paid you ${formatCurrency(transaction.amount)}`;
      }
    }
  } else {
    if (wasRequest) {
      // Someone requested a payment and it is not paid
      if (userPaying) {
        return `${getUsersFullName(
          transaction.payee
        )} has requested ${formatCurrency(transaction.amount)}`;
      } else {
        return `You requested ${formatCurrency(
          transaction.amount
        )} from ${getUsersFullName(transaction.payee)}`;
      }
    }
  }
  // There shouldn't be any other alternatives
  return "";
}

type TransactionListItemProps = {
  /**
   * Actions to display under the text in the list item
   */
  actions?: JSX.Element;

  transaction: TransactionData;
};

export default function TransactionListItem({
  actions,
  transaction,
}: TransactionListItemProps): JSX.Element {
  // The user must be logged in to access this page, so it should be safe to assert?
  const user = useAppSelector(selectUser())!;
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <UserAvatar
          firstName={transaction.creator.firstName}
          lastName={transaction.creator.lastName}
        />
      </ListItemAvatar>
      <Box sx={{ flex: "1 1 auto", minWidth: 0, my: 0.5 }}>
        <Typography component="span">
          {formatMainMessage(user, transaction)}
        </Typography>
        <Typography
          gutterBottom
          variant="caption"
          sx={{ color: "text.secondary", display: "block" }}
        >
          {formatDate(transaction.createdAt)}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          sx={{ color: "text.secondary" }}
        >
          {transaction.memo}
        </Typography>
        {actions && (
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            {actions}
          </Stack>
        )}
      </Box>
    </ListItem>
  );
}
