'use strit'
function select(selector, parent = document) {
    return parent.querySelector(selector);
}
function onEvent(event, selector,callback){
    return selector.addEventListener(event, callback)
}