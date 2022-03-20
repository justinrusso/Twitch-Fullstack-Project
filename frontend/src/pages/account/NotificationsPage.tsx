import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import IncommingFriendRequestsPanel from "../../components/friends/IncommingFriendRequestsPanel";

import TransactionsNotificationPanel from "../../components/transactions/TransactionsNotificationPanel";
import { useAppBar } from "../../contexts/AppBarProvider";
import { tabA11yProps } from "../../utils/accessibility";

export default function NotificationsPage(): JSX.Element {
  const { setTitle } = useAppBar();

  useEffect(() => {
    setTitle("Notifications");
  }, [setTitle]);

  const [activeTab, setActiveTab] = useState<0 | 1>(0);

  return (
    <>
      <Typography variant="h4" component="h1" textAlign="center">
        Notifications
      </Typography>
      <Box>
        <Tabs
          centered
          value={activeTab}
          onChange={(_e, newValue) => setActiveTab(newValue)}
          aria-label="Notification tabs"
        >
          <Tab
            label="Transactions"
            value={0}
            {...tabA11yProps("notification", 0)}
            sx={{ flexGrow: 1 }}
          />
          <Tab
            label="Friend Requests"
            value={1}
            {...tabA11yProps("notification", 1)}
            sx={{ flexGrow: 1 }}
          />
        </Tabs>
      </Box>
      <TransactionsNotificationPanel index={0} visible={activeTab === 0} />
      <IncommingFriendRequestsPanel index={1} visible={activeTab === 1} />
    </>
  );
}
