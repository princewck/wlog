export default () => {
  var scrollPos;  
  if (window.pageYOffset) {  
  scrollPos = window.pageYOffset; }  
  else if (document.compatMode && document.compatMode != 'BackCompat')  
  { scrollPos = document.documentElement.scrollTop; }  
  else if (document.body) { scrollPos = document.body.scrollTop; }   
  return scrollPos;   
}