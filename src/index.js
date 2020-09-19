import express from "express";

const app = express();

const PORT = process.env.PORT || 3007;

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`
            Server running on port: ${PORT}
            ---
            Running on ${process.env.NODE_ENV}
            ---
            Make something GREAT !!!
        `);
  }
});
