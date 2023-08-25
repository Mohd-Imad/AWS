const AWS = require('aws-sdk')
const S3 = new AWS.S3({ region: 'ap-south-1' })

exports.handler = async (event, context) => {
    const bucketName = 'demotestproducts'
    const key = `newimages/${event.name}.png`
    const expiry = 60 * 5

    const params = {
        Bucket: bucketName,
        Key: key,
        Expires: expiry
    }

    try {
        const presignedurl = await S3.getSignedUrl('getObject', params)
        console.log(presignedurl);
        await uploadToS3(event)
        return {
            statusCode: 200,
            body: presignedurl
        }

    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            error: err.message
        }
    }

}

const uploadToS3 = async (event) => {
    try {
        const params = {
            Bucket: 'demotestproducts',
            Key: `images/${event.name}.png`,
            Body: event.image
        }
        await S3.upload(params).promise()
    } catch (err) {
        console.log(err)
        return {
            error: "File uploading failed",
            msg: err.message
        }
    }
}