import {
  ListItem,
  ListItemAvatar,
  Box,
  Typography,
  Stack,
} from "@mui/material";

import TransactionData from "../../../../types/entity/data/TransactionData";
import { formatCurrency } from "../../utils/currency";
import { formatDate } from "../../utils/date";
import { getUsersFullName } from "../../utils/string";
import UserAvatar from "../common/UserAvatar";

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
  const creatorFullName = getUsersFullName(transaction.creator);
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
          {creatorFullName} sent you a payment request for{" "}
          {formatCurrency(transaction.amount)}.
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
