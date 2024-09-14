import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import { schema } from "@/Schema/schema";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cors())

//testing route
app.use("/health", (_req: Request, res: Response) => {
  res.json({ Health: "This Server is Good!!" });
});

//connect to mongoDB
mongoose
  .connect(process.env.DB_URL as string)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema, // Use the created schema here
    graphiql: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(
    `🚀 Server is running on http://localhost:${process.env.PORT}/graphql`
  );
});
