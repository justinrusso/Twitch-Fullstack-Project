const config = {
  environment: process.env.NODE_ENV || "development",
  serverPort: process.env.PORT || 5000,
  jwtConfig: {
    secret: process.env.JWT_SECRET || "",
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN || "", 10) || 604800,
  },
};

/*
  Safety Checks
*/
// Ensure a secret is provided
if (config.jwtConfig.secret === "") {
  console.error("No JWT Secret defined, exiting...");
  process.exit();
}

export default config;
