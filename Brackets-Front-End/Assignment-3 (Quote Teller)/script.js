const quote = document.getElementById("quote");
const author = document.getElementById("author");
const body = document.getElementsByTagName("body")[0];
const fonts = ['Acme','BebasNeue','Caveat','Cookie','DancingScript','GreatVibes','IndieFlower','IslandMoments','Kalam','Lato','Lobster','Orbitron','Pacifico','Righteous','RubikBubbles','Sacramento','Satisfy','SpecialElite','SquarePeg','Updock','Whisper'];
const categories = ['amazing', 'art', 'attitude', 'beauty', 'best', 'change', 'cool', 'courage', 'death', 'dreams', 'education', 'experience', 'failure', 'faith', 'family', 'famous', 'fitness', 'forgiveness', 'friendship', 'future', 'god', 'good', 'great', 'happiness', 'health', 'hope', 'imagination', 'inspirational', 'learning', 'life', 'love', 'mom', 'money', 'morning', 'success'];

const getQuotation = async (url) => {
    try{
        let response = await fetch(url,{
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'Vs+S8C7kMegBlpN0hx+JtQ==iGgOnhyDXswshqZe'
            }
        })
        let quo = await response.json();
        if(quo[0].quote.length < 150)
            quote.innerHTML = quo[0].quote;
        else{
            quote.innerHTML = quo[0].quote;
            quote.style.fontSize = "30px";
        }
        
        author.innerHTML = `"${quo[0].author}"`;

        //laoding random font
        let randIndex = Math.floor(Math.random() * fonts.length);
        const font = new FontFace(fonts[randIndex], "url(./fonts/"+fonts[randIndex]+".ttf)");
        
        document.fonts.add(font);
        font.load().then((data)=>{
            quote.style.fontFamily = data.family;
        }).catch((err)=>{
            console.log(err);
        });
        
    }
    catch(err){
        console.log(err);
    }
    
}

const getBackground = async (url) => {
    try{
        let response = await fetch(url,{
            headers: {
                'Accept': 'image/jpg',
                'X-Api-Key': 'Vs+S8C7kMegBlpN0hx+JtQ==iGgOnhyDXswshqZe'
            }
        })
        let reader = new FileReader();
        reader.readAsDataURL(await response.blob());
        reader.onload = () => {
            body.style.backgroundImage = "url("+reader.result+")";
        }
    }
    catch(err){
        console.log(err);
    }
    
}


const generateNext = () => {

    const catIndex = Math.floor(Math.random() * categories.length);

    let quoteUrl = `https://api.api-ninjas.com/v1/quotes?category=${categories[catIndex]}`;
    let imgUrl = `https://api.api-ninjas.com/v1/randomimage?category=nature&width=1280&height=720`
    getQuotation(quoteUrl);
    getBackground(imgUrl);
        
};

generateNext();