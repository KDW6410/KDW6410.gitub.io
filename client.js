// Fetch all of the players
fetch("http://localhost:3000/api/players").then((response) => {return response.json()}).then((response) =>{req = response}).then(() => {console.log(req);});

// Make a new player named Fernando Tatis Jr.
fetch("http://localhost:3000/api/player", {method:"POST", headers:{'Content-Type':'application/json'},body:JSON.stringify({name: "Fernando Tatis Jr.", number: "23", team:"San Diego Padres"}) }).then((response) => {console.log(response.json())})

// Update Fernando Tatis Jr to be a different number
fetch("http://localhost:3000/api/player/3", {method:"PUT", headers:{'Content-Type':'application/json'},body:JSON.stringify({name: "Fernando Tatis Jr.", number: "23", team:"San Diego Padres"}) }).then((response) => {console.log(response.json())})

// Fetch only Fernando Tatis Jr.
fetch("http://localhost:3000/api/player/3").then((response) => {return response.json()}).then((response) =>{req = response}).then(() => {console.log(req);});

// Delete Fernando Tatis Jr.
fetch("http://localhost:3000/api/player/3", {method:"DELETE"}).then((response) => {console.log(response.json())})