import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BankTransferResponseErrors } from "../../../../types/responses/BankTransferResponse";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import CurrencyTextField from "../../components/common/CurrencyTextField";
import { useAppBar } from "../../contexts/AppBarProvider";
import useFormFields from "../../hooks/form-fields";
import { useAppDispatch } from "../../hooks/redux";
import { createTransfer } from "../../store/transfers/thunks";

export default function TransferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setTitle } = useAppBar();

  useEffect(() => {
    setTitle("Manage Funds");
  }, [setTitle]);

  const { fields, setField } = useFormFields({
    amount: "", // NOTE: This should be multiplied by 100 when sending
    deposit: true,
  });

  const [errors, setErrors] = useState<Partial<BankTransferResponseErrors>>({});
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleConfirm = async () => {
    setErrors({});

    try {
      await dispatch(
        createTransfer({
          amount: Math.round(parseFloat(fields.amount) * 100),
          deposit: fields.deposit,
        })
      ).unwrap();
      navigate("..");
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      setConfirmationOpen(false);
      setErrors(error as BankTransferResponseErrors);
    }
  };

  const transferAction = fields.deposit ? "Deposit" : "Withdraw";

  return (
    <>
      <Typography variant="h4" component="h1" textAlign="center">
        {transferAction} Money
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
        <Box pb={1}>
          <Tabs
            value={Number(fields.deposit)}
            onChange={(_e, value) => setField("deposit", Boolean(value))}
            aria-label="bank transfer type"
          >
            <Tab
              label="Deposit"
              id="transfer-deposit-deposit"
              value={Number(true)}
            />
            <Tab
              label="Withdraw"
              id="transfer-deposit-withdraw"
              value={Number(false)}
            />
          </Tabs>
        </Box>
        <CurrencyTextField
          id="transfer-amount"
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
        />
        <Button type="submit" variant="contained">
          {transferAction}
        </Button>
      </Box>
      <ConfirmationDialog
        title={`Confirm ${transferAction}`}
        onCancel={() => setConfirmationOpen(false)}
        onConfirm={handleConfirm}
        open={confirmationOpen}
      >
        <Typography>
          Are you sure you want to {transferAction.toLowerCase()}{" "}
          {parseFloat(fields.amount).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
          ?
        </Typography>
      </ConfirmationDialog>
    </>
  );
}
