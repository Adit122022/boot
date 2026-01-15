import dotenv from "dotenv"
dotenv.config()


 const _config  = {
    PORT : process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || "dev",
    JWT_SECRET:process.env.JWT_SECRET ||"jwt-secret-key"
 }

 const config = Object.freeze(_config);
  export default config