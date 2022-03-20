import { Star } from "@mui/icons-material";
import {
  ListItem,
  ListItemAvatar,
  Box,
  Typography,
  Stack,
  ListItemProps,
} from "@mui/material";

import PublicUserData from "../../../../types/entity/data/PublicUserData";
import { getUsersFullName } from "../../utils/string";
import UserAvatar from "../common/UserAvatar";

type UserListItemProps = {
  /**
   * Actions to display under the text in the list item
   */
  actions?: JSX.Element;

  /**
   * Shows a star on the right edge of the list item
   */
  showFriendIndicator?: boolean;

  user: PublicUserData;
} & ListItemProps;

export default function UserListItem({
  actions,
  showFriendIndicator,
  user,
  ...listItemProps
}: UserListItemProps): JSX.Element {
  const fullName = getUsersFullName(user);
  return (
    <ListItem alignItems="flex-start" {...listItemProps}>
      <ListItemAvatar>
        <UserAvatar
          firstName={user.firstName}
          lastName={user.lastName}
          src={user.profileImgUrl}
        />
      </ListItemAvatar>
      <Box sx={{ flex: "1 1 auto", minWidth: 0, my: 0.5 }}>
        <Typography component="span">{fullName}</Typography>
        <Typography
          gutterBottom
          variant="caption"
          sx={{ color: "text.secondary", display: "block" }}
        >
          {user.username}
        </Typography>
        {actions && (
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            {actions}
          </Stack>
        )}
      </Box>
      {showFriendIndicator && (
        <div>
          <Star />
        </div>
      )}
    </ListItem>
  );
}
