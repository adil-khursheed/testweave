import { app } from "./app";
import { _env } from "./config/_env";
import ConnectToDB from "./db/db";
import { logger } from "./utils/winstonLogger";

const port = _env.PORT || 5000;

// Database
ConnectToDB();

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
