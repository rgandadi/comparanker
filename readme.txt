1) Mongo Db setup

00tournaments.json
01Beverages.json
01CricketPlayers.json
01movies.json
01OnlineRetailers.json
01policies.json
01TechStacks.json
01weekendPlans.json

02GenerateTestGames.json
03UpdateGameAttributes.js
04newGame.js

05AssignRanking.json
06ranking.json
07ModifyNoOfGames.json

in mongodb, create database 
name= Hackit
collections name = testData

load("mongoScripts/updateGameAttributes.js");
updateGamesStuffs();  -- runs as a batch process effectively 


2)

prerequizite Install Node.js


Raghavendras-MacBook-Air:hackathon gragtrix$ cd /Users/gragtrix/Desktop/hackathon 
Raghavendras-MacBook-Air:hackathon gragtrix$ npm install
-bash: npm: command not found
Raghavendras-MacBook-Air:hackathon gragtrix$ npm install
npm WARN package.json hackathon@0.1.0 No repository field.
 
> bson@0.1.4 install /Users/gragtrix/Desktop/hackathon/node_modules/mongodb/node_modules/bson
> node-gyp rebuild || (exit 0)

\.............

jade@0.27.7 node_modules/jade
├── commander@0.6.1
├── mkdirp@0.3.5
└── coffee-script@1.4.0

express@3.4.4 node_modules/express
├── methods@0.1.0
├── cookie-signature@1.0.1
├── range-parser@0.0.4
├── fresh@0.2.0
├── buffer-crc32@0.2.1
├── cookie@0.1.0
├── mkdirp@0.3.5
├── debug@2.1.3 (ms@0.7.0)
├── commander@1.3.2 (keypress@0.1.0)
├── send@0.1.4 (mime@1.2.11)
└── connect@2.11.0 (methods@0.0.1, uid2@0.0.3, pause@0.0.1, raw-body@0.0.3, bytes@0.2.1, qs@0.6.5, negotiator@0.3.0, multiparty@2.2.0)

mongodb@1.1.8 node_modules/mongodb
└── bson@0.1.4
Raghavendras-MacBook-Air:hackathon gragtrix$ 
Raghavendras-MacBook-Air:hackathon gragtrix$ 


Raghavendras-MacBook-Air:hackathon gragtrix$ node app.js
connect.multipart() will be removed in connect 3.0
visit https://github.com/senchalabs/connect/wiki/Connect-3.0 for alternatives
connect.limit() will be removed in connect 3.0
Express server listening on port 4711 in development mode
Connected to 'Hackit' database






