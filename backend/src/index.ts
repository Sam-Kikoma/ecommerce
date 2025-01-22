import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middleware/errors";

const app: Express = express();
export const prismaClient = new PrismaClient({
	log: ["query"],
});

app.use(express.json());
app.use("/api", rootRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
	console.log("We are live");
});
