import TransactionNotifications from "./TransactionNotifications";

type TransactionsNotificationPanelProps = {
  index: number;
  visible: boolean;
};

export default function TransactionsNotificationPanel({
  index,
  visible,
}: TransactionsNotificationPanelProps): JSX.Element {
  return (
    <div
      role="tabpanel"
      hidden={!visible}
      id={`notification-tabpanel-${index}`}
      aria-labelledby={`notification-tab-${index}`}
    >
      {visible && <TransactionNotifications />}
    </div>
  );
}
