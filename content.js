// Add functionality to highlight important parts of text
// use fetch instead of xml http request
// figure out how to inject script in more aesthetic way
// add code to handle incorrect input cases

let xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
        let index=this.responseText.search("article_text");
        let summary = this.responseText.substring(13,index-4);
        console.log('Response : ',summary);
        const content = `
        <div class="eve-summary">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <div id="id01" class="w3-modal">
                <div class="w3-modal-content">
                    <div class="w3-container">
                        <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-display-topright">&times;</span>
                        <h1> Text Summary </h1>
                        <p style="margin-bottom: 2em">${summary}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        let newDiv = document.createElement("div");
        newDiv.innerHTML = content;
        document.querySelector("body").prepend(newDiv);
        document.getElementById('id01').style.display='block';
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