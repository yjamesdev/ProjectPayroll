import Express from "express";
import morgan from "morgan";
import passport from "passport";
import localpass from "passport-local";
import cors from "cors";

const app = Express();
const port = app.set("port", process.env.PORT || 3000);
app.use(Express.json());
app.use(morgan("dev"));
app.use(cors());

app.listen(port, (req, res) => {
    console.log(`running in ` + `http://localhost:${port}/`)
});
