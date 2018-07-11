// Global Vars
const STORAGE_IMAGE_LIST = 'underBarList';      // localstorage imagelist key
const STORAGE_USER_LIST = 'userShortcutList';   // localstorage user Shortcut key

// Steem Condensor Site List
const sites = [
  {
    site:"steemit.com/",
    context:"https://steemit.com/",
    textareaSelector:"document.getElementsByClassName('upload-enabled')[0]"
  },
  {
    site:"steemkr.com/",
    context:"https://steemkr.com/",
    textareaSelector:"document.getElementsByName('body')[0]"
  },
  {
    site:"busy.org/",
    context:"https://busy.org/",
    textareaSelector:"document.getElementById('body')"
  }
];


// ================== Image/HTML Manager ==================

/**
* Source Class
*/
class Source {
  constructor(name, isImage, src) {
    this.name = name;
    this.isImage = isImage;
    this.src = src;
  }
  getName(){
    return this.name;
  }
  getHtmlSrc(){
    return this.isImage ? '<img style="margin-top:10px;" src="' + this.src + '" />' : this.src;
  }
  getSrc(){
    return this.src;
  }
  setJSONString(str){
    let obj = JSON.parse(str);
    this.name = obj.name;
    this.isImage = obj.isImage;
    this.src = obj.src;
  }
}

/**
* Default Image List(for Init)
*/
const defaultSrcList = [
  new Source('Underbar1', true, 'https://ipfs.busy.org/ipfs/QmUKxtLW5JEnqaaAnwiLc9kFK1BqpcMGoFKTF7JLKcvJqy'),
  new Source('Underbar2', true, 'https://steemitimages.com/DQmWMwkX7hHM6cgtdgzbBWyDonN7jPfLzwdj6sH7xfRJnU5/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%B3%84.png'),
  new Source('Underbar3', true, 'https://steemitimages.com/DQmT13qHqTU2Ra6MC8ucFrePXPqF21kQzkr72kedVoxRJLN/%EA%B5%AC%EB%B6%84%EC%84%A0_%EC%9B%94%EA%B3%84%EA%B4%80.png'),
  new Source('Underbar4', true, 'https://steemitimages.com/DQmUhciHBhkYV5Gw8bXe24HRvXNb3j6UMprrSjUUdYpL27N/%EA%B5%AC%EB%B6%84%EC%84%A0_%ED%82%A4%EC%8A%A4%EB%A7%88%ED%81%AC.png'),
  new Source('Underbar5', true, 'https://steemitimages.com/DQmQtzA2N4cygCnJCc39Six8jtwumSwAqYHQGiqtPrurAy8/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%82%98%EB%B9%84.png'),
  new Source('Underbar6', true, 'https://steemitimages.com/DQmb5XLfBycRZQgDY5rE4kwKfVNnrPPwRsAtxPHi9GwbD2M/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%B3%B4%EB%9D%BC%EB%82%98%EB%B9%84.png'),
  new Source('Underbar7', true, 'https://steemitimages.com/DQmRQeSKNvf5L6LcZHufnihnBJSL1CfZ3hEHDcJNuFRPZnu/%EA%B5%AC%EB%B6%84%EC%84%A0_%EA%BD%83.png'),
  new Source('Underbar8', true, 'https://steemitimages.com/DQmUMrT6ntfpGZuduZ7nrAiXnwq2vN4ujq678AiTixgKQMw/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%8B%A8%ED%92%8D.png'),
  new Source('Underbar9', true, 'https://steemitimages.com/DQmer9vugSu3Jt3XMy2NtsL9DJrS525drU3WS3atxKLV694/%EA%B5%AC%EB%B6%84%EC%84%A0_%EA%B0%88%EC%83%89%EB%8B%A8%ED%92%8D.png'),
  new Source('Underbar10', true, 'https://steemitimages.com/DQmcfpmUp4dSk9Kx5DbKrs572Peh24Waxq2Q1VtpBsdybPE/%EA%B5%AC%EB%B6%84%EC%84%A0_%EC%82%B0.png'),
  new Source('Underbar11', true, 'https://steemitimages.com/DQmRj5e8vrreMHTzMrtjWrEwbk7EofJhViBZ57M8Y8BmPfo/%EA%B5%AC%EB%B6%84%EC%84%A0_%EC%82%B01.png'),
  new Source('Underbar12', true, 'https://steemitimages.com/DQmZLSvDj7MUrCPkeg2WdXM5nSYs49ebuWj5P4QNZ6LgzdF/%EA%B5%AC%EB%B6%84%EC%84%A0_%EC%82%B02.png'),
  new Source('Underbar13', true, 'https://steemitimages.com/DQmcKA3F7KyKkW2cgRiWqqgh3m8SecJ6iYEwRTSAL3zuZ9F/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%82%99%EC%97%BD.png'),
  new Source('Underbar14', true, 'https://steemitimages.com/DQmeo24kQq92UwoSczikUwow4sSbKzp4bpSTTe8sLTszD9f/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%B1%80%ED%94%BC.png'),
  new Source('Underbar15', true, 'https://steemitimages.com/DQmdGYCHscXzHtcKsc2RiC4HrWNRoQpCTrnLTGdTTWL8dTF/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%B0%9C%EC%9E%90%EC%9A%B1.png'),
  new Source('Underbar16', true, 'https://steemitimages.com/DQmQcC5owEsuBq23v6DvPAwBy7t72TDd3maaqBNZBLwnPHm/%EA%B5%AC%EB%B6%84%EC%84%A0_%ED%8C%8C%EC%9D%B4%ED%94%84.png'),
  new Source('Underbar17', true, 'https://steemitimages.com/DQmTvf1HQW4xgJxqYAfteBmzpg2fx6697ymFHjSe73fwQmr/%EA%B5%AC%EB%B6%84%EC%84%A0_%EA%B8%88%ED%8A%B8%EB%A6%AC.png'),
  new Source('Underbar18', true, 'https://steemitimages.com/DQmWadzmdpYw7NSMp79Hmxh663FnwJ7tQVZpFHqogSBC24a/%EA%B5%AC%EB%B6%84%EC%84%A0_%EA%B3%A8%EB%93%A0%ED%8A%B8%EB%A6%AC%EB%B6%89%EC%9D%80%EC%84%A0.png'),
  new Source('Underbar19', true, 'https://steemitimages.com/DQmX57xzuAtRv2kanSBE5mJEvdgg9YtLoC6VYBj6151oQBX/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%B0%98%EC%A7%80.png'),
  new Source('Underbar20', true, 'https://steemitimages.com/DQmSyHKX8s6THpxLVYkjhTFAx6WfeD6QyjtWL6op9p1oApa/%EA%B5%AC%EB%B6%84%EC%84%A0_%EC%B6%95%EA%B5%AC%EA%B3%B5.png'),
  new Source('Underbar21', true, 'https://steemitimages.com/DQmXnkJGfJmrRzjXLUQW2yNHgLQEvJmud6KLLdr39gJdHuN/%EA%B5%AC%EB%B6%84%EC%84%A0_%EC%A0%95%EA%B3%A1%EC%84%A0-R.png'),
  new Source('Underbar22', true, 'https://cdn.steemitimages.com/DQmcxWDvyUS2vrL4V85JsQ184TNpRBmFtq8Ymp9PsGry3Wa/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%94%B8%EA%B8%B0%EC%95%84%EC%9D%B4%EC%8A%A4%EC%BD%98_%EA%B0%80%EB%8A%94%EC%84%A0.png'),
  new Source('Underbar23', true, 'https://cdn.steemitimages.com/DQmUPqVikL8g2dEuPAenAEd8HSjet449GoaCq9JRf6MJoAe/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%94%B8%EA%B8%B0%EC%95%84%EC%9D%B4%EC%8A%A4%EC%BD%98.png'),
  new Source('Underbar24', true, 'https://cdn.steemitimages.com/DQmQ3xqGjiFzYsFppbDaA21Y48BV4QDj85Q2sBnfHZuXLgz/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%AC%BC%EB%B0%A9%EC%9A%B8.png'),
  new Source('Underbar25', true, 'https://cdn.steemitimages.com/DQmWfDuoZva4DE6uMgy2h8ActX11p3seGoBJmGAcfARFeMe/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%A8%B9%ED%9D%90%EC%B9%A8.png'),
  new Source('Underbar26', true, 'https://cdn.steemitimages.com/DQmbzdDvgG3UbxmNQS1Dp8Z8kFi4w9qZYuFiud6V8cHbYUz/%EA%B5%AC%EB%B6%84%EC%84%A0_%EC%9E%8E%EC%82%AC%EA%B7%80.png'),
  new Source('Underbar27', true, 'https://cdn.steemitimages.com/DQmXghLpAgwwXeXYpKHTk1asG6AqxxfSdT7LgnaYTdsWG41/%EA%B5%AC%EB%B6%84%EC%84%A0_%EA%B3%B0%EB%B0%9C%EB%B0%94%EB%8B%A5.png'),
  new Source('Underbar28', true, 'https://cdn.steemitimages.com/DQmbJHY69XE8KjeKDLw6fzRC6Zf5PDVGSh4M6BQuhaTcee3/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%84%A4%EC%9E%8E%ED%81%B4%EB%A1%9C%EB%B2%84.png'),
  new Source('Underbar29', true, 'https://cdn.steemitimages.com/DQmVXeFinK7NoCGyZjZDhzRUgZcqMkRpVUsRMvwms744Uyk/%EA%B5%AC%EB%B6%84%EC%84%A0_%EC%9B%94%EA%B3%84%EB%82%98%EB%AD%87%EC%9E%8E.png'),
  new Source('Underbar30', true, 'https://cdn.steemitimages.com/DQmdvmMz7m2QUD6TsAUg1f4brPSSpFG1dWsLTAkb4Xz3Qnb/%EA%B5%AC%EB%B6%84%EC%84%A0_%EC%9B%94%EA%B3%84%EB%82%98%EB%AD%87%EC%9E%8E2.png'),
  new Source('Underbar31', true, 'https://cdn.steemitimages.com/DQmUZwYyfitEaaJY3yB4arsa2oWMZsjDuaVFVyFnKqyDy3p/%EA%B5%AC%EB%B6%84%EC%84%A0_%EC%9B%94%EA%B3%84%EB%82%98%EB%AD%87%EC%9E%8E3.png'),
  new Source('Underbar32', true, 'https://cdn.steemitimages.com/DQmZFYu6LM2jBPP6HSoPnRGS9RRNXdtoFn3KypdbDTGvX9R/%EA%B5%AC%EB%B6%84%EC%84%A0_%EC%A3%BC%ED%99%A9%EB%82%98%EB%AD%87%EC%9E%8E.png'),
  new Source('Underbar33', true, 'https://cdn.steemitimages.com/DQmWaofpQwRq5oWMa9ENSt7HrHL4AimK1fD3g6dAt4zqCin/%EA%B5%AC%EB%B6%84%EC%84%A0_%EC%B4%88%EB%A1%9D%EB%82%98%EB%AD%87%EC%9E%8E.png'),
  new Source('Underbar34', true, 'https://cdn.steemitimages.com/DQmdJfy9XfqeKmti512DPCmxmAVEckJqfY4zuWebvVeTA9k/%EA%B5%AC%EB%B6%84%EC%84%A0_%ED%99%94%EC%82%B4%ED%91%9C.png'),
  new Source('Underbar35', true, 'https://cdn.steemitimages.com/DQmajWPpEw1jRmv7pYMefpzUq4HUHfB5zn7Gg7Sfvb8vL8j/%EA%B5%AC%EB%B6%84%EC%84%A0_%ED%99%94%EC%82%B4%ED%91%9C_%EC%97%AD%EB%B0%A9%ED%96%A5.png'),
  new Source('Underbar36', true, 'https://cdn.steemitimages.com/DQmSkyHvfjSf63xkcLQ6QRQSWU7pE9vYZ9XL8yLDKHzLACP/%EA%B5%AC%EB%B6%84%EC%84%A0_%ED%99%94%EC%82%B4%ED%91%9C_%EC%96%91%EB%B0%A9%ED%96%A5.png'),
  new Source('Underbar37', true, 'https://cdn.steemitimages.com/DQmPekEAJ4GMdCHj18kGV6KUpLSsRakKM2osn2eLYLQq9se/%EA%B5%AC%EB%B6%84%EC%84%A0_%ED%99%94%EC%82%B4%ED%91%9C2.png'),
  new Source('Underbar38', true, 'https://cdn.steemitimages.com/DQmYGDAREQMQgrJ791bMbxuZxysnWcfhbyPJdGZRwKdG4jC/%EA%B5%AC%EB%B6%84%EC%84%A0_%ED%99%94%EC%82%B4%ED%91%9C2_%EC%A0%95%EA%B3%A1%EC%84%A0.png'),
  new Source('Underbar39', true, 'https://cdn.steemitimages.com/DQmfDYX9QTejq1G7woQbVEduMsYB9wsC8r3TaS7SrNrzcMG/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%B9%88%EA%B3%A1%EC%84%A0.png'),
  new Source('Underbar40', true, 'https://cdn.steemitimages.com/DQmbjQAuyTQCwY8xtxMSCJhXCKGarujxuG4T9Cj43JsiK2D/%EA%B5%AC%EB%B6%84%EC%84%A0_%EB%B9%88%EC%A7%81%EC%84%A0.png'),
  new Source('Underbar41', true, 'https://cdn.steemitimages.com/DQmbPovzN6cdnS1Yu5hUV258DRg42rSLVWsL5YGm4SuHAuJ/%EA%B5%AC%EB%B6%84%EC%84%A0_%EC%A7%A7%EC%9D%80%EB%B9%88%EC%A7%81%EC%84%A0.png')
];

// =========== onload ===================
/**
* Get BarList from LocalStorage
*/
let srcList = [];
let getLocalItems = localStorage.getItem(STORAGE_IMAGE_LIST);

if(getLocalItems.length > 0){
  let jsonList = JSON.parse(getLocalItems);
  jsonList.forEach(v => {
    srcList.push(new Source(v.name, v.isImage, v.src));
  });
}else{
  // Set Default UnderLine
  srcList = defaultSrcList;
  localStorage.setItem(STORAGE_IMAGE_LIST, JSON.stringify(srcList));
}

/**
* Table <TR> Format for insertAdjacentHTML
*/
let trFormat = '<tr><td class="trName"><div style="font-size:1.5rem;float:left;">{{name}}</div>';
trFormat += '<div style="float:right;" class="ui circular medium orange icon button delBtn" name="{{name}}" src="{{src}}"><i class="icon trash alternate outline"></i></div>';
trFormat += '<div style="float:right;" class="ui circular medium green icon button addBtn" name="{{name}}" src="{{src}}"><i class="icon copy outline"></i></div>';
trFormat += '</td>';
trFormat += '<td class="trView">{{view}}</td></tr>';

// Image Table Element
let eleTable = document.getElementById('underlist');

// Insert Image <TR> HTML
srcList.forEach(v =>{
  eleTable.insertAdjacentHTML('beforeend', trFormat.replace(/{{name}}/g, v.getName())
                                                    .replace(/{{view}}/g, v.getHtmlSrc())
                                                    .replace(/{{src}}/g, v.getSrc()));
});


// ============ Add Events ===================
// Site Textarea Selector
let siteSelector = '';
let currContext = '';

/**
* Set Textarea Selector from chrome tabs
* @param tab chrometab
*/
chrome.tabs.getSelected(null,function(tab) {
  sites.forEach(v => {
    if(tab.url.indexOf(v.site) > -1) {
      currContext = v.context;
      siteSelector = v.textareaSelector;
    }
  });
});

/**
* Initial Source Button Event
*/
document.getElementById('initialSetting').addEventListener('click', v =>{
  srcList = defaultSrcList;
  localStorage.setItem(STORAGE_IMAGE_LIST, JSON.stringify(srcList));
  window.close();
});

/**
* Search Same Item srcList
* @param name A  String to be found in the list
* @return Number Item Index(Not exist return -1)
*/
function getItemIndex(name){
  for(let i=0; i<srcList.length; i++){
    if(srcList[i].getName() == name){
      return i;
    }
  }

  return -1;
}

/**
* Add Manual Source Button Event
*/
document.getElementById('addManualSrc').addEventListener('click', v =>{
  let name = document.getElementById('srcName').value.trim();
  let isImage = document.getElementById('isImage').checked;
  let src = document.getElementById('manualSrc').value;

  if(!name || !src) {
    alert('Please Input Name and Source');
    return;
  }

  if(getItemIndex(name) > -1){
    alert('Name already exist. Please use another name.')
    return;
  }

  srcList.unshift(new Source(name, isImage, src));
  localStorage.setItem(STORAGE_IMAGE_LIST, JSON.stringify(srcList));
  window.close();
});

/**
* Add Button Click Event
* @param e add button click event
*/
function addClick(e) {
  let src = e.target.parentElement.getAttribute('src');
  let itemIdx = getItemIndex(e.target.parentElement.getAttribute('name'));
  let script = srcList[itemIdx].isImage ? '![](' + src + ')' : src;

  const defaultScript = "javascript:function a(){let area={{textarea}};area.blur(); area.value=area.value + '{{src}}'; area.focus();}a();";

  chrome.tabs.executeScript(null, {code:defaultScript.replace(/{{textarea}}/g, siteSelector).replace(/{{src}}/g, script)});
  window.close();
}

/**
* Delete Button Click Event
* @param e del button click event
*/
function delClick(e) {
  let index = getItemIndex(e.target.parentElement.getAttribute('name'));
  
  if(index < 0) return;

  srcList.splice(index, 1);
  localStorage.setItem(STORAGE_IMAGE_LIST, JSON.stringify(srcList));
  e.target.closest('tr').remove();
}


// ================== User Shortcut Function ==========================
// Shortcut List
let userShortcutList = [];
userShortcutList = JSON.parse(localStorage.getItem(STORAGE_USER_LIST));

if(!userShortcutList){
  userShortcutList = [];
}

// Get Shortcut Table Element
let shortcutTable = document.getElementById('shortcutList');

// Shortcut <TR> Format
const shortcutFormat = '<div style="margin:5px;" class="ui small teal basic button shortcut">{{id}}</div>';

// Insert Shortcut <TR> HTML into Shortcut Table
userShortcutList.forEach(v =>{
  shortcutTable.insertAdjacentHTML('beforeend', shortcutFormat.replace(/{{id}}/g, v));
});

/**
* Add At Sign Function
* @param str A string for checking atsign
* @return str string with atsign
*/
function addAtSign(str){
  if(str && str.substr(0, 1) != "@") return "@" + str;
  else return str;
}

// Add User Button Click Event
document.getElementById('addUserShortcut').addEventListener('click', addUserShortcut);

/**
* Remove User Button Click Event
*/
document.getElementById('removeUserShortcut').addEventListener('click', v => {
  let tmp = addAtSign(document.getElementById('userID').value);
  let index = userShortcutList.indexOf(tmp);
  userShortcutList.splice(index, 1);

  let shortcutBtns = document.getElementsByClassName('shortcut');
  for(let i=0; i<shortcutBtns.length; i++){
    if(shortcutBtns[i].innerHTML == tmp){
      shortcutBtns[i].remove();
      break;
    }
  }

  document.getElementById('userID').value = '';
  document.getElementById('userID').focus();
});

/**
* Add User Shortcut Function and Save Localstorage
*/
function addUserShortcut(){
  let userid = addAtSign(document.getElementById('userID').value);
  if(!userid) {
    alert('Please Input Userid');
    return;
  }

  if(userShortcutList.indexOf(userid) > -1){
    alert('Already Exist!!');
    document.getElementById('userID').focus();
    return;
  } 

  userShortcutList.push(userid);
  localStorage.setItem(STORAGE_USER_LIST, JSON.stringify(userShortcutList));

  shortcutTable.insertAdjacentHTML('beforeend', shortcutFormat.replace(/{{id}}/g, userid));
  document.getElementById('userID').value = '';

  let shortcutBtns = document.getElementsByClassName('shortcut');
  shortcutBtns[shortcutBtns.length - 1].addEventListener('click', goUserPageClick);
}

/**
* Add Enter Keypress Event
* @param e event
*/
document.getElementById('userID').addEventListener('keypress', (v, e) =>{
  if(v.keyCode == 13){
    addUserShortcut();
  }
});

/**
* Go Target User Page
*/
function goUserPageClick(e){
  let userId = e.target.innerHTML;
  chrome.tabs.executeScript(null, {code:'location.href="' + currContext + userId + '"'});
  window.close();
}

// ================== Add Event ==================
/**
* Add EventListener
*/
document.addEventListener('DOMContentLoaded', function () {
  let addBtns = document.getElementsByClassName('addBtn');
  let delBtns = document.getElementsByClassName('delBtn');
  for (let i = 0; i < addBtns.length; i++) {
    addBtns[i].addEventListener('click', addClick);
    delBtns[i].addEventListener('click', delClick);
  }

  let shortcutBtns = document.getElementsByClassName('shortcut');
  for(let i=0; i<shortcutBtns.length; i++){
    shortcutBtns[i].addEventListener('click', goUserPageClick);
  }
});