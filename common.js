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
}

/**
* Add At Sign Function
* @param str A string for checking atsign
* @return str string with atsign
*/
addAtSign = (str) => {
    if(str && str.substr(0, 1) != "@") return "@" + str;
    else return str;
}

