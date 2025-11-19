// server.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

main();

async function main() {
   mongoose.connect("mongodb://localhost/newdb");

   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use(express.static("public"));

   app.set("views", "views");
   app.set("view engine", "pug");
   app.use(cors());


   const playerSchema = new mongoose.Schema({
      name: {type: String, required: true},
      number: {type: Number, required: true},
      team: {type: String, required: true},
   })

   const Player = mongoose.model("Player", playerSchema);

   app.get("/api/player/:id", async function(req, res) {
      id = req.params.id;
      try {
         player = await Player.findById(id);
         if(player) {
            console.log(player);
            res.send(player);
         } else {
            res.status(404).send({"error": 404,
            "msg": "Player not found"});
         }
      } catch (error) {
            console.log(error);
            res.status(404).send({"error": 404,
            "msg": "Player not found"});
      }
   });

   app.post("/api/player", async function(req, res) {
      console.log(req)
      player = await Player.create(req.body);
      res.send({"id": player['_id'], "player":player});
   });

   app.put("/api/player/:id", async function(req,res) {
      newPlayer = req.body;
      console.log(newPlayer);
      id = req.params.id;
      player = await Player.findById(id);
      if(player) {
         // One way- get your object, make changes to that object and then save it back
         /*
         player['age'] = parseInt(newPlayer['age']);
         await player.save();
         */
         // await Player.where({_id: id}).updateOne({$set: newPlayer}).exec();
         await Player.updateOne({_id: id}, {$set: newPlayer});
         player = await Player.findById(id);
         res.send({"id": id, "player":player});
      } else {
         res.status(404).send({"error": 404,
            "msg": "Player not found"});
      }
   });

   app.delete("/api/player/:id", async function(req, res) {
      id = req.params.id;
      player = await Player.findById(id);
      if(player) {
         try{
            await Player.deleteOne({_id: id});
            res.send({"message": `deleted player of id=${id}`, 
            "response_code":200});
         } catch (err) {
            console.error(err);
            res.status(500).send(err);
         }
      } else {
         res.status(404).send({"error": 404,
            "msg": "Player not found"});
      }
   });

   app.get("/api/players/:filter", async function(req,res) {
      const filter = JSON.parse(req.params.filter);
      console.log(filter);
      players;
      players = await Player.find(filter);
      res.send(players);
   });

   app.get("/api/players/", async function(req,res) {
      players = await getPlayers();
      res.send(players);
   });

   
   app.get("/", async function(req, res) {
      // players = await getPlayers();
      players = [];
      res.render("index", players);
   });

   app.get("/player/:id", async function(req, res) {
      id = req.params.id;
      try {
         player = await Player.findById(id);
         if(player) {
            res.render("player", player);
         } else {
            res.status(404).send("No player exists with that ID: "+id);
         }
      } catch (err) {
         console.error(err);
         res.status(500).send("Something went wrong with the server.");
      }
      
   });

   app.get("/players/", async function(req, res) {
      players = await getPlayers();
      res.render("players", players);
   });

   app.get("/create/", function(req, res) {
      res.render("create");
   });

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }

   async function getPlayers() {
      console.log('Starting sleep...');
      await sleep(2000); // Pause for 2 seconds
      console.log('Created!');
      return await Player.find();
   }

   app.listen(3000, function(){console.log("Listening on port 3000...")})
}

