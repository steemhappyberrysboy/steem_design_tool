// ================== User Shortcut Function ==========================
// Define and Set Shortcut List from Localstorage
let userShortcutList = [];
userShortcutList = JSON.parse(localStorage.getItem(STORAGE_USER_LIST));

if(!userShortcutList){
  userShortcutList = [];
}

let shortcutTable = document.getElementById('shortcutList');

// Shortcut Design Format
const shortcutFormat = '<div style="margin:5px;" class="ui small teal basic button shortcut">{{id}}</div>';

refresh = () => {
  // Insert Shortcut HTML into Shortcut Container
  shortcutTable.innerHTML = '';
  userShortcutList.forEach(v =>{
    shortcutTable.insertAdjacentHTML('beforeend', shortcutFormat.replace(/{{id}}/g, v));
  });
}

refresh();

/**
* Add User Shortcut Function and Save Localstorage
*/
addUserShortcut = () => {
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

document.getElementById('addUserShortcut').addEventListener('click', addUserShortcut);

document.getElementById('sortABC').addEventListener('click', () => {
  if(!confirm('Do you want to sort IDs in ABC order? ')) return;
  userShortcutList.sort();
  localStorage.setItem(STORAGE_USER_LIST, JSON.stringify(userShortcutList));

  refresh();
});

/**
* Remove User Button Click Event
*/
document.getElementById('removeUserShortcut').addEventListener('click', v => {
  let tmp = addAtSign(document.getElementById('userID').value);
  let index = userShortcutList.indexOf(tmp);
  userShortcutList.splice(index, 1);
  localStorage.setItem(STORAGE_USER_LIST, JSON.stringify(userShortcutList));

  let shortcutBtns = document.getElementsByClassName('shortcut');
  for(let i=0; i<shortcutBtns.length; i+=1){
    if(shortcutBtns[i].innerHTML == tmp){
      shortcutBtns[i].remove();
      break;
    }
  }

  document.getElementById('userID').value = '';
  document.getElementById('userID').focus();
});

/**
* Add Enter Keypress Event
* @param e event
*/
document.getElementById('userID').addEventListener('keypress', (v, e) =>{
  if(v.keyCode === 13){
    addUserShortcut();
  }
});

/**
* Go Target User Page
*/
goUserPageClick = (e) => {
  let userId = e.target.innerHTML;
  chrome.tabs.executeScript(null, {code:'location.href="' + currContext + userId + '"'});
  window.close();
}

// Add Event to Shortcut Buttons
document.addEventListener('DOMContentLoaded', () => {
  let shortcutBtns = document.getElementsByClassName('shortcut');
  for(let i=0; i<shortcutBtns.length; i+=1){
    shortcutBtns[i].addEventListener('click', goUserPageClick);
  }
});

document.getElementById('userDetailBtn').addEventListener('click', () => {
  // Get User Info from Steemjs API
  steem.api.getAccounts(userShortcutList.map(v => v.replace(/@/g, '')), function(err, response){
    if(err){
      alert('Steem API Error');
      console.log(err);
    }else{
      console.log(response);
    }

    let userInfoHtmlFormat = [];

    response.forEach((v, i) => {
      var metadata = v.json_metadata ? JSON.parse(v.json_metadata) : '';
      console.log(metadata);
      userInfoHtmlFormat.push('<div class="ui card shortcut"><div class="image">');
      userInfoHtmlFormat.push('<img src="{{src}}">'.replace(/{{src}}/g, metadata ? metadata.profile.profile_image : 'https://semantic-ui.com/images/wireframe/image.png'));
      userInfoHtmlFormat.push('</div><div class="content">');
      userInfoHtmlFormat.push('<div class="header">{{name}}</div>'.replace(/{{name}}/g, v.name));
      userInfoHtmlFormat.push('<div class="description">{{desc}}</div></div>'.replace(/{{desc}}/g, metadata ? metadata.profile.about : ''));
    });

    shortcutTable.insertAdjacentHTML('beforeend', userInfoHtmlFormat.join(''));

    let shortcutBtns = document.getElementsByClassName('shortcut');
    shortcutBtns[shortcutBtns.length - 1].addEventListener('click', goUserPageClick);
  });
});


