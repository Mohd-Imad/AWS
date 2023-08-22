const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-south-1' })

exports.handler = async (event, context, callback) => {
    try {
        let productId = event.product_id;

        if (!productId) {
            return {
                statusCode: 400,
                response: 'Product not found'
            }
        }

        let product = await getSingleProduct(productId);
        return {
            statusCode: 200,
            response: product
        }
    } catch (err) {
        return {
            statusCode: 500,
            error: err
        }
    }
}

const getSingleProduct = async (event) => {
    let params = {
        TableName: 'Products_Testing',
        KeyConditionExpression: 'product_id = :productId',
        ExpressionAttributeValues: {
            ':productId': productId
        }
    }
    let result = await dynamodb.get(params).promise()
    return result.Items
}