// ================== User Shortcut Function ==========================
// Define and Set Shortcut List from Localstorage
let userShortcutList = [];
let getStorageUserList = localStorage.getItem(STORAGE_USER_LIST);

if(getStorageUserList){
  userShortcutList = JSON.parse(getStorageUserList);
}else{
  userShortcutList = [];
}

/**
* Add User Shortcut Function and Save Localstorage
*/
function addUserShortcut() {
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

  refresh();
  document.getElementById('userID').value = '';
  document.getElementById('userID').focus();
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
    if(shortcutBtns[i].getAttribute('id') == tmp){
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

document.getElementById('userDetailBtn').addEventListener('click', (e) => {
  refresh();
  localStorage.setItem(DETAIL_CHECK_VALUE, e.target.checked);
});

/**
* Refresh User Shortcut
*/
function refresh() {
  if(userShortcutList.length == 0) return; 

  let shortcutTable = document.getElementById('shortcutList');
  shortcutTable.innerHTML = '';

  if(document.getElementById('userDetailBtn').checked){
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
        let metadata;
        try{
          metadata = v.json_metadata && v.json_metadata !== '{}' ? JSON.parse(v.json_metadata) : '';
        }catch(ex){
          metadata = '';
        }
        userInfoHtmlFormat.push('<center><div class="ui card shortcut" id="@' + v.name + '" style="margin:5px;"><div class="image">');
        userInfoHtmlFormat.push('<div class="ui blue ribbon label"><i class="user icon"></i>');
        userInfoHtmlFormat.push('<a href="' + currContext + '@' + v.name + '" target="_blank">' + v.name + '</a></div>');

        if(!metadata || metadata.profile.profile_image.indexOf('photos.google.com') > -1 
                      || metadata.profile.profile_image.indexOf('.postimg.') > -1
                      || metadata.profile.profile_image.indexOf('.imgsafe.') > -1
                      || metadata.profile.profile_image.indexOf('.postimg.') > -1){
          userInfoHtmlFormat.push('<img src="{{src}}">'.replace(/{{src}}/g, 'https://semantic-ui.com/images/wireframe/image.png'));
        }else{
          userInfoHtmlFormat.push('<img src="{{src}}">'.replace(/{{src}}/g, metadata.profile.profile_image));
        }
        userInfoHtmlFormat.push('</div><div class="content">');
        userInfoHtmlFormat.push('<div class="header">Joined in {{date}}</div>'.replace(/{{date}}/g, v.created.substr(0, 10)));
        userInfoHtmlFormat.push('<div class="meta">');
        if(metadata){
          userInfoHtmlFormat.push(metadata.profile.about ? '<br>' + metadata.profile.about : '');
          userInfoHtmlFormat.push(metadata.profile.location ? '<br><span>Location</span> : ' + metadata.profile.location : '');
          userInfoHtmlFormat.push(metadata.profile.website ? '<br>Website : <a style="color:#00f;" href="' + metadata.profile.website + '" target="_blank">' + metadata.profile.website + '</a>' : '');
        }
        userInfoHtmlFormat.push('</div></div></div></center>');

        steem.api.getFollowCount(userShortcutList.map(v => v.replace(/@/g, '')), function(err, response){
          if(err){
            console.log(err);
          }else{
            console.log(response);
          }
        });
      });

      shortcutTable.insertAdjacentHTML('beforeend', userInfoHtmlFormat.join(''));
      $('#userDetailBtn').removeClass('loading');
    });
  }else{
    const shortcutFormat = '<div style="margin:5px;" class="ui small teal basic button shortcut" id="{{id}}">{{id}}</div>';
    userShortcutList.forEach(v =>{
      shortcutTable.insertAdjacentHTML('beforeend', shortcutFormat.replace(/{{id}}/g, v));
    });

    let shortcutBtns = document.getElementsByClassName('shortcut');
    for(let i=0; i<shortcutBtns.length; i+=1){
      shortcutBtns[i].addEventListener('click', goUserPageClick);
    }
  }
}

document.getElementById('userDetailBtn').checked = localStorage.getItem(DETAIL_CHECK_VALUE) === 'true' ? true : false;

refresh();