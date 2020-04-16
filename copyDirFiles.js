var fs = require('fs')

module.exports = function(dir, dest) {
  return function(files, metalsmith, done) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest)
    }
    var files = fs.readdirSync(dir);
    files.forEach(function(file) {
      const src = dir + '/' + file;
      const dist = dest + '/' + file;
      fs.copyFileSync(src, dist)
    })
    done();
  };
}