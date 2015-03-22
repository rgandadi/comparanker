var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('10.67.207.166', 27017, {auto_reconnect: true});
db = new Db('Hackit', server, {safe: true});


db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'Hackit' database");
        db.collection('testData', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'testData' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

function refreshData(){
  	db.collection('testData').distinct("tournamentId", function(err, tournamentIds) {
  		
  		for(var index = 0; index < tournamentIds.length; index++) {
			var tournamentId = tournamentIds[index];
			
			db.collection('testData').count({
				"type":"players", 
				"tournamentId": tournamentId
			}, function(error, numberOfPlayers) {
				for(var i = 1; i<=numberOfPlayers; i++) {
				    db.collection('testData').count({
				      	$or : [
				          	{player1:i},
				          	{player2:i}
				        ],
				      	"type":"games",
				      	"tournamentId":tournamentId
				    }, function(error, noOfGames) {
					    db.collection('testData').count({
					    	result: i, 
					    	"type": "games",
					    	"tournamentId": tournamentId 
					    }, function(error, noOfWins) {
						    db.collection('testData').update({ 
						        "type":"players",
						        "tournamentId":tournamentId,
						        "playerId":i
						    }, {
						        $set:{
						        	"noOfGames": NumberInt(noOfGames),
						            "noOfWins": NumberInt(noOfWins),
						          	"score" : NumberInt(noOfWins*100000/noOfGames)
						        }
						    },
						    { 
						    	upsert: false 
						    });
					    });
				    }); 
				}
			});
  		}
  	});
}

exports.fetch = function(req, res) {

	var tournamentId = req.query.tournamentId || 'movies';

// console.log('******** FETCH tournamentId: ', tournamentId);

	// refreshData();
	
	db.collection('testData', function(err, collection) {
        collection.find({ 
        	$query:{ 
        		"type": "players",
		    	"tournamentId": tournamentId,
		    },
		    $orderby: { 
		    	noOfGames : 1 
		    }
    	}).toArray(function(err, players) {

    		collection.distinct("tournamentId", function(err, tournamentIds) {
				var numberOfPlayers = players.length; 
				var loadFactor = .8;
				var p2Index = Math.floor(Math.random() * numberOfPlayers * loadFactor) + 1;

				res.render('home', {
					player1: players[0],
					player2: players[p2Index],
					tournamentId: tournamentId,
					tournamentIds: tournamentIds
				});
    		});
		});
    });
};

exports.update = function(req, res) {
    db.collection('testData', function(err, collection) {

    	var player1 = req.query.player1,
    		player2 = req.query.player2,
    		result = req.query.result,
    		tournamentId = req.query.tournamentId;

// console.log('tournamentId - update: ', req);
console.log(player1, player2, result);

		collection.insert({ 
		 	"type": "games", 
		 	"tournamentId": tournamentId,
		 	"player1": parseInt(player1),
		 	"player2": parseInt(player2),
		 	"result": parseInt(result),
		 	"userId": "anonymous"
		}, function(err, result) {
			res.redirect('/?tournamentId='+tournamentId);
		});
    });
};

exports.comparisonResult = function(req, res) {

	var tournamentId = req.query.tournamentId;

	db.collection('testData', function(err, collection) {

		collection.find({
			$query:{ 
				"type": "players",
				"tournamentId": tournamentId
			},
			$orderby: { 
				rank : 1 
			} 
		}).toArray(function(err, players) {
			var playerNames = [],
				index = 0,
				win = [],
				loss = [],
				noOfGames = [],
				score = [],
				rank = [];

			for (index = 0; index<players.length; index++) {
				playerNames.push(players[index].name);
				win.push(players[index].noOfWins);
				rank.push(players[index].rank);
				score.push(players[index].score);
				noOfGames.push(players[index].noOfGames);
				loss.push(players[index].noOfGames - players[index].noOfWins);
			}

			collection.distinct("tournamentId", function(err, tournamentIds) {
				res.render('result', {
					playerNames: JSON.stringify(playerNames),
					win: JSON.stringify(win),
					noOfGames: JSON.stringify(noOfGames),
					loss: JSON.stringify(loss),
					tournamentIds: tournamentIds,
					tournamentId: tournamentId,
					score: JSON.stringify(score),
					rank: JSON.stringify(rank)
				});
			});
		});
	});
};