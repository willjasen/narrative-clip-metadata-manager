var fs = require('fs');
var archiver = require('archiver');
var outputPath = "test.zip"
var srcDirectory = "/Users/willjasen/Desktop/metadata"

var output = fs.createWriteStream(outputPath);
var zipArchive = archiver('zip');

output.on('close', function() {
    console.log('done with the zip', outputPath);
});

zipArchive.pipe(output);

zipArchive.bulk([
    { src: [ '**/*' ], cwd: srcDirectory, expand: true }
]);

zipArchive.finalize(function(err, bytes) {

    if(err) {
      throw err;
    }

    console.log('done:', base, bytes);

});
