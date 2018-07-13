

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

// Add User Button Click Event
document.getElementById('addUserShortcut').addEventListener('click', addUserShortcut);

/**
* Remove User Button Click Event
*/
document.getElementById('removeUserShortcut').addEventListener('click', v => {
  let tmp = addAtSign(document.getElementById('userID').value);
  let index = userShortcutList.indexOf(tmp);
  userShortcutList.splice(index, 1);
  localStorage.setItem(STORAGE_USER_LIST, JSON.stringify(userShortcutList));

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
goUserPageClick = (e) => {
  let userId = e.target.innerHTML;
  chrome.tabs.executeScript(null, {code:'location.href="' + currContext + userId + '"'});
  window.close();
}

// Add Event to Shortcut Buttons
document.addEventListener('DOMContentLoaded', () => {
  let shortcutBtns = document.getElementsByClassName('shortcut');
  for(let i=0; i<shortcutBtns.length; i++){
    shortcutBtns[i].addEventListener('click', goUserPageClick);
  }
});