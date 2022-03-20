import { Button, List, TextField, Typography } from "@mui/material";
import throttle from "lodash.throttle";
import { useEffect, useMemo, useState } from "react";
import LoadingCircle from "../../components/common/LoadingCircle";
import FriendListItem from "../../components/friends/FriendListItem";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getFriends } from "../../store/friends/thunks";
import { clearUsers } from "../../store/users";
import { selectAllUsers } from "../../store/users/selectors";
import { getUsers } from "../../store/users/thunks";

export default function SearchPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const [loaded, setLoaded] = useState(false);

  const friendshipsEntiies = useAppSelector((state) => state.friends.entities);

  useEffect(() => {
    // Get all friends to check against
    dispatch(getFriends({}))
      .unwrap()
      .then(() => setLoaded(true));
  }, [dispatch]);

  const [inputValue, setInputValue] = useState("");

  const allUsers = useAppSelector(selectAllUsers());

  const getUsersThrottled = useMemo(
    () =>
      throttle(
        (key: string) => dispatch(getUsers({ key, ignoreSelf: true })).unwrap(),
        200
      ),
    [dispatch]
  );

  useEffect(() => {
    if (inputValue === "") {
      dispatch(clearUsers());
      return;
    }
    getUsersThrottled(inputValue);
  }, [dispatch, getUsersThrottled, inputValue]);

  if (!loaded) {
    return <LoadingCircle />;
  }

  return (
    <>
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        User Search
      </Typography>
      <TextField
        id="user-search-input"
        label="Search Users"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {allUsers.length > 0 ? (
        <List sx={{ pt: 2 }}>
          {allUsers.map((user) => (
            <FriendListItem
              key={user.id}
              friend={user}
              actions={
                !friendshipsEntiies[user.id] ? (
                  <Button>Add Friend</Button>
                ) : undefined
              }
            />
          ))}
        </List>
      ) : (
        <Typography textAlign="center" sx={{ color: "text.secondary", pt: 2 }}>
          No Users Found
        </Typography>
      )}
    </>
  );
}
