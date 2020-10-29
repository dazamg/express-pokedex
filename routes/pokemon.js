const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');
// const { default: Axios } = require('axios');
// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(favorites => {

    res.render('index', {pokemon: favorites, showButton: false});
  })
  .catch(err => {
    console.log('Oops', err)
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {name: req.body.name},
    defaults: {name: req.body.name}
  })
  .then (([created, wasCreated])=> {
    res.redirect('/pokemon')
  })
  .catch(err => {
    console.log('Something went wrong', err)
  })
});

router.get('/:idx', (req, res) =>{
  let pokemonLink = `http://pokeapi.co/api/v2/pokemon/${req.params.idx}`;
  axios.get(pokemonLink)
  .then(response=> {
    res.render('show', {pokemon: response.data})
    console.log(response.data)
  })
  .catch(err=> {
    console.log('can/t find error', err)
  });
});

router.delete('/:idx', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.destroy({
    where: {id: req.params.idx},
  })
  .then(numRowsDeleted=>{
    console.log(numRowsDeleted)
    res.redirect('/pokemon')
  })
  .catch(err=> {
    console.log('oops', err)
  })
})
module.exports = router;
