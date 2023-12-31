const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient({region:'ap-south-1'})

exports.handler = async(event, context, callback) =>{
    try{
        const data = await getAllProducts(event);
        console.log(data);
        return {
            statusCode : 200,
            response: event.Items
        }
    }catch(err){
        return {
            statusCode:500,
            error:err
        }
    }
}

const getAllProducts = async(event)=>{
    let params = {
        TableName:'Products_Testing'
    }
    await dynamodb.scan(params).promise()
}