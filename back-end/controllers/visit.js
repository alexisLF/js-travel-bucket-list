
const sVisit = require('../models/visit');

//POST
exports.createVisit = (req, res, next) => {

    const visit = new sVisit({...req.body});
    visit.save().then(() => {
      res.status(201).json({
        message: 'Visite enregistrée',
        response: visit._id
        
      })
    }).catch((error) => {
      res.status(400).json({error})
    })
  };
  
  //GET
  exports.getAllVisit = (req, res, next) => {
    sVisit.find()
    .then(visits => res.status(200).json(visits))
    .catch(error => res.status(400).json({ error }));
  };
  
  exports.getOneVisit = (req, res, next) => {
    sVisit.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  };
  
  //PUT
  exports.updateVisit =  (req, res, next) => {
    sVisit.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Visite modifiée'}))
      .catch(error => res.status(400).json({ error }));
  };
  
  //DELETE
  exports.deleteVisit = (req, res, next) => {
    sVisit.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Visite supprimée'}))
      .catch(error => res.status(400).json({ error }));
  };
  