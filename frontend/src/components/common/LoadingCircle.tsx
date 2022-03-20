import { Box, CircularProgress, CircularProgressProps } from "@mui/material";

export default function LoadingCircle(
  props: CircularProgressProps
): JSX.Element {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        p: 2,
        width: "100%",
      }}
    >
      <CircularProgress {...props} />
    </Box>
  );
}
