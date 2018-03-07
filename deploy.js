var s3 = require('s3')

var client = s3.createClient(
  {
    maxAsyncS3: 10, // this is the default
    s3RetryCount: 5, // this is the default
    s3RetryDelay: 2000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 5572864,
    s3Options: {
      region: 'eu-west-2'
    }
  })

var params = {
  localDir: 'public/',
  deleteRemoved: true, // default false, whether to remove s3 objects
  // that have no corresponding local file.

  s3Params: {
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
})
