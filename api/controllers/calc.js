module.exports = () => {
  const fs = require('fs');
  const calcDB = require('../data/calc.json');
  const controller = {};

  controller.listCalc = (req, res) => {
    const data = calcDB;
    let response = []
    if (data.length >= 1) {
      for (const item of data) {
        const calculator = item.numberA * item.numberB
        const numberA = item.numberA
        const numberB = item.numberB
        const name = item.name
        response.push({
          name,
          numberA,
          numberB,
          calculator,
        })
      }
    } else {
      return res.json({error: 'Banco vazio'})
    }
    return res.status(200).json(response);
  }

  controller.saveCalc = (req, res) => {
    const obj = calcDB;
    obj.push({
      name: req.body.name,
      numberA: req.body.numberA,
      numberB: req.body.numberB
    })
    fs.writeFile('./api/data/calc.json', JSON.stringify(obj), (err) => {
      if (err) {
          throw err;
      }
      console.log("JSON data is saved.");
    })    
    return res.status(201).json({ "data": "JSON data is saved." });
  };

  return controller;
}