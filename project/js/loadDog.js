window.onload = function(){
	var sPath = window.location.pathname;
	var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
	if (sPage == "ourdogs.html") loadAll();
	else loadDog();
}

function loadOne(data, section){
	//making article
	var article = document.createElement("article");
	article.className = "dog";
	//picture
	var img = document.createElement("img");
	img.src = data.image;
	img.alt = data.name + " dog";
	img.addEventListener("click", openDogPage);
	article.appendChild(img);

	var div = document.createElement("div");
	div.className = "dogInfo";

	//name of dog
	var h3 = document.createElement("h3");
	h3.innerHTML = data.name;
	h3.id = "nameOfDog";
	div.appendChild(h3);

	//breed
	var dogBreed = document.createElement("p");
	dogBreed.className = "breed";
	dogBreed.innerHTML = data.breed;
	div.appendChild(dogBreed);

	//gender
	var dogGender = document.createElement("p");
	dogGender.className = "gender";
	dogGender.innerHTML = data.gender;
	div.appendChild(dogGender);

	//color
	var dogColor = document.createElement("p");
	dogColor.className = "color";
	dogColor.innerHTML = data.color;
	div.appendChild(dogColor);

	//age
	var dogAge = document.createElement("p");
	dogAge.className = "age";
	if(data.age == 1) dogAge.innerHTML = data.age + " year";
	else dogAge.innerHTML = data.age + " years";
	div.appendChild(dogAge);

	//size
	var dogSize = document.createElement("p");
	dogSize.className = "size";
	dogSize.innerHTML = data.size + " kg";
	div.appendChild(dogSize);

	article.appendChild(div);
	section.appendChild(article);
}

function search(){
	//first delete all elements in section
	var section = document.getElementsByTagName("section");
	for(var i = 0; i < section.length; i++){
		while(section[i].firstChild)
			section[i].removeChild(section[i].firstChild);
	}
	//appending new
	var section = document.getElementById('section');
	var h2 = document.createElement("h2");
	h2.innerHTML = "Our dogs";
	h2.className = "OurDogs";
	section.appendChild(h2);

	//checking if adopted
	var adoptedYesel = document.getElementsByName('yes')[0];
	var adoptedNoel = document.getElementsByName('no')[0];
	
	//checking gender
	var maleEl = document.getElementsByName('male')[0];
	var femaleEl = document.getElementsByName('female')[0];
	for (var i = 0; i < data_json.length; i++) {
		var render = false;

		var adoptedData = data_json[i].adopted;

		//printing adopted dogs
		if(!adoptedYesel.checked && !adoptedNoel.checked) {render = true;}
		else if(adoptedYesel.checked && adoptedNoel.checked) { render = true; }
		else {
			console.log(adoptedData);
			if (adoptedYesel.checked && adoptedData == "yes") 
				render = true;
			else if(adoptedNoel.checked && adoptedData == "no") 
				render = true;
			else render = false;
		}

		if (!render) continue;

		//gender
		if(!maleEl.checked && !femaleEl.checked) {render = true;}
		else if(maleEl.checked && femaleEl.checked) { render = true; }
		else {
			if (maleEl.checked && data_json[i].gender == "male") render = true;
			else if(femaleEl.checked && data_json[i].gender == "female") render = true;
				else render = false;
		}
		if (!render) continue;

		//color
		var colorEl = document.getElementById("color");
		var color = colorEl.options[colorEl.selectedIndex].text;
		if(color == "All") render = true;
		else if(color == data_json[i].color) render = true;
		else render = false;

		if(!render) continue;

		//age
		var ageFrom = document.getElementById("fromAge").value;
		var ageTo = document.getElementById("toAge").value;
		
		if(ageFrom == "" && ageTo == "") render = true;
		else if (ageFrom <= data_json[i].age && ageTo == "") render = true;
		else if (ageFrom == "" && ageTo >= data_json[i].age) render = true;
		else if (ageFrom <= data_json[i].age && ageTo >= data_json[i].age) render = true;
		else render = false;

		if(!render) continue;

		//size
		var sizeFrom = document.getElementById("fromSize").value;
		var sizeTo = document.getElementById("toSize").value;		

		if(sizeFrom == "" && sizeTo == "") render = true;
		else if (sizeFrom <= data_json[i].size && sizeTo == "") render = true;
		else if (sizeFrom == "" && sizeTo >= data_json[i].size) render = true;
		else if (sizeFrom <= data_json[i].size && sizeTo >= data_json[i].size) render = true;
		else render = false;

		if(!render) continue;

		loadOne(data_json[i], section);
	};
}

var dogName = null;

function loadAll(){
	var section = document.getElementById('section');
	/*var h2 = document.createElement("h2");
	h2.innerHTML = "Our dogs";
	h2.className = "OurDogs";
	section.appendChild(h2);*/
	for (var i = 0; i < data_json.length; i++) {
		loadOne(data_json[i], section);
	};
}


function openDogPage() {
	dogName = document.getElementById("nameOfDog").innerHTML;
	document.cookie = dogName;
	/*var newDogWindow = window.open("dog.html");
	newDogWindow.dogName = dogName;
	console.lod(newDogWindow.dogName);
	newDogWindow.init();*/

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			var result = xhr.responseText;
		}
	}

	xhr.open("GET", "dog.html?name=" + dogName);
	xhr.send(null);
}

function loadDog(){
	var NAME = document.cookie;
	console.log("Ispis " + NAME);
	var query = location.search.substring(1);
	var parameters = {};
	var keyValues = query.split(/&/);
	for (var keyValue in keyValues) {
	    var keyValuePairs = keyValue.split(/=/);
	    var key = keyValuePairs[0];
	    var value = keyValuePairs[1];
	    parameters[key] = value;
	}

	console.log(parameters['name']);

	var dogSection = document.getElementById("dogSection");
	for (var i = 0; i < data_json; i++) {
		if (data_json[i].name == dogName) 
		{
			loadOne(data_json[i], dogSection);
		}
	};
}

var data_json = [
	{
		"name": "Jovana",
		"image": "images/jovana.jpg",
		"breed": "Mix",
		"adopted": "no",
		"color": "beige",
		"age": 5,
		"size": 10,
		"gender": "female"
	}, {
		"name": "Paulina",
		"image": "images/paulina.jpg",
		"adopted": "no",
		"breed": "Mix",
		"color": "black",
		"age": 1,
		"size": 15,
		"gender": "female"
	}, {
		"name": "Stella",
		"image": "images/stella.jpg",
		"adopted": "no",
		"breed": "Mix",
		"color": "beige",
		"age": 3,
		"size": 10,
		"gender": "female"
	}, {
		"name": "Tina",
		"image": "images/tina.jpg",
		"adopted": "yes",
		"breed": "Mix",
		"color": "Mix",
		"age": 3,
		"size": 15,
		"gender": "male"
	}, {
		"name": "Donna",
		"image": "images/stella.jpg",
		"adopted": "no",
		"breed": "Mix",
		"color": "beige",
		"age": 5,
		"size": 10,
		"gender": "female"
	}, {
		"name": "Rex",
		"image": "images/tina.jpg",
		"adopted": "no",
		"breed": "Mix",
		"color": "beige",
		"age": 10,
		"size": 15,
		"gender": "female"
	}]