import { Avatar, SxProps, Theme } from "@mui/material";

// From MUI Avatars
function stringToColor(str: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

type UserAvatarProps = {
  firstName: string;
  height?: number;
  lastName: string;
  src?: string;
  width?: number;
};

export default function UserAvatar({
  firstName,
  height,
  lastName,
  src,
  width,
}: UserAvatarProps): JSX.Element {
  const styles: SxProps<Theme> = {
    width,
    height,
  };
  const fullName = `${firstName} ${lastName}`;
  if (src) {
    return <Avatar sx={styles} alt={fullName} src={src} />;
  }
  return (
    <Avatar
      sx={{
        bgcolor: stringToColor(`${firstName} ${lastName}`),
        ...styles,
      }}
    >
      {`${firstName[0]}${lastName[0]}`}
    </Avatar>
  );
}
