const createElement = (name:string, id:string):HTMLElement => {
    let newElement:HTMLElement = document.createElement(name);
    newElement.setAttribute("id", id);
    return newElement;
}

const quote:HTMLElement = document.getElementById("quote") || createElement("p","quote") ;
const author:HTMLElement = document.getElementById("author") || createElement("p","author");
const body:HTMLElement = document.getElementsByTagName("body")[0];

const fonts:string[] = ['Acme','BebasNeue','Caveat','Cookie','DancingScript','GreatVibes','IndieFlower','IslandMoments','Kalam','Lato','Lobster','Orbitron','Pacifico','Righteous','RubikBubbles','Sacramento','Satisfy','SpecialElite','SquarePeg','Updock','Whisper'];
const categories:string[] = ['amazing', 'art', 'attitude', 'beauty', 'best', 'change', 'courage', 'death', 'dreams', 'education', 'experience', 'failure', 'family', 'famous', 'forgiveness', 'friendship', 'future', 'good', 'great', 'happiness', 'health', 'hope', 'imagination', 'inspirational', 'learning', 'life', 'love', 'mom', 'money', 'morning', 'success'];

const getQuotation = async (url:string):Promise<void> => {
    try{
        let response:Response = await fetch(url,{
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'Vs+S8C7kMegBlpN0hx+JtQ==iGgOnhyDXswshqZe'
            }
        })
        let quo:JSON = await response.json();
        console.log(quo);
        
        if(quo[0].quote.length < 150)
            quote.innerHTML = quo[0].quote;
        else{
            quote.innerHTML = quo[0].quote;
            quote.style.fontSize = "30px";
        }
        
        author.innerHTML = `"${quo[0].author}"`;

        //laoding random font
        let randIndex:number = Math.floor(Math.random() * fonts.length);
        const font:FontFace = new FontFace(fonts[randIndex], "url(./fonts/"+fonts[randIndex]+".ttf)");
        
        document.fonts.add(font);
        font.load().then((data:FontFace)=>{
            quote.style.fontFamily = data.family;
        }).catch((err:any)=>{
            console.log(err);
        });
        
    }
    catch(err:any){
        console.log(err);
    }
    
}

const getBackground = async (url:string):Promise<void> => {
    try{
        let response:Response = await fetch(url,{
            headers: {
                'Accept': 'image/jpg',
                'X-Api-Key': 'Vs+S8C7kMegBlpN0hx+JtQ==iGgOnhyDXswshqZe'
            }
        })
        let reader:FileReader = new FileReader();
        reader.readAsDataURL(await response.blob());
        reader.onload = () => {
            body.style.backgroundImage = "url("+reader.result+")";
        }
    }
    catch(err:any){
        console.log(err);
    }
    
}


const generateNext = ():void => {

    const catIndex:number = Math.floor(Math.random() * categories.length);

    let quoteUrl = `https://api.api-ninjas.com/v1/quotes?category=${categories[catIndex]}`;
    let imgUrl = `https://api.api-ninjas.com/v1/randomimage?category=nature&width=1280&height=720`
    try{
        getQuotation(quoteUrl);
        getBackground(imgUrl);
    }
    catch(err:any){
        alert("Error with the API Call")
    }
    
        
};

generateNext();
