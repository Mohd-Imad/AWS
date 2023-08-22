const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-south-1' })

exports.handler = async (event, context) => {
    try {
        await addBulkProducts(event);
        return {
            statusCode: 200,
            response: 'Products added successfully'
        }
    } catch (err) {
        return {
            statusCode: 500,
            error: err
        }
    }
}

const addBulkProducts = async (event) => {
    const putRequests = event.map(item => ({
        PutRequest: {
            Item: {
                'product_id': { S: item.product_id },
                'name': { S: item.name },
                'price': { N: item.price.toString() },
                'qty': { N: item.qty.toString() }
            }
        }
    }))
    const params = {
        RequestItems: {
            'Products_Testing': putRequests
        }
    }
    await dynamodb.batchWriteItem(params).promise()
}