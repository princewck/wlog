export default function selectFiles(options, cb) {
  options = options || {};
  var input = document.createElement('input');
  input.setAttribute('type', 'file');
  // accept `image/*` freezes Chrome 52+ sometimes
  if (options.accept) input.setAttribute('accept', options.accept);
  if (options.multiple) input.multiple = true;
  input.addEventListener('change', function () {
    if (input.files && input.files.length) {
      cb(options.multiple ? input.files : input.files[0]);
    }
  }, false);

  // IE fix
  input.setAttribute('style', 'display:none');
  document.body.appendChild(input);

  /*var e = document.createEvent('MouseEvent');
  e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  input.dispatchEvent(e);*/
  input.click();
  document.body.removeChild(input);
}