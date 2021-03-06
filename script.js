const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Loading Spinner Shown
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Remove Loading Spinner
function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote Fronm API
async function getQuote(){
    showLoadingSpinner();
    // we need to use a proxy URL to make our API call in order to avoid CORS Issue.
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
   try{
       const response = await fetch(proxyUrl + apiUrl);
       const data  = await response.json();
       // If Author is blank, add Unknown
       if(data.quoteAuthor === ''){
        authorText.innerText = 'Unknown';
       }
       else{
        authorText.innerText = data.quoteAuthor;
       }
      // Reduce fontsize for long quotes
       if(data.quoteText.length > 50){
           quoteText.classList.add('long-quote');
       }
       else{
           quoteText.classList.remove('long-quote');
       }
       quoteText.innerText = data.quoteText;
       //Stop Loader, Show Quote
       removeLoadingSpinner();
   }
   catch(error){
        getQuote();
       console.log('whoops, no quote', error);

   }

}
// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners 
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQuote();

