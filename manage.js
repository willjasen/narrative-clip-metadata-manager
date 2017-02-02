var fs = require('fs');
var archiver = require('archiver');

var srcDirectory = '/Users/willjasen/Pictures/Narrative Clip';
var dstFilename = '/Users/willjasen/Pictures/metadata';
var fileExtensions = ['.json','.snap.bin']
var timestamp = Date.now();

fileExtensions.forEach(function(extension,index,array) {
  console.time(extension);
  var zipArchive = archiver('zip');
  var outputPath = dstFilename + '-' + timestamp + extension + '.zip';
  var output = fs.createWriteStream(outputPath);

  output.on('close', function() {
    console.log('Done with the zip:', outputPath);
    console.log(zipArchive.pointer() + ' total bytes');
    console.timeEnd(extension);
  });

  zipArchive.pipe(output);
  
  zipArchive.glob(srcDirectory + '/**/*' + extension); 

  zipArchive.finalize(function(err, bytes) {

    if(err) {
      throw err;
    }

    console.log('Done:', base, bytes);

  });
});

// https://soledadpenades.com/2014/01/22/compressing-files-with-node-js/
