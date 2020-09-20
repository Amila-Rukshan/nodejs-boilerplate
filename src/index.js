import express from "express";
import constants from "./config/constants";

// database will get connected with the following import 
import "./config/database";

import middlewaresConfig from "./config/middlewares";
import apiRoutes from "./modules";

const app = express();

middlewaresConfig(app);

app.get('/', (req, res) => {
  res.send('Hi from node boilerplate server');
});

apiRoutes(app);

app.listen(constants.PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`
            Server running on port: ${constants.PORT}
            ---
            Running on ${process.env.NODE_ENV}
            ---
            Make something GREAT !!!
        `);
  }
});
