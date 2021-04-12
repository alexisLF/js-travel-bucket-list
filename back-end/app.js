require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const sVisit = require('./models/visit');

//MANGO CONNECTION
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('DB is OK'))
  .catch(() => console.log('DB failed'));
  
//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
  });

app.use(express.json());

//POST
app.post('/visits', (req, res, next) => {

  const visit = new sVisit({...req.body});
  visit.save().then(() => {
    res.status(201).json({
      message: 'Visite enregistrée',
      response: visit._id
      
    })
  }).catch((error) => {
    res.status(400).json({error})
  })
});

//GET
app.get('/visits', (req, res, next) => {
  sVisit.find()
  .then(visits => res.status(200).json(visits))
  .catch(error => res.status(400).json({ error }));
});

app.get('/visits/:id', (req, res, next) => {
  sVisit.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

//PUT
app.put('/visits/:id', (req, res, next) => {
  sVisit.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Visite modifiée'}))
    .catch(error => res.status(400).json({ error }));
});

//DELETE
app.delete('/visits/:id', (req, res, next) => {
  sVisit.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Visite supprimée'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;