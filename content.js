// Add functionality to highlight important parts of text
// add code to handle incorrect input cases

function summarize(url){
    var response;
    const data = JSON.stringify({
        "url": url,
        "min_length": 100,
        "max_length": 300,
        "is_detailed": false
    });
    fetch("https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-url/", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "x-rapidapi-key": "token",
            "x-rapidapi-host": "tldrthis.p.rapidapi.com"
        },
	    "body": data
    })
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        console.log(data);
        response = data.summary[0];
        console.log('Response : ',response);
        const content = `
        <div class="eve-summary">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <div id="id01" class="w3-modal">
                <div class="w3-modal-content">
                    <div class="w3-container">
                        <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-display-topright">&times;</span>
                        <h1> Text Summary </h1>
                        <p style="margin-bottom: 2em">${response}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        let newDiv = document.createElement("div");
        newDiv.innerHTML = content;
        document.querySelector("body").prepend(newDiv);
        document.getElementById('id01').style.display='block';
    });
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