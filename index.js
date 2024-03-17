import express from "express";
import bodyParser from "body-parser";
import request from "request";
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());;


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/url/request", (req, res) => {
    const { url, proxy } = req.body;

    try {
        var options = {
            'method': 'GET',
            'url': url,
            'proxy': proxy,
            'headers': {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                'Content-Type': 'application/json',
            },
        };

        request(options, function (error, response) {
            if (error) res.send(error); else res.send(response?.body);
        });

    } catch (error) {
        res.send(error);
    }

});

app.listen(5000, () => {
    console.log("Server is running on port 3000");
});
