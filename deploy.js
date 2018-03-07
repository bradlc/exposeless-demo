var s3 = require('s3')
var AWS = require('aws-sdk'); // https://www.npmjs.com/package/aws-sdk

// use newest sdk to avoid: https://github.com/andrewrk/node-s3-client/issues/69
var awsS3Client = new AWS.S3({
  region: 'eu-west-2'
});

var client = s3.createClient(
  {
    maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Client: awsS3Client
  })

var params = {
  localDir: 'public/',
  deleteRemoved: true, // default false, whether to remove s3 objects
  // that have no corresponding local file.

  s3Params: {
    Prefix: '',
    Bucket: 'exposeless',
    ACL: 'public-read'
  }
}
var uploader = client.uploadDir(params)

uploader.on('error', function (err) {
  console.error('unable to sync:', err.stack)
})
uploader.on('progress', function () {
  var percentage = parseInt((uploader.progressAmount / uploader.progressTotal) * 100, 10)

  if (uploader.progressTotal === 0) {
    percentage = 0
  }
  console.log('Uploading... ' + percentage + '%')
})
uploader.on('end', function () {
  console.log('uploaded')
  process.exit(0);
})
