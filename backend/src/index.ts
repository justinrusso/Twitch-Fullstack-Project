import app from "./app";
import config from "./config";

const { serverPort } = config;

app.listen(serverPort, () => console.log(`Listening on port ${serverPort}...`));
