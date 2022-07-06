const houses = require("./db.json");
const globalId = 4;

module.exports = {
  getHouses: (req, res) => {
    res.status(200).send(houses);
  },
  deleteHouse: (req, res) => {
    const existingId = +req.params.id;

    let index = houses.findIndex((house) => house.id === existingId);
    houses.splice(index, 1);
    res.status(200).send(houses);
  },
  createHouse: (req, res) => {
    const { address, price, imageURL } = req.body;

    let newHouse = {
      address,
      price,
      imageURL,
      id: globalId,
    };
    houses.push(newHouse);
    res.status(200).send(houses);
    globalId++;
  },
  updateHouse: (req, res) => {
    const existingId = +req.params.id;
    let index = houses.findIndex((house) => house.id === existingId);
    if (req.body.type === "plus") {
      houses[index].price += 10000;
      res.status(200).send(houses);
    } else {
      if (houses[index].price <= 1) {
        res.status(400).send("Cannot sell a house below 1$");
      } else {
        houses[index].price -= 10000;
        res.status(200).send(houses);
      }
    }
  },
};
