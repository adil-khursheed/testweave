import { config } from "dotenv";
import express, { NextFunction, Request, Response, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import expressWinston from "express-winston";
import winston from "winston";
import errorMiddleware from "./middlewares/error";
import { clerkMiddleware } from "@clerk/express";

// Routes
import webhookRoutes from "./routes/webhookRoutes";
import userRoutes from "./routes/users";
import organizationRoutes from "./routes/organizationRoutes";

config({
  path: "./.env",
});

const app = express();

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.cli()
    ),
    meta: true,
    expressFormat: true,
    colorize: true,
  })
);

app.use(cookieParser());
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === "/api/v1/webhooks/clerk") {
    next();
  } else {
    express.json();
  }
});
app.use(urlencoded({ extended: true }));

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      /\.vercel\.app$/.test(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(clerkMiddleware());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/webhooks", webhookRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/organizations", organizationRoutes);

app.use(errorMiddleware);

export { app };
