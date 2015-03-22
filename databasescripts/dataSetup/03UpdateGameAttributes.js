db.getCollection('testData').distinct("tournamentId").forEach( function(myDoc) {

var tournamentId = myDoc;
var numberOfPlayers =  db.getCollection('testData').count({"type":"players", "tournamentId":tournamentId});


for(var i = 1; i<=numberOfPlayers; i++){
	var noOfGames = db.getCollection('testData').count({
		$or : [
		    {player1:i},
		    {player2:i}
		   ],
		"type":"games",
		"tournamentId":tournamentId
	});	
	var noOfWins = db.getCollection('testData').count({result:i, "type":"games","tournamentId":tournamentId });


	db.getCollection('testData').update(
   		{ 
   	      "type":"players",
  	      "tournamentId":tournamentId,
 	      "playerId":i
	    },
	    {
	     $set:{
	      "noOfGames": NumberInt(noOfGames),
          "noOfWins": NumberInt(noOfWins),
	      "score" : NumberInt(noOfWins*100000/noOfGames),
	      }
	    },
 	   { upsert: false }
	);

}

});


db.testData.find();