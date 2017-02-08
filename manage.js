var fs = require('fs');
var archiver = require('archiver');

var srcDirectory = '/Users/willjasen/Desktop/testnode';
var dstFilename = '/Users/willjasen/Desktop/metadata';
var fileExtensions = ['.json','.snap.bin']
var timestamp = Date.now();

// Compress each file type into its archive
fileExtensions.forEach(function(extension,index,array) {
  console.time(extension);
  var zipArchive = archiver('zip');
  var outputPath = dstFilename + '-' + timestamp + extension + '.zip';
  var output = fs.createWriteStream(outputPath);

  output.on('close', function() {
    console.log('Done with the zip:', outputPath);
    console.log(zipArchive.pointer() + ' total bytes');
    console.timeEnd(extension);    
  
    var glob = require('glob');


    glob(srcDirectory + '/**/*' + extension,function(err,files){

     if (err) throw err;
     files.forEach(function(item,index,array){
          console.log(item + " found");
     });

     // Delete files
     files.forEach(function(item,index,array){
          fs.unlink(item, function(err){
               if (err) throw err;
               console.log(item + " deleted");
           });
         });
      });

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
