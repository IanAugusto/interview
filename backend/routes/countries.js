import express from "express";
import axios from "axios";
import { fetchData } from "../utils/apiHelpers.js";

const router = express.Router();

router.get("/country-info/:countryCode", async (req, res) => {
    const { countryCode } = req.params;

    try {
        const bordersUrl = `https://date.nager.at/api/v3/CountryInfo/${countryCode}`;
        const populationUrl = "https://countriesnow.space/api/v0.1/countries/population";
        const flagUrl = "https://countriesnow.space/api/v0.1/countries/flag/images";

        const borderCountries = await fetchData(bordersUrl);
        
        // Corpo JSON esperado pela API
        const requestBody = { iso2: countryCode };

        const population = await fetchData(populationUrl, "POST", requestBody);
        const flag = await fetchData(flagUrl, "POST", requestBody);

        res.json({
            borderCountries: borderCountries?.borders || [],
            population_data: population?.data?.population || {},
            flag_url: flag?.data?.flag || "",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching countries" });
    }
});

export default router;