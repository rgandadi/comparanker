db.getCollection('testData').distinct("tournamentId").forEach( function(myDoc) {

var tournamentId = myDoc;

var players =  db.getCollection('testData').find(
  {
  	$query:{ "type":"players",
    		"tournamentId":tournamentId,
    },
    $orderby: { noOfGames : 1 } 
  }
 );
  
 var numberOfPlayers = players.length(); 
 
 if(numberOfPlayers > 0){
 
 var loadFactor = .8 
 
 var p2Index =  Math.floor(Math.random() * numberOfPlayers * loadFactor) + 1;
 var p1 = players[0].playerId;
 var p2 =  players[p2Index].playerId;

 var winner = p1;   
     if(Math.random() > 0.3){
        winner = p2;
     }
   
  
 db.testData.insert( 
 		{ 
 			"type" : "games", 
 			"tournamentId":tournamentId,
 			"player1":NumberInt(p1),
 			"player2":NumberInt(p2),
 			"result":NumberInt(winner), 
 			userId:"anonymous"
 		} )
 
 
 }
 
 
});
  
  
