import mongoose from "mongoose";
import constants from "./constants";

// remove the warning with promise
mongoose.Promise = global.Promise;

// connect the db with url provided
try {
  mongoose.connect(constants.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
  .once("open", () => console.log("MongoDB Running"))
  .on("error", (e) => {
    throw e;
  });
