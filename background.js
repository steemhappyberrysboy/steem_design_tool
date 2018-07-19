// Respond to the click on extension Icon
chrome.browserAction.onClicked.addListener(function (tab) {
    alert('asdf');
    chrome.tabs.executeScript({
        file: 'thirdParty/jquery3.3.1.min.js'
    });
    chrome.tabs.executeScript({
        file: 'thirdParty/semantic.min.js'
    });
});