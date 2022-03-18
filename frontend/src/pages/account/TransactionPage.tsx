import { Typography, Box, Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import PublicUserData from "../../../../types/entity/data/PublicUserData";
import { TransactionResponseErrors } from "../../../../types/responses/TransactionResponse";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import CurrencyTextField from "../../components/common/CurrencyTextField";
import UserSearchField from "../../components/common/UserSearchField";
import useFormFields from "../../hooks/form-fields";
import { useAppDispatch } from "../../hooks/redux";
import { createTransaction } from "../../store/transactions/thunks";

export default function NewTransactionPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { fields, setField } = useFormFields({
    amount: "", // NOTE: This should be multiplied by 100 when sending
    to: null as PublicUserData | null,
    memo: "",
  });

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
          type: "payment",
        })
      ).unwrap();
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
          <Button type="submit" variant="contained" fullWidth>
            Pay
          </Button>
        </Box>
        <ConfirmationDialog
          title="Confirm Payment"
          onCancel={() => setConfirmationOpen(false)}
          onConfirm={handleConfirm}
          open={confirmationOpen}
        >
          <Typography>
            Are you sure you want to send{" "}
            {parseFloat(fields.amount).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}{" "}
            to {fields.to?.firstName} {fields.to?.lastName}?
          </Typography>
        </ConfirmationDialog>
      </Box>
    </Box>
  );
}
