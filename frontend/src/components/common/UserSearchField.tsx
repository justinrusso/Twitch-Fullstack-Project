import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import throttle from "lodash.throttle";
import { useEffect, useMemo, useState } from "react";

import PublicUserData from "../../../../types/entity/data/PublicUserData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearUsers } from "../../store/users";
import { selectAllUsers } from "../../store/users/selectors";
import { getUsers } from "../../store/users/thunks";

type OmittedAutocompleteProps =
  | "value"
  | "options"
  | "renderInput"
  | "filterOptions"
  | "onChange"
  | "onInputChange";

type UserSearchFieldProps = {
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
  label = "Select a user",
  onChange,
  selectedUser,
  required,
  ...autocompleteProps
}: UserSearchFieldProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState("");

  const allUsers = useAppSelector(selectAllUsers());

  const getUsersThrottled = useMemo(
    () => throttle((key: string) => dispatch(getUsers({ key })).unwrap(), 200),
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
      options={allUsers}
      getOptionLabel={(option) =>
        `${option.firstName} ${option.lastName} @${option.username}`
      }
      noOptionsText="No Users Found"
      // Disable built in filtering
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField {...params} label={label} required={required} />
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
