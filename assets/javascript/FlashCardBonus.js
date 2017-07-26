var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var request = require("request");
var userReply;

var cardType = process.argv[2];
if (cardType === undefined)
{
	console.log("Usage: node FlashCardBonus <basic or cloze>");
	return;
}

function processCard(category)
{
	console.log("Entering processCard");
	var url = "";

	switch(category)
	{
		case "American History":
			url = "http://jservice.io/api/clues?category=780";
			//http://jservice.io/api/clues?category=25
		    break;
		case "Food":
			url = "http://jservice.io/api/clues?category=49";
			//http://jservice.io/api/clues?category=25
		    break;
		case "Science":
			url = "http://jservice.io/api/clues?category=25";
		    break;
		case "Sports":
			url = "http://jservice.io/api/clues?category=42";
		    break;
		case "U.S. Cities":
			url = "http://jservice.io/api/clues?category=7";
		    break;
		case "U.S. History":
			url = "http://jservice.io/api/clues?category=50";
		    break;
		default:
		    console.log("Unknown category")
	}
	console.log("Query URL: " + url);
	if (url != "")
	{
		// Run the request function...
		// The request function takes in a URL then returns three arguments:
		// 1. It provides an error if one exists.
		// 2. It provides a response (usually that the request was successful)
		// 3. It provides the actual body text from the website <---- what actually matters.
		request(url, function(error, response, body) 
		{
  			// If the request was successful...
  			if (!error && response.statusCode === 200) 
  			{
  				// Then log the body from the site!
    			//console.log(body);
    			var data = JSON.parse(body);
    			console.log(data);
  				var len = data.length;
        		console.log("data.length: " + len);
        		cardType = cardType.toLowerCase();
        		console.log("Card type: " + cardType);
				if (cardType === "basic")
				{
					//randomly create 10 flashcards and display them if array
					//size is greater than 10.
					var cnt = 0;
					if (data.length > 10)
					{
						while (true)
						{
							var index = Math.floor(Math.random() * data.length);
							//console.log(index);
							var question = data[index].question;
							//console.log(question);
							var answer = data[index].answer;
							//console.log(answer);
							if (question != "" && answer != "")
							{
								var basicCard = new BasicCard(question, answer);
								basicCard.displayBasicCard();
								cnt++;
								if (cnt === 10)
								{
									break;
								}
							}
						}
					}
					else //if less than 10
					{
						for (var i = 0; i < len; i++)
						{
							// console.log(data[i].question);
							// console.log(data[i].answer);
							var basicCard = new BasicCard(data[i].question, data[i].answer);
							basicCard.displayBasicCard();
						}
					}
				} //if card type is cloze
				else
				{
					//randomly create 10 flashcards and display them if array
					//size is greater than 10.
					var cnt = 0;
					if (data.length > 10)
					{
						while (true)
						{
							var index = Math.floor(Math.random() * data.length);
							//console.log(index);
							var question = data[index].question;
							//console.log(question);
							var answer = data[index].answer;
							//console.log(answer);
							if (question != "" && answer != "")
							{
								var clozeCard = new ClozeCard(question, answer);
								clozeCard.displayClozeCard();
								cnt++;
								if (cnt === 10)
								{
									break;
								}
							}
						}
					}
					else //if less than 10
					{
						for (var i = 0; i < len; i++)
						{
							// console.log(data[i].question);
							// console.log(data[i].answer);
							var clozeCard = new ClozeCard(data[i].question, data[i].answer);
							clozeCard.displayClozeCard();
						}
					}
				}	
  			}
		});
	}
}

var getCards = function()
{
	inquirer.prompt({// Here we give the user a list to choose from.
    	type: "list",
    	message: "Which category do you choose?",
    	choices: ["American History", "Food", "Science", "Sports", "U.S. Cities", "U.S. History"],
    	name: "category"
	}).then(function(response) {
		var category = response.category;
		console.log("category: " + category);
		processCard(category);
	});
}

getCards();

