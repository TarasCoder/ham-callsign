import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;
const URL = "https://callook.info/";
let isRequest = false;

app.get("/", (req, res) => {
  isRequest = false;
  res.render("index.ejs", { isRequest });
});
app.post("/checking", async (req, res) => {
  let userInput = req.body.callsign;
  isRequest = true;

  try {
    let request = await axios.get(URL + userInput + "/json");
    console.log(request.data);
    res.render("index.ejs", {
      isRequest,
      callsign: request.data.current.callsign,
      name: request.data.name,
      address1: request.data.address.line1,
      address2: request.data.address.line2,
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.render("index.ejs", { isRequest, error: "Error fetching data" });
  } finally {
    isRequest = false;
  }
});
app.listen(port, () => {
  console.log("Server is listening on port " + port + "...");
});