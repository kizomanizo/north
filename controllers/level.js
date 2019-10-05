const Level = require('../models').Level;
const uuidv4 = require('uuid/v4');

module.exports = {
    // List all levels stored
    all(_req, res) {
        Level.findAll()
        .then(levels =>  res.status(200).send(levels))
        .catch(error => res.status(400).send(error));
    },

    // Create a new level
    create(req, res) {
        return Level.create({
            uuid:       uuidv4(),
            name:       req.body.name,
            created_by: req.body.user,
        })
        .then(level => res.status(201).send(level))
        .catch(error => res.status(400).send(error));
    },
    
    // Search for a specific level using UUID, for Primary key utumie findByPk(req.params.LevelId)
    search(req, res) {
        Level.findOne({where: {uuid: req.params.LevelUuid} })
        .then(level =>  res.status(200).send(level))
        .catch(error => res.status(400).send(error));
    },

    // Delete a specific level using UUID, for Primary key utumie findByPk(req.params.LevelId)
    delete(req, res) {
      Level.findOne({where: {uuid: req.params.LevelUuid} })
      .then(level => { return level.destroy()} )
      .then(level =>  res.status(200).send(level))
      .catch(error => res.status(400).send(error));
    },
};