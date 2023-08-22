const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-south-1' })

exports.handler = async (event, context, callback) => {
    try {

        await addProduct(event);
        return {
            statusCode: 200,
            response: 'Product added successfully'
        }
    }  catch(err){
        return {
            statusCode : 500,
            response: 'Adding product failed',
            error: err
        }
    }
}

const addProduct = async(event)=>{
    let params = {
        TableName : 'Products_Testing',
        Item : {
        "product_id" : event.product_id,
        "name" : event.name,
        "price" : event.price,
        "qty" : event.qty
        }
    }
    dynamodb.put(params).promise()
}