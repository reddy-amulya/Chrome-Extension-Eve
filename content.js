// Add functionality to highlight important parts of text
// use fetch instead of xml http request
// figure out how to inject script in more aesthetic way
// add code to handle incorrect input cases

let xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
        let index=this.responseText.search("article_text")
        document.body.innerHTML=this.responseText.substring(13,index-4);
    }
});

xhr.open("POST", "https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-url/");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-rapidapi-key", "token");
xhr.setRequestHeader("x-rapidapi-host", "tldrthis.p.rapidapi.com");


function summarize(url){
    const data = JSON.stringify({
        "url": url,
        "min_length": 100,
        "max_length": 300,
        "is_detailed": false
    });
    xhr.send(data); 
}

function highlight() {

}

chrome.runtime.onMessage.addListener(function(message){
    if(message.action === 'Summarize') {
        console.log('the url is : ',message.url)
        summarize(message.url);
    }
    else if(message.action === "Highlight") {
        highlight();
    }
});