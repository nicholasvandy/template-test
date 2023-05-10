// Get Quotes from API
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];


// loading function
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
    //console.log('loading');
}

// hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// new quote function
function newQuote(){
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // check if the author field is blank and replace it with quote unknown
    if (!quote.author){
        authorText.text = "Unknown"
    }
    else {
        authorText.textContent=quote.author;

    }
    // check the quote length to determine the styling
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    //Set quote, hide loader
    quoteText.textContent=quote.text;
    complete();
}

async function getQuote(){
    loading();
    const apiURL='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();

    } catch(error){
        alert()
        //catch error received
    }

}



// tweet a quote
function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

// Event listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load


//loading();
//complete();
getQuote();