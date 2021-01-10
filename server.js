import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 4005;

app.use(express.json());

app.get("/api/rates", async (req, res, next) => {
    try {
        const {base, currency} = req.query;

        const response = await axios.get(
            `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`
        );

        const { base: baseCurrency, rates, date} = response.data;

        res.json({
            results: {
                baseCurrency,
                date,
                rates,
            },
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    }
});

app.get("*", function (req, res) {
    res.status(404).send("404 | Not Found!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}....`);
});
