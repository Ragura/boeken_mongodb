const express = require("express");
const { queryToSortOptions } = require("../utils/utils");

const Auteur = require("../models/auteur");

const router = express.Router();

// Alle auteurs
router.get("/", async (req, res) => {
    const sorteerOpties = queryToSortOptions(req.query.sort);

    const auteurs = await Auteur.find().sort(sorteerOpties);

    return res.send(auteurs);  
});

router.post("/", async (req, res) => {
    const data = req.body;

    try {
        const nieuweAuteur = new Auteur(data);
        const toegevoegdeAuteur = await Auteur.create(nieuweAuteur);
    
        // Stuur het nieuw toegevoegde boek terug naar aanvrager
        return res.send(toegevoegdeAuteur);
    } catch (err) {
        return res.status(400).send(err);      
    }
});

module.exports = router;