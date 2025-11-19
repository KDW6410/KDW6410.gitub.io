console.log("Hello Baseball Lovers");
const playerDiv = document.getElementsByClassName("players")[0];
const loadingIcon = document.getElementById("loadingIcon");
fetch("/api/players/").then((response) => 
    {console.log(response);
        return response.json()}).then((response) =>
        {for (i in response) {
            console.log(response);
            const player = response[i];
            const curPlayer = document.createElement("div");
            curPlayer.className = 'player';
            playerDiv.append(curPlayer);
            curPlayer.style.backgroundColor = player['color'];
            curPlayer.innerHTML = '<p class="name">'+player['name']+'</p>'
        }
        loadingIcon.style.display = "none";
    });