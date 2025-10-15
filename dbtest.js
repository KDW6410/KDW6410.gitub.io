const mongoose = require('mongoose');

main();
console.log("this happened before players happens");
async function main() {
    mongoose.connect('mongodb://localhost/newdb');

const playerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    number: {type: Number, required: true},
    team: {type: String, required: true},
    })

    const Player = mongoose.model("Player", playerSchema);

    const players = await Player.find();
    console.log(player)
}
