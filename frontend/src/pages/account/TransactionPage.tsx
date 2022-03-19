import { Typography, Box, Button, TextField, Stack } from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import PublicUserData from "../../../../types/entity/data/PublicUserData";
import TransactionRequest from "../../../../types/requests/TransactionRequest";
import { TransactionResponseErrors } from "../../../../types/responses/TransactionResponse";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import CurrencyTextField from "../../components/common/CurrencyTextField";
import UserSearchField from "../../components/common/UserSearchField";
import { useTemporaryNotifications } from "../../contexts/TemporaryNotificationsProvider";
import useFormFields from "../../hooks/form-fields";
import { useAppDispatch } from "../../hooks/redux";
import { createTransaction } from "../../store/transactions/thunks";
import { capitalize } from "../../utils/string";

function formatConfirmationText(
  type: TransactionRequest["type"],
  amount: string,
  to: PublicUserData
): string {
  const formattedAmount = parseFloat(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const fullName = `${to.firstName} ${to.lastName}`;

  const action = type === "request" ? "request" : "send";
  const direction = type === "request" ? "from" : "to";

  return `Are you sure you want to ${action} ${formattedAmount} ${direction} ${fullName}?`;
}

export default function NewTransactionPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const temporaryNotifications = useTemporaryNotifications();
  const navigate = useNavigate();

  const { fields, setField } = useFormFields({
    amount: "", // NOTE: This should be multiplied by 100 when sending
    to: null as PublicUserData | null,
    memo: "",
  });
  const [transactionType, setTransactionType] =
    useState<TransactionRequest["type"]>("payment");

  const [errors, setErrors] = useState<TransactionResponseErrors>({});
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleConfirm = async () => {
    if (!fields.to) {
      setErrors({
        to: "Please select a user",
      });
      return;
    }

    try {
      await dispatch(
        createTransaction({
          amount: Math.round(parseFloat(fields.amount) * 100),
          to: fields.to.id,
          memo: fields.memo,
          type: transactionType,
        })
      ).unwrap();
      temporaryNotifications.enqueueNotification({
        message: `${capitalize(transactionType)} sent!`,
        severity: "success",
      });
      navigate("..");
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      setConfirmationOpen(false);
      setErrors(error as TransactionResponseErrors);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "50%",
          },
        }}
      >
        <Typography variant="h4" component="h1" textAlign="center">
          Pay
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 4,
            alignItems: "center",
          }}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            setConfirmationOpen(true);
          }}
        >
          <CurrencyTextField
            id="transaction-amount"
            label="Amount"
            required
            autoFocus
            value={fields.amount}
            onChange={(e) => setField("amount", e.target.value)}
            onBlur={() => {
              // Round the input to 2 decimals
              const newvalue =
                Math.round((parseFloat(fields.amount) || 0) * 100) / 100;
              setField("amount", String(newvalue));
            }}
            error={!!errors.amount}
            helperText={errors.amount}
          />
          <UserSearchField
            id="transaction-user"
            selectedUser={fields.to}
            onChange={(newValue) => setField("to", newValue)}
            required
            error={!!errors.to}
            helperText={errors.to}
          />
          <TextField
            id="transaction-memo"
            label="Note"
            required
            multiline
            fullWidth
            rows={4}
            value={fields.memo}
            onChange={(e) => setField("memo", e.target.value)}
            error={!!errors.memo}
            helperText={errors.memo}
          />
          <Stack spacing={3} direction="row" sx={{ width: "100%" }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={() => setTransactionType("payment")}
            >
              Pay
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={() => setTransactionType("request")}
            >
              Request
            </Button>
          </Stack>
        </Box>
        <ConfirmationDialog
          title={`Confirm ${
            transactionType === "payment" ? "Payment" : "Request"
          }`}
          onCancel={() => setConfirmationOpen(false)}
          onConfirm={handleConfirm}
          open={confirmationOpen}
        >
          <Typography>
            {/* NOTE: The `to` field must be validated as not null before a confirmation is displayed */}
            {fields.to &&
              formatConfirmationText(transactionType, fields.amount, fields.to)}
          </Typography>
        </ConfirmationDialog>
      </Box>
    </Box>
  );
}
