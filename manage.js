var fs = require('fs');
var archiver = require('archiver');

var outputPath = "/Users/willjasen/Desktop/test.zip"
var srcDirectory = "/Users/willjasen/Desktop/metadata"

var output = fs.createWriteStream(outputPath);
var zipArchive = archiver('zip');

output.on('close', function() {
    console.log('Done with the zip: ', outputPath);
});

zipArchive.pipe(output);

zipArchive.bulk([
    { src: [ '**/*.json' ], cwd: srcDirectory, expand: true }
])

zipArchive.finalize(function(err, bytes) {

    if(err) {
      throw err;
    }

    console.log('Done:', base, bytes);

});

// https://soledadpenades.com/2014/01/22/compressing-files-with-node-js/
