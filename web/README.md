# FaceItDota Browser Extension

A browser extension to display user MMR and favorite positions at the matchroom on faceit.com.

## Description

### What to use it

If you search for matches on faceit.com and join a matchroom, this Extension will show MMR and positions for each player in this room to help the team leader to pick the best player for his team.

### How it works

This extension use a JSON datasource with the player information. You can use it from any target.
The JSON format need to be in this format

```
[
    {"username":"FaceitUsername1","mmr":"1234","positions":"3, 5 (1, 2, 4)"},
    {"username":"FaceitUsername2","mmr":"3900","positions":"5, 4, 3"},
    ...
]
```

## Instruction

### Installation

1. Install the extenstion from

    [https://faceit.deadsec.net](https://faceit.deadsec.net)

2. Open extension settings and set your JSON datasource
3. Goto [faceit.com](https://www.faceit.com) and open a match from the matchhistory to check if the extension works
4. Tip: You need to click somewhere on the website to refresh the data

## Disclaimer

Use the extension and scripts at your own risk, the repository owners and/or contributors are not responsible for any actions taken as a result of installing, setting up or running this extension or scripts. Never share any api keys with other people or store it at publicly available locations.