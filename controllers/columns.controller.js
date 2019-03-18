const Column = require('../models/column.model');
const Card = require('../models/card.model');


module.exports.list = (req, res, next) => {
  Column.find()
    .populate('cards')
    .then(columns => {
      res.json(columns);
    })
    .catch(error => next(error))
}

module.exports.create = (req, res, next) => {
  const column = new Column(req.body);

  column.save()
    .then((column) => res.status(201).json(column))
    .catch(error => next(error))
}

module.exports.details = (req, res, next) => {
  Column.findById(req.params.id)
    .populate('cards')
  .then((column) => {
    if(!column){
      throw createError(404, 'column not found')
    } else {
      res.json(column)
    }
  })
  .catch(error => next(error))
}

module.exports.edit = (req, res, next) => {

  Column.findByIdAndUpdate(req.params.id, req.body, {new:true} )
  .then((column) => {
    if(!column){
      throw createError(404, 'column not found')
    } else {
      res.json(column)
    }
  })
  .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
  Card.deleteMany({ column: req.params.id })
  .then((card) => {
    if(!card){
      throw createError(404, 'cards not found')
    } else {
      res.status(204).json("cards deleted")
    }
  })
  Column.findByIdAndDelete(req.params.id)
  .then((column) => {
    if(!column){
      throw createError(404, 'column not found')
    } else {
      res.status(204).json("deleted")
    }
  })
  .catch(error => next(error))
}
