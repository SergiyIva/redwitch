import im from "imagemagick";

im.readMetadata(process.cwd() + "/day.jpg", function (err, metadata) {
  if (err) throw err;
  console.log("Shot at " + metadata.exif.dateTimeOriginal);
});
//im.convert();
