// myserver.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
main();

async function main() {
   mongoose.connect("mongodb://localhost/newdb");


   app.use(express.json());
   app.use(cors());

   const playerSchema = new mongoose.Schema({
      name: {type: String, required: true},
      number: {type: Number, required: true},
      team: {type: String, required: true},
   })

   const Player = mongoose.model("Player", playerSchema);

   players = {1:{"name": "Ronald Acuña Jr.", "number": "13", "team": "Atlanta Braves"},
              2:{"name": "Shohei Ohtani", "number": "17", "team": "Los Angeles Dodgers"}
   }
   next_id = 3;

   app.get("/", function(req, res) {
      res.send("<h1>Welcome to the dugout!");
   });


   app.get("/api/player/:id", async function(req, res) {
      id = req.params.id;
      try {
         player = await Player.findById(id);
         if(players[id]) {
               console.log(players[id]);
               res.send(players[id]);
      } else {
         res.send({"error": 404,
         "msg": "Player not found"});
      }
   } catch {
      console.log(error);
      res.status(404).send({"error": 404, "msg": "Player not found"});
   }
   });

   app.post("/api/player", async function(req, res) {
      player = await Player.create(req.body);
      res.send({"id": "Player"['_id'], "player":player});
   });

   app.put("/api/player/:id", async function(req, res) {
      newPlayer = req.body;
      console.log(newPlayer);
      id = req.params.id;
      player = await Player.findById(id);
      if(player) {
         // One way - get your object, make changes to that object and then save it back
         /*
         chicken['age'] = parseInt(newChicken['age']);
         await chicken.save()
         */
         await Player.where({_id: id}).updateOne({$set: newPlayer}).exec();
         player = await Player.findById(id);
         res.send({"id": id, "player":player});
      } else {
         res.status(404).send({"error": 404, "msg": "Player not found"});
      }
   });

   app.delete("/api/player/:id", async function(req, res) {
      id = req.params.id;
      player = await Player.findById(id);
      if(player) {
         try {
            Player.deleteOne({_id: id});
            res.send({"message": `deleted player of id=${id}`, "response_code": 200})
         } catch (err) {
            console.error(err);
            res.status(500).send(err);
         }
      } else {
         res.status(404).send({"error": 404, 
            "msg": "Player not found"});
      }
   });

   app.get("/api/players/:filter", async function(req, res) {
      const filter = JSON.parse(req.params.filter);
      console.log(filter);
      players;
      players = await Player.find(filter);
      res.send(players);
   });

      app.get("/api/players/", async function(req, res) {
         players = await Player.find();
         res.send(players)
      });

   app.get("/player/:pos", function(req, res) {
      index = req.params.pos;
      if(index > players.length - 1) {
         res.send({"error": 404,
         "msg": "Player not found"});
      }
      res.send(`<p>Name: ${players[index].name}</p><p>Number: ${players[index].number}</p><p> Team: ${players[index].team}`);
   });

   app.listen(3000, function(){console.log("Listening on port 3000")})
}
