const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient({region:'ap-south-1'})

exports.handler = async(event, context) =>{
    try{
        await updateProduct(event);
        return{
            statusCode: 200,
            response:"Product updated successfully"
        }
    }catch(err){
        return{
            statusCode: 500,
            error:err
        }
    }
}

const updateProduct = async(event)=>{
    let params = {
        TableName : 'Products_Testing',
        Key : {
            'product_id' : event.product_id
        },
        UpdateExpression : 'set product_name = :name, product_price = :price',
        ExpressionAttributeValues : {
            ':name' : event.name,
            ':price' : event.price
        }
    }
    await dynamodb.update(params).promise()
}