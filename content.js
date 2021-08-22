// Add functionality to highlight important parts of text
// Add functionality to identify sentiment of text
// add code to handle incorrect input cases

function summarize(url){
    const content = `
        <div class="eve-summary">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <div id="id01" class="w3-modal">
                <div class="w3-modal-content">
                    <div class="w3-container">
                        <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-display-topright">&times;</span>
                        <h1> Text Summary </h1>
                        <div class="spinner-border" style="margin-left:27em" ></div>
                        <p style="margin-bottom: 2em ; color="black" " id="eve-summary"></p>
                    </div>
                </div>
            </div>
        </div>
        `;
    let newDiv = document.createElement("div");
    newDiv.innerHTML = content;
    document.querySelector("body").prepend(newDiv);
    document.getElementById('id01').style.display='block';
    
    fetch("https://flask-serverx.azurewebsites.net/getSummary", {
        "body": JSON.stringify({"url":url}),
        "method": "POST",
        "headers":{
            "Content-Type": "application/json"
        }
    }).then(response=> response.body). then(rb => {
        const reader = rb.getReader();
        // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#example-fetch-stream
        return new ReadableStream({
        start(controller) {
            // The following function handles each data chunk
            function push() {
            // "done" is a Boolean and value a "Uint8Array"
            reader.read().then( ({done, value}) => {
                // If there is no more data to read
                if (done) {
                controller.close();
                return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                push();
            })
            }
            push();
        }
        });
    })
    .then(stream => {
        // Respond with our stream
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
    })
    .then(result => {
        // Do things with result
        console.log(result);
        console.log('Response : ',result);
        document.querySelector(".spinner-border").style.display="none";
        document.querySelector("#eve-summary").innerHTML=result;
  }).catch(e=>console.log('Error : ',e));
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