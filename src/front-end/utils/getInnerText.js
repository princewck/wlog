export default (html) => {
  const div = window.document.createElement('div');
  div.innerHTML = html;
  return div.innerText;
}