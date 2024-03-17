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

app.post("/elements-api/items/:id/download_and_license.json", (req, res) => {
    const { id, csrf_1, csrf_2, cookie } = req.params;

    try {
        var options = {
            'method': 'POST',
            'url': `https://elements.envato.com/api/v1/items/${id}/download_and_license.json`,
            'headers': {
                'Content-Type': 'application/json',
                'x-csrf-token': csrf_1,
                'x-csrf-token-2': csrf_2,
                'cookie': cookie,
            },

            body: JSON.stringify({
                "licenseType": "trial"
            })

        };
        request(options, function (error, response) {
            if (error) res.send(error); else
                res.send(response?.body);

        });

    } catch (error) {
        res.send(error);
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 3000");
});
