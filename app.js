const Web3 = require('web3');
const contractAbi = require("./contractAbi");
const MARKETPLACE_CONTRACT_ADDRESS = "0x19A8Ed4860007A66805782Ed7E0BeD4E44fC6717"

const web3 = new Web3(Web3.givenProvider || "wss://mainnet.infura.io/_ws");
const marketPlaceContract = 
 	new web3.eth.Contract(contractAbi.abi, MARKETPLACE_CONTRACT_ADDRESS);

marketPlaceContract.events.OrderCreated({}, function(err, event){
	console.log('Order Created !');
	console.log('Err: ', err);
	console.log('Event: ', event );
});

marketPlaceContract.events.OrderSuccessful({}, function(err, event){
	console.log('OrderSuccessful !');
	console.log('Err: ', err);
	console.log('Event: ', event );
});


marketPlaceContract.events.OrderCancelled({}, function(err, event){
	console.log('OrderCancelled !');
	console.log('Err: ', err);
	console.log('Event: ', event );
});


var subscription = web3.eth.subscribe('logs', {
    address: MARKETPLACE_CONTRACT_ADDRESS,
    topics: []
}, function(error, result){
    if (!error)
        console.log(result);
})
.on("data", function(log){
    console.log(log);
})
.on("changed", function(log){
		console.log(log);
});
