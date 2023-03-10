'use strict';

var FaceItDota = FaceItDota || {
    interval: null,
    intervalCount: 0,
    matchroom: null,
    data : [],
    setData: function(data) {
        FaceItDota.data = data;
        FaceItDota.init();
    },
    init: function(){
        if(location.href.substring(0, 22) == "https://www.faceit.com" && location.href.substring(25, 37) == "/dota2/room/") {
            console.log("Init FaceItDotadota");
            FaceItDota.clearInterval();
            FaceItDota.interval = setInterval(FaceItDota.findMatchroom, 2000);
        }
    },
    findMatchroom: function() {
        FaceItDota.intervalCount++;
        if(FaceItDota.intervalCount > 7) {
            FaceItDota.clearInterval();
            return;
        }

        var container = document.querySelector("#parasite-container");
        if(container != null && container.shadowRoot != null) {
            FaceItDota.matchroom = container.shadowRoot.querySelector("#MATCHROOM-OVERVIEW");
            if(null != FaceItDota.matchroom) {
                console.log("Found Matchroom");
                FaceItDota.clearInterval();

                FaceItDota.hydratePicks();
                FaceItDota.hydrateRoster();
            }
        }
    },
    hydratePicks: function() {
        var divs = FaceItDota.matchroom.querySelectorAll("div[name=info] div");
        if(divs.length > 1) {
            for(var i in divs) {
                if(divs[i].innerText == divs[i].innerHTML) {
                    var playerBox = divs[i];
                    var player = FaceItDota.findPlayer(divs[i].innerText);
                    if (player != null) {
                        var playerName = document.createTextNode(playerBox.innerText);
                        var playerInfo = document.createElement("small");
                        playerInfo.appendChild(document.createTextNode(player.mmr + " MMR"));
                        playerInfo.appendChild(document.createElement("br"));
                        playerInfo.appendChild(document.createTextNode("Positions: "+ player.positions));

                        playerBox.textContent = "";
                        playerBox.appendChild(playerName);
                        playerBox.appendChild(document.createElement("br"));
                        playerBox.appendChild(playerInfo);
                    }
                }
            }
        }
    },
    hydrateRoster: function() {
        var avgRoster = {roster1:[], roster2:[]};

        var rosters = FaceItDota.matchroom.querySelectorAll("div[name]");
        for(var k in rosters) {
            if(!isNaN(k) && (rosters[k].getAttribute("name") == "roster1" || rosters[k].getAttribute("name") == "roster2")) {
                var divs = rosters[k].querySelectorAll("div");
                if(divs.length > 5) {
                    for(var i in divs) {
                        if(divs[i].innerText == divs[i].innerHTML) {
                            var player = FaceItDota.findPlayer(divs[i].innerText);
                            if (player != null) {
                                avgRoster[rosters[k].getAttribute("name")].push(player.mmr);

                                var parent = divs[i].parentNode.nextSibling;
                                if (parent != null && parent.tagName == "DIV") {
                                    var pInfo = parent.querySelectorAll("div[playerInfo]");
                                    if(pInfo.length == 1) {
                                        pInfo[0].textContent = "";
                                        pInfo[0].appendChild(document.createTextNode(player.mmr + " MMR | Positions: " + player.positions));
                                    } else {
                                        var playerName = document.createTextNode(parent.innerText);
                                        var playerInfo = document.createElement("div");
                                        playerInfo.setAttribute("playerInfo", "true");
                                        playerInfo.appendChild(document.createTextNode(player.mmr + " MMR | Positions: " + player.positions));

                                        parent.textContent = "";
                                        parent.appendChild(playerName);
                                        parent.appendChild(playerInfo);    
                                    }
                                }
                            }
                        }
                    }
                }

                var avg = rosters[k].querySelector('#avgMMR');
                if(avg == null) {
                    avg = document.createElement("div");
                    avg.id = "avgMMR";
                    avg.style = "margin-top: 15px;"
                    rosters[k].appendChild(avg);
                }

                var c = avgRoster[rosters[k].getAttribute("name")].length;
                var sum = 0;

                for(var m in avgRoster[rosters[k].getAttribute("name")]) {
                    sum = Number(sum) + Number(avgRoster[rosters[k].getAttribute("name")][m]);
                }

                avg.textContent = "AVG: " + (sum / c) + " MMR";
            }
        }
    },
    initPickButtons: function() {
        var buttons = FaceItDota.matchroom.querySelectorAll("div[name=info] button");
        for(var i in buttons) {
            buttons[i].addEventListener("click", FaceItDota.hydrateRoster, false);
        }
    },
    findPlayer: function(name) {
        if(name != undefined && name.length > 0) {
            for(var i  in FaceItDota.data) {
                if(FaceItDota.data[i].username == name) {
                    return FaceItDota.data[i];
                }
            }
        }

        return null;
    },
    clearInterval: function() {
        clearInterval(FaceItDota.interval);
        FaceItDota.intervalCount = 0;
    }
}

window.addEventListener('click', function(e) {
    FaceItDota.init();
});