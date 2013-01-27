var domify = require('domify'),
    DirectoryEntry = require('./directory_entry'),
    Emitter = require('emitter'),
    events = require('event'),
    html = require('./template'),
    map = require('map');


function MyComputerEngine() {
  this.name = 'My Computer';
  this.customRendering = true;
}

Emitter(MyComputerEngine.prototype);

MyComputerEngine.prototype.fetchDir = function(fullPath, filePicker) {
  var parent = filePicker.custom,
      el = domify(html)[0];

  events(el, 'drop', function(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = map(e.dataTransfer.files, function(file) {
      return new DirectoryEntry(file);
    });
    filePicker.emit('filesselected', files);
  });

  parent.appendChild(el);
};
