// ================== Tag Shortcut Function ==========================
// Shortcut List
let tagShortcutList = [];
tagShortcutList = JSON.parse(localStorage.getItem(STORAGE_TAG_LIST));

if(!tagShortcutList){
  tagShortcutList = [];
}

let tagShortcutTable = document.getElementById('tagShortcutList');

// Shortcut <Tdiv> Format
const tagShortcutFormat = '<div style="margin:5px;" class="ui small teal basic button tagShortcutitem">{{id}}</div>';

// Append Shortcut <div> HTML into Shortcut Table
tagShortcutList.forEach(v =>{
  tagShortcutTable.insertAdjacentHTML('beforeend', tagShortcutFormat.replace(/{{id}}/g, v));
});

/**
* Add Tag Shortcut Function and Save Localstorage
*/
addTagShortcut = () => {
  let tagid = document.getElementById('tagID').value.trim();
  if(!tagid) {
    alert('Please Input Tagid');
    return;
  }

  if(tagShortcutList.indexOf(tagid) > -1){
    alert('Already Exist!!');
    document.getElementById('tagID').focus();
    return;
  } 

  tagShortcutList.push(tagid);
  localStorage.setItem(STORAGE_TAG_LIST, JSON.stringify(tagShortcutList));

  tagShortcutTable.insertAdjacentHTML('beforeend', tagShortcutFormat.replace(/{{id}}/g, tagid));
  document.getElementById('tagID').value = '';

  let shortcutBtns = document.getElementsByClassName('tagShortcutitem');
  shortcutBtns[shortcutBtns.length - 1].addEventListener('click', goTagPageClick);
}

document.getElementById('addTagShortcut').addEventListener('click', addTagShortcut);

/**
* Remove Tag Button Click Event
*/
document.getElementById('removeTagShortcut').addEventListener('click', v => {
  let tmp = document.getElementById('tagID').value.trim();
  let index = tagShortcutList.indexOf(tmp);
  tagShortcutList.splice(index, 1);
  localStorage.setItem(STORAGE_TAG_LIST, JSON.stringify(tagShortcutList));

  let shortcutBtns = document.getElementsByClassName('tagShortcutitem');
  for(let i=0; i<shortcutBtns.length; i+=1){
    if(shortcutBtns[i].innerHTML === tmp){
      shortcutBtns[i].remove();
      break;
    }
  }

  document.getElementById('tagID').value = '';
  document.getElementById('tagID').focus();
});

/**
* Add Enter Keypress Event
* @param e event
*/
document.getElementById('tagID').addEventListener('keypress', (v, e) =>{
  if(v.keyCode === 13){
    addTagShortcut();
  }
});

/**
* Go Target Tag Page
*/
goTagPageClick = (e) => {
  let tagid = e.target.innerHTML;
  chrome.tabs.executeScript(null, {code:'location.href="' + currContext + 'trending/' + tagid + '"'});
  window.close();
}

// Add Event to Shortcut Buttons
document.addEventListener('DOMContentLoaded', () => {
  let shortcutBtns = document.getElementsByClassName('tagShortcutitem');
  for(let i=0; i<shortcutBtns.length; i+=1){
    shortcutBtns[i].addEventListener('click', goTagPageClick);
  }
});