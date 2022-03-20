import {
  ListItem,
  ListItemAvatar,
  Box,
  Typography,
  Stack,
} from "@mui/material";

import PublicUserData from "../../../../types/entity/data/PublicUserData";
import { getUsersFullName } from "../../utils/string";
import UserAvatar from "../common/UserAvatar";

type FriendListItemProps = {
  /**
   * Actions to display under the text in the list item
   */
  actions?: JSX.Element;

  friend: PublicUserData;
};

export default function FriendListItem({
  actions,
  friend,
}: FriendListItemProps): JSX.Element {
  const fullName = getUsersFullName(friend);
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <UserAvatar
          firstName={friend.firstName}
          lastName={friend.lastName}
          src={friend.profileImgUrl}
        />
      </ListItemAvatar>
      <Box sx={{ flex: "1 1 auto", minWidth: 0, my: 0.5 }}>
        <Typography component="span">{fullName}</Typography>
        <Typography
          gutterBottom
          variant="caption"
          sx={{ color: "text.secondary", display: "block" }}
        >
          {friend.username}
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
