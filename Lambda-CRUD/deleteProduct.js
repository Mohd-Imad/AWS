const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-south-1' })

exports.handler = async (event, context) => {
    try {
        await deleteProduct(event);
        return {
            statusCode: 200,
            response: "Product deleted successfully"
        }
    } catch (err) {
        return {
            statusCode: 500,
            error: err
        }
    }
}

const deleteProduct = async (event) => {
    let params = {
        TableName: 'Products_Testing',
        Key: {
            'product_id' : event.product_id
        }
    }
    await dynamodb.delete(params).promise()
}