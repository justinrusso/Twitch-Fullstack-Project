import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import throttle from "lodash.throttle";
import { useEffect, useMemo, useState } from "react";

import PublicUserData from "../../../../types/entity/data/PublicUserData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getFriends } from "../../store/friends/thunks";
import { clearUsers } from "../../store/users";
import { selectAllUsers } from "../../store/users/selectors";
import { getUsers } from "../../store/users/thunks";
import UserListItem from "../user/UserListItem";

type PublicUserDataWithFriendship = PublicUserData & { isFriend: boolean };

type OmittedAutocompleteProps =
  | "value"
  | "options"
  | "renderInput"
  | "filterOptions"
  | "onChange"
  | "onInputChange";

type UserSearchFieldProps = {
  /**
   * Toggles the error state of the text field
   */
  error?: boolean;

  /**
   * Gives context about the field's input.
   * Can also be used to provide feedback to the user about an error.
   */
  helperText?: string;

  /**
   * The input's label to be displayed.
   * @default "Select a user"
   */
  label?: string;

  /**
   * Even called when a user is selected
   */
  onChange: (newValue: PublicUserData | null) => void;

  /**
   * Marks the input field as required
   */
  required?: boolean;

  selectedUser: PublicUserData | null;
} & Omit<
  AutocompleteProps<PublicUserData | null, false, false, false>,
  OmittedAutocompleteProps
>;

export default function UserSearchField({
  error,
  helperText,
  label = "Select a user",
  onChange,
  selectedUser,
  required,
  ...autocompleteProps
}: UserSearchFieldProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState("");

  const allUsers = useAppSelector(selectAllUsers());

  const friendshipsEntiies = useAppSelector((state) => state.friends.entities);

  useEffect(() => {
    // Get all friends to check against
    dispatch(getFriends({}));
  }, [dispatch]);

  /**
   * Sort all users by their friendship status. Friends should be prioritized in the list.
   */
  const allUsersSorted = useMemo(() => {
    const sorted: PublicUserDataWithFriendship[] = [];
    const notFriends: PublicUserDataWithFriendship[] = [];

    allUsers.forEach((user) => {
      const friendship = friendshipsEntiies[user.id];
      if (friendship && friendship.accepted) {
        sorted.push({ ...user, isFriend: true });
      } else {
        notFriends.push({ ...user, isFriend: false });
      }
    });

    notFriends.forEach((user) => sorted.push(user));

    return sorted;
  }, [allUsers, friendshipsEntiies]);

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

  return (
    <Autocomplete
      id="user-search-input"
      fullWidth
      value={selectedUser}
      options={allUsersSorted}
      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
      renderOption={(props, option) => (
        <UserListItem
          user={option}
          showFriendIndicator={
            (option as PublicUserDataWithFriendship).isFriend
          }
          {...props}
        />
      )}
      noOptionsText="No Users Found"
      // Disable built in filtering
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={error}
          required={required}
          helperText={helperText}
        />
      )}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(_event, newValue) => {
        onChange(newValue);
      }}
      {...autocompleteProps}
    />
  );
}
