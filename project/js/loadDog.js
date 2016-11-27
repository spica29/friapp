window.onload = function(){
	loadAll();
}


function loadOne(data, section){
	//making article
	var article = document.createElement("article");
	article.className = "dog";
	//picture
	var img = document.createElement("img");
	img.src = data.image;
	img.alt = data.name + " dog";
	article.appendChild(img);

	var div = document.createElement("div");
	div.className = "dogInfo";

	//name of dog
	var h3 = document.createElement("h3");
	h3.innerHTML = data.name;
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
	dogAge.innerHTML = data.age;
	div.appendChild(dogAge);

	//size
	var dogSize = document.createElement("p");
	dogSize.className = "size";
	dogSize.innerHTML = data.size;
	div.appendChild(dogSize);
/*
	var vrijemeObjave = document.createElement("p");
	vrijemeObjave.className = "vrijeme";
	//console.log(podatak.vrijeme)
	var vr = new Date(podatak.vrijeme);
	//console.log(vr);
	vrijemeObjave.innerHTML = podatak.vrijeme;
	article.appendChild(vrijemeObjave);*/
/*
	//dodavanje teksta
	var p = document.createElement("p");
	p.innerHTML = podatak.tekst;
	article.appendChild(p);*/
/*	for (var i = 0; i < data.goodWith.length; i++) {
		var dogAtt = document.createElement("p");
		dogAtt.className = "att";
		if(data.goodWith[i] == true)
		{ 
			dogSize.dogAtt = data.goodWith[i];
			article.appendChild(dogAtt);
		}
		dogSize.dogAtt = data.goodWith[i];
		article.appendChild(dogAtt);
	};*/

	article.appendChild(div);
	section.appendChild(article);
}

function loadAll(){
	var section = document.getElementById('section');
	var h2 = document.createElement("h2");
	h2.innerHTML = "Our dogs";
	h2.className = "OurDogs";
	section.appendChild(h2);
	for (var i = 0; i < data_json.length; i++) {
		loadOne(data_json[i], section);
	};
}

var data_json = [
	{
		"name": "Jovana",
		"image": "images/jovana.jpg",
		"breed": "Mix",
		"adopted": "no",
		"color": "beige",
		"age": "not known",
		"size": 10,
		"gender": "female",
		"goodWith": [{"children":true, "dogs":true, "cats": false, "foreigners": false}]
	}, {
		"name": "Paulina",
		"image": "images/paulina.jpg",
		"adopted": "no",
		"breed": "Mix",
		"color": "black",
		"age": "1 year",
		"size": 15,
		"gender": "female",
		"goodWith": [{"children":true, "dogs":true, "cats": true, "foreigners": true}]
	}, {
		"name": "Stella",
		"image": "images/stella.jpg",
		"adopted": "no",
		"breed": "Mix",
		"color": "beige",
		"age": "3 years",
		"size": 10,
		"gender": "female",
		"goodWith": [{"children":true, "dogs":true, "cats": false, "foreigners": true}]
	}, {
		"name": "Tina",
		"image": "images/tina.jpg",
		"adopted": "no",
		"breed": "Mix",
		"color": "beige",
		"age": "3 years",
		"size": 15,
		"gender": "female",
		"goodWith": [{"children":true, "dogs":false, "cats": false, "foreigners": true}]
	}]