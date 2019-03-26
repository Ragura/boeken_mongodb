const express = require("express");
const { queryToSortOptions } = require("../utils/utils");

const Boek = require("../models/boek");

const router = express.Router();

// Alle boeken
router.get("/", async (req, res) => {
    const sorteerOpties = queryToSortOptions(req.query.sort);

    const boeken = await Boek.find().populate("auteur").sort(sorteerOpties);

    return res.send(boeken);  
});

// "Dikke" boeken met aantalPagina's > 300
router.get("/dik", async (req, res) => {
    const aantal = req.query.aantal || 300;

    const boeken = await Boek.find({
        aantalPaginas: {
            $gte: aantal
        }
    });
   
    return res.send(boeken);  
});

// Specifiek boek met id
router.get("/:id", async (req, res) => {
    const gevondenBoek = await Boek.findById(req.params.id);

    if (!gevondenBoek) {
        // Boek niet gevonden, is undefined
        return res.status(404).send(`Boek met id ${req.params.id} niet gevonden.`);
    }

    // Boek wel gevonden, terugsturen
    return res.send(gevondenBoek);
});


router.post("/", async (req, res) => {
    // Json data zit in req.body object
    const data = req.body;

    const { error } = Boek.joiValidate(data);
    if (error) {
        return res.status(400).send(error);        
    }

    try {
        const nieuwBoek = new Boek(data);
        const toegevoegdBoek = await Boek.create(nieuwBoek);
    
        // Stuur het nieuw toegevoegde boek terug naar aanvrager
        return res.send(toegevoegdBoek);
    } catch (err) {
        return res.status(400).send(err);      
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { n } = await Boek.deleteOne({_id: req.params.id});
        if (!n) {
            return res.status(404).send(`Boek met id ${req.params.id} werd niet gevonden.`);
        }
        return res.send(`Boek met id ${req.params.id} werd verwijderd.`);
    } catch (err) {
        return res.status(400).send(err);
    }    
});

// Optie 1: Ophalen en saven
// router.put("/:id", async (req, res) => {
//     const data = req.body;
    
//     let boek;
//     try {
//         boek = await Boek.findById(req.params.id);
//         if (!boek) return res.status(404).send(`Boek met id ${req.params.id} niet gevonden.`);
//     } catch (err) {
//         return res.status(400).send(err);
//     }
    
//     boek.titel = data.titel;
//     boek.auteur = data.auteur;
//     boek.aantalPaginas = data.aantalPaginas;

//     try {
//         const aangepastBoek = await boek.save();
//         return res.send(aangepastBoek);
//     } catch (err) {
//         return res.status(400).send(err);
//     }    
// });

// Optie 2: updateOne()
// router.put("/:id", async (req, res) => {
//     const data = req.body;
    
//     try {
//         // updateOne() slaagt validation over tenzij de optie runValidators aanstaat
//         const { n } = await Boek.updateOne({_id: req.params.id}, data, {
//             runValidators: true // Voer ook sommige schema validators uit
//         });

//         // Zijn er gewijzigde documenten?
//         if (!n) {
//             return res.status(404).send(`Boek met id ${req.params.id} werd niet gevonden.`);
//         }
        
//         return res.send(`Boek met id ${req.params.id} succesvol geupdate.`);
//     } catch (err) {
//         return res.status(400).send(err);
//     }
// });

// Optie 3: findOneAndUpdate()
router.put("/:id", async (req, res) => {
    const data = req.body;
    
    try {
        // updateOne() slaagt validation over tenzij de optie runValidators aanstaat
        const boek = await Boek.findByIdAndUpdate(req.params.id, data, {
            runValidators: true, // Voer ook sommige schema validators uit
            new: true   // Geef geupdate object terug 
        });

        // Zijn er gewijzigde docuementen?
        if (!boek) {
            return res.status(404).send(`Boek met id ${req.params.id} werd niet gevonden.`);
        }
        
        return res.send(boek);
    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = router;