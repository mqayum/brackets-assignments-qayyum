var createElement = function (name, id) {
    var newElement = document.createElement(name);
    newElement.setAttribute("id", id);
    return newElement;
};
var quote = document.getElementById("quote") || createElement("p", "quote");
var author = document.getElementById("author") || createElement("p", "author");
var body = document.getElementsByTagName("body")[0];
var fonts = ['Acme', 'BebasNeue', 'Caveat', 'Cookie', 'DancingScript', 'GreatVibes', 'IndieFlower', 'IslandMoments', 'Kalam', 'Lato', 'Lobster', 'Orbitron', 'Pacifico', 'Righteous', 'RubikBubbles', 'Sacramento', 'Satisfy', 'SpecialElite', 'SquarePeg', 'Updock', 'Whisper'];
var categories = ['amazing', 'art', 'attitude', 'beauty', 'best', 'change', 'courage', 'death', 'dreams', 'education', 'experience', 'failure', 'family', 'famous', 'forgiveness', 'friendship', 'future', 'good', 'great', 'happiness', 'health', 'hope', 'imagination', 'inspirational', 'learning', 'life', 'love', 'mom', 'money', 'morning', 'success'];
;
;
var getQuotation = function (url) {
    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': 'Vs+S8C7kMegBlpN0hx+JtQ==iGgOnhyDXswshqZe'
        }
    }).then(function (response) {
        response.json().then(function (quo) {
            if (quo[0].quote.length < 150)
                quote.innerHTML = quo[0].quote;
            else {
                quote.innerHTML = quo[0].quote;
                quote.style.fontSize = "30px";
            }
            author.innerHTML = "\"".concat(quo[0].author, "\"");
        });
    });
};
var getBackground = function (url) {
    fetch(url, {
        headers: {
            'Accept': 'image/jpg',
            'X-Api-Key': 'Vs+S8C7kMegBlpN0hx+JtQ==iGgOnhyDXswshqZe'
        }
    }).then(function (response) {
        var reader = new FileReader();
        response.blob().then(function (data) {
            reader.readAsDataURL(data);
            reader.onload = function () {
                var dataUrl = reader.result;
                body.style.backgroundImage = "url(" + dataUrl + ")";
            };
        });
    });
};
var generateNext = function () {
    var catIndex = Math.floor(Math.random() * categories.length);
    var quoteUrl = "https://api.api-ninjas.com/v1/quotes?category=".concat(categories[catIndex]);
    var imgUrl = "https://api.api-ninjas.com/v1/randomimage?category=nature&width=1280&height=720";
    try {
        getQuotation(quoteUrl);
        getBackground(imgUrl);
    }
    catch (err) {
        alert("Error with the API Call");
    }
};
generateNext();
