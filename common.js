/**
* Search Same Item srcList
* @param name A  String to be found in the list
* @return Number Item Index(Not exist return -1)
*/
getItemIndex = (name) => {
    for(let i=0; i<srcList.length; i+=1){
      if(srcList[i].getName() === name){
        return i;
      }
    }
  
    return -1;
}

/**
* Add At Sign Function
* @param str A string for checking atsign
* @return str string with atsign
*/
addAtSign = (str) => {
    str = str.trim();
    if(str && str.substr(0, 1) != "@") return "@" + str;
    else return str;
}

// Set Active page Lastest was actived
let lastPage = localStorage.getItem(CURR_ACTIVE_PAGE);
if(lastPage){
    document.querySelector('.' + lastPage).classList.add('active');
    document.getElementById(lastPage).classList.add('active');
}

// Accordion Design Controller
let accordionBtns = document.getElementsByClassName('accordionTitle');

// Accordion Button Event
for(let i=0; i<accordionBtns.length; i+=1){
    accordionBtns[i].addEventListener('click', () => {
        if(accordionBtns[i].classList.contains('active')){
            accordionBtns[i].classList.remove('active');
            document.getElementById(accordionBtns[i].getAttribute('val')).classList.remove('active');
            localStorage.setItem(CURR_ACTIVE_PAGE, '');
        }else{
            document.querySelectorAll('.ui.accordion .title').forEach((e) => e.classList.remove('active'));
            document.querySelectorAll('.ui.accordion .content').forEach((e) => e.classList.remove('active'));
            
            accordionBtns[i].classList.add('active');
            document.getElementById(accordionBtns[i].getAttribute('val')).classList.add('active');
            localStorage.setItem(CURR_ACTIVE_PAGE, accordionBtns[i].getAttribute('val'));
        }
    });
}

// Set Default Current Site
// Set Default Site Textarea Selector
let siteSelector = "document.getElementsByClassName('upload-enabled')[0]";
let currContext = 'https://steemit.com/';

/**
* Set Textarea Selector from chrome tabs
* @param tab chrometab
*/
chrome.tabs.getSelected(null, (tab) => {
  sites.forEach(v => {
    if(tab.url.indexOf(v.site) > -1) {
      currContext = v.context;
      siteSelector = v.textareaSelector;
    }
  });
});