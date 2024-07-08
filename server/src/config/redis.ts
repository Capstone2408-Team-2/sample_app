import { Redis } from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const redisHost = process.env.REDIS_ENDPOINT_ADDRESS || "redis";
const redisPort = parseInt(process.env.REDIS_ENDPOINT_PORT || "6379", 10);

const redisConfig = {
  host: redisHost,
  port: redisPort,
};

export const sub = new Redis(redisConfig)
  .on("ready", () => console.log("Subscriber Redis client is ready"))
  .on("error", (error) => {
    console.error("Subscriber Redis client error:", error);
  });

export const pub = new Redis(redisConfig)
  .on("ready", () => console.log("Publisher client is ready"))
  .on("error", (error) => {
    console.error("Publisher Redis client error:", error);
  });