import { Box, Typography, Link } from "@mui/material";

export const PromoBanner = () => {
  return (
    <Box
      sx={{
        backgroundColor: "warning.light",
        padding: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center" },
          justifyContent: { xs: "center" },
          gap: { md: 2 },
        }}
      >
        <Typography
          variant="body2"
          color="warning.contrastText"
          sx={{
            textAlign: { xs: "center", md: "left" },
            flex: { md: 1 },
          }}
        >
          Get up to 10% cashback on every purchase!
        </Typography>
        <Link
          href="https://bando.cool/blog/bando-10-cashback-is-back?utm_source=blog&utm_medium=app&utm_campaign=cashback&utm_content=tc"
          target="_blank"
          rel="noopener noreferrer"
          color="warning.contrastText"
          variant="body2"
          sx={{
            textDecoration: "underline",
            textAlign: "right",
            fontSize: 12,
          }}
        >
          Learn more
        </Link>
      </Box>
    </Box>
  );
};
