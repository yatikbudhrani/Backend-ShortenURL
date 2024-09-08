const express = require("express");
const { connectToDB } = require("./config/db");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = process.env.PORT || 3000;
connectToDB();

app.use(express.json());

app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
