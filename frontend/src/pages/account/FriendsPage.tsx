import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FriendsPanel from "../../components/friends/FriendsPanel";
import SentFriendRequestsPanel from "../../components/friends/SentFriendRequestsPanel";

import { useAppBar } from "../../contexts/AppBarProvider";

/**
 * A utlity function to generate accessibility properties for an element
 * @param name The index of the tab
 * @returns an object of properties
 */
function tabA11yProps(index: number) {
  return {
    id: `friends-tab-${index}`,
    "aria-controls": `friends-tabpanel-${index}`,
  };
}

export default function FriendsPage(): JSX.Element {
  const { setTitle } = useAppBar();

  useEffect(() => {
    setTitle("Friends");
  }, [setTitle]);

  const [activeTab, setActiveTab] = useState<0 | 1>(0);

  return (
    <>
      <Typography variant="h4" component="h1" textAlign="center">
        Friends
      </Typography>
      <Box>
        <Tabs
          centered
          value={activeTab}
          onChange={(_e, newValue) => setActiveTab(newValue)}
          aria-label="Friends tabs"
        >
          <Tab
            label="Friends"
            value={0}
            {...tabA11yProps(0)}
            sx={{ flexGrow: 1 }}
          />
          <Tab
            label="Sent Requests"
            value={1}
            {...tabA11yProps(1)}
            sx={{ flexGrow: 1 }}
          />
        </Tabs>
      </Box>
      <FriendsPanel index={0} visible={activeTab === 0} />
      <SentFriendRequestsPanel index={1} visible={activeTab === 1} />
    </>
  );
}
