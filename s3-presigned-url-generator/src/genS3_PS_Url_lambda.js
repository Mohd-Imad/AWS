//backup copy of lambda function
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const bucketName = 'demoproductstest';
  const key = `uploads/${Date.now()}_${event.name}`; // Customize the key as needed

  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: 3600
  };

  try {
    const presignedUrl = await s3.getSignedUrlPromise('putObject', params);
    return {
      statusCode: 200,
      body: JSON.stringify({ presignedUrl }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

