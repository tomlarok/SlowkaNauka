var yes = new Audio("yes.wav");
var no = new Audio("no.wav");



var words = [];
var counter = 0;
var numbers2 = new Array();
var length = 0;
var nr_word = 0;

var IncorrectCounter = 0;
var CorrectCounter = 0;

	Papa.parse("./data/slowka.csv", {
		download: true,
		complete: function(results) {
      		console.log("Finished:", results.data);
          insertToArray(results.data);
		}
  });
var wordsToDraw = [];
var wordsToTranslate = [];
function insertToArray(data) {
  console.log("Start!");
	console.log("Długośc " + data.length);
  for (var i = 0; i < (data.length-1); i++) {

		wordsToDraw.push(data[i][0]);
		wordsToTranslate.push(data[i][1]);
    console.log("Words to Array: "+i+" "+ wordsToDraw[i] + " " + wordsToTranslate[i]);
	}

	 draw();
	 showWord();
}

function showWord(){
	document.getElementById('input-translate').value = "";
	counter ++;

	if (wordsToTranslate[numbers2[counter]] == undefined){
		alert("Koniec słówek ");
		$('.word').html('Koniec słówek <br><button class="myButton" onclick="reload()">Jeszcze raz?</button>  ' );
	} else {
		$('.word').html('Przetłumacz: ' + wordsToTranslate[numbers2[counter]]);
	}

}


function draw(){
	var n = wordsToDraw.length;
	console.log("Liczba n: " + n);

	length = wordsToDraw.length;
	var numbers =  new Array(n);

	// z..
	var k = wordsToDraw.length;
	var output = new Array(n);

	// sprawdz poprawnosc danych wejsciowych
	if (k > n) {
	alert("Nieprawidłowe dane wejściowe");
	}

	// wypełnianie tablicy liczbami 1,2...n
	for (var i=0; i<n; i++) {
	numbers[i] = i; //numbers[i] = i + 1; // od 1 do n
	}

	// losowanie k liczb
	for (var i=0; i<k; i++) {

	// tworzenie losowego indeksu pomiędzy 0 i n - 1
	var r = Math.floor(Math.random()*n);

	// wybieramy element z losowego miejsca
	output.push(numbers[r]);

	// przeniesienia ostatniego elementu do miejsca z którego wzięliśmy
	numbers[r] = numbers[n - 1];

	//zmniejszamy n
	n--;
	}

	for (var y=0; y<=output.length; y++)
	{
	  if(output[output.length-y] != null){
	      numbers2.push(output[output.length-y]);
	  }
	}
	console.log("Wylosowane liczby bez powtórzeń numbers2: " + numbers2);

}


function checkAndDraw(){
	if ((nr_word <= (length -1)) || ((wordsToDraw[drawCounter]) == undefined))
	{
		// get answer from input text
		var answer = document.getElementById('input-translate').value;

		var drawCounter = numbers2[counter]
		// check if answer is correct
		if(answer == wordsToDraw[drawCounter]){
			alert("Odpowiedź poprawna! Odp to: " + wordsToDraw[drawCounter]);
			yes.play();
			CorrectCounter++;
						$('.score-correct').html('Good: '+CorrectCounter);
		} else {
			alert("Odpowiedź zła! Odp to: " + wordsToDraw[drawCounter]);
			no.play();
			IncorrectCounter++;
						$('.score-incorrect').html('Bad: '+IncorrectCounter);
		}

		console.log("Odp to: " + answer + "Licznik: " + nr_word);
		nr_word ++;

		showWord()
	} else {
		alert("Koniec słówek ");
	}

}

function reload(){
  location.reload();
}
