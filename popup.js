let summarize = document.getElementById("summarize");
let highlight = document.getElementById("highlight");

// When the button is clicked, inject setPageBackgroundColor into current page
summarize.addEventListener("click", async () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log('the id is : ',tabs[0].id,' the url is ',tabs[0].url);
    chrome.tabs.sendMessage(tabs[0].id, {action: "Summarize", url: tabs[0].url});
    window.close();
  });
});

highlight.addEventListener("click",async () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "Highlight"});
    window.close();
  });
});