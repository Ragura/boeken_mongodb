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

// Nieuwe auteur
router.post("/", async (req, res) => {
    const data = req.body;
    const nieuweAuteur = new Auteur(data);
    const toegevoegdeAuteur = await Auteur.create(nieuweAuteur);

    // Stuur het nieuw toegevoegde boek terug naar aanvrager
    return res.send(toegevoegdeAuteur);
});

// Auteur updaten
router.put("/:id", async (req, res) => {
    // _id van de rest van data scheiden omdat de update payload geen _id mag bevatten
    const {_id, ...data} = req.body;
    
    const auteur = await Auteur.findByIdAndUpdate(req.params.id, data, {
        runValidators: true,
        new: true
    });

    if (!auteur) {
        return res.status(404).send(`Auteur met id ${req.params.id} niet gevonden.`);
    }

    return res.send(auteur);
});

// Auteur verwijderen
router.delete("/:id", async (req, res) => {
    const resultaat = await Auteur.deleteOne({_id: req.params.id});

    if (!resultaat.deletedCount) {
        res.status(404).send(`Auteur met id ${req.params.id} niet gevonden.`);
    }

    return res.send("Auteur succesvol verwijderd.");

});

module.exports = router;