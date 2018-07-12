// ================== Image/HTML Manager ==================
// =========== onload ===================
/**
* Get BarList from LocalStorage
*/
let srcList = [];
let getLocalItems = localStorage.getItem(STORAGE_IMAGE_LIST);

if(getLocalItems){
  let jsonList = JSON.parse(getLocalItems);
  jsonList.forEach((v, idx) => {
    if(v.name){
        srcList.push(new Source(v.name, v.isImage, v.src));
    }else{
        // 1.1.4 previous version conversion
        srcList.push(new Source('No' + (idx+1), true, v));
    }
  });
  localStorage.setItem(STORAGE_IMAGE_LIST, JSON.stringify(srcList));
}else{
  // Set Default SrcList
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
chrome.tabs.getSelected(null, (tab) => {
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
getItemIndex = (name) => {
  for(let i=0; i<srcList.length; i++){
    if(srcList[i].getName() == name){
      return i;
    }
  }

  return -1;
};

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
addClick = (e) => {
  let src = e.target.parentElement.getAttribute('src');
  let itemIdx = getItemIndex(e.target.parentElement.getAttribute('name'));
  let script = srcList[itemIdx].isImage ? '![](' + src + ')' : src;

// change clipboard copy
//   const defaultScript = "javascript:function a(){let area={{textarea}};area.blur(); area.value=area.value + '{{src}}'; area.focus();}a();";

  let clipboard = document.getElementById('clipboard');
  clipboard.style.display = 'block';
  clipboard.value = script;
  clipboard.select();
  document.execCommand('copy');
  clipboard.style.display = 'none';

  let copied = document.getElementById('copied');
  copied.style.display = 'inline-block';
  setTimeout((() => copied.style.display = 'none'), 1500);
//   chrome.tabs.executeScript(null, {code:defaultScript.replace(/{{textarea}}/g, siteSelector).replace(/{{src}}/g, script)});
//   window.close();
}

/**
* Delete Button Click Event
* @param e del button click event
*/
delClick = (e) => {
  let index = getItemIndex(e.target.parentElement.getAttribute('name'));
  
  if(index < 0) return;

  srcList.splice(index, 1);
  localStorage.setItem(STORAGE_IMAGE_LIST, JSON.stringify(srcList));
  e.target.closest('tr').remove();
}

/**
* Add EventListener
*/
document.addEventListener('DOMContentLoaded', () => {
  let addBtns = document.getElementsByClassName('addBtn');
  let delBtns = document.getElementsByClassName('delBtn');
  for (let i = 0; i < addBtns.length; i++) {
    addBtns[i].addEventListener('click', addClick);
    delBtns[i].addEventListener('click', delClick);
  }
});