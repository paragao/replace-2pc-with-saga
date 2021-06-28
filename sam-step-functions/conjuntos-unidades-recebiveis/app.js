// Tracing com AWS X-Ray
const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const crypto = require("crypto")
let response;

const md5Hasher = crypto.createHmac("md5", "")

var serialize = function(object) {
    return JSON.stringify(object, null, 2)
}

exports.lambdaHandler = async (event, context) => {

    str = 'hello world'
    const hash = md5Hasher.update(str).digest('hex')

    // API GW expects lambda to return 200 always even when its an error
    response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: hash,
        })
    }

    return response
};
