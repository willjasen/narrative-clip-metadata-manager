var fs = require('fs');
var archiver = require('archiver');

var srcDirectory = '/Users/willjasen/Desktop/metadata';
//var outputPaths = ['/Users/willjasen/Desktop/metadata.json.zip', '/Users/willjasen/Desktop/metadata.snap.bin.zip'];
var fileExtensions = ['.json','.snap.bin']

fileExtensions.forEach(function(extension,index,array) {
  var zipArchive = archiver('zip');
  var outputPath = srcDirectory + extension + '.zip';
  var output = fs.createWriteStream(outputPath);

  output.on('close', function() {
    console.log('Done with the zip:', outputPath);
  });

  zipArchive.pipe(output);

  zipArchive.bulk([
    { src: [ '**/*' + extension ], cwd: srcDirectory, expand: true }
  ]);

  zipArchive.finalize(function(err, bytes) {

    if(err) {
      throw err;
    }

    console.log('Done:', base, bytes);

  });
});

// https://soledadpenades.com/2014/01/22/compressing-files-with-node-js/
