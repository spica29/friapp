function adopt(){
	//first delete all elements in section
	var article = document.getElementById("dogArticle");
	var h2 = document.createElement("h2");
	h2.innerHTML = "You have adopted Tina";
	article.appendChild(h2);
	setTimeout(
        function(){
            window.location = "index.html";
        },
    1500);
}