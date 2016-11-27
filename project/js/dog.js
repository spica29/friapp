
function openDogPage() {
	var dogName = document.getElementById("nameOfDog").innerHTML;
	console.log(dogName);
	window.location = "dog.html";
	loadDog(dogName);
}

function loadDog(dogName){
	var dogSection = document.getElementById("dogSection");
	for (var i = 0; i < data_json; i++) {
		if (data_json[i].name == dogName) 
		{
			loadOne(data_json[i], dogSection);
		}
	};
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