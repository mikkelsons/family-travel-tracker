import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.chucknorris.io/jokes/random"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/joke", async (req, res) => {
    try {
      const type = req.query.type;
      const result = await axios.get(API_URL + "?category=" + type);
      res.render("index.ejs", { 
        joke: result.data.value,
        selectedType: type,
      });
      console.log(result.data.value);     
    } catch (error) {
        console.log(error.response.data);
        res.status(500).send("Error fetching the joke");
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });