// Tracing com AWS X-Ray
//const AWSXRay = require('aws-xray-sdk-core')
//const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const AWS = require('aws-sdk')
const crypto = require('crypto')
let response;

const md5Hasher = crypto.createHash('md5')

var serialize = function(object) {
    return JSON.stringify(object, null, 2)
}

// AWS clients
const ddb = new AWS.DynamoDB();
var s3 = new AWS.S3();

exports.lambdaHandler = async (event, context) => {

    console.log(event);

    // Cria um hash MD5 para fazer upload ao S3 e validar se o arquivo chegou íntegro
    payload = event['body']
    const hash = md5Hasher.update(payload).digest('base64') 

    var s3Params = { 
        Bucket: 'teste-r2c3-paragao-us-east-1', 
        Key: 'teste.xml',
        Body: payload,
        ContentMD5: hash //verifica integridade do dado fim-a-fim - https://aws.amazon.com/premiumsupport/knowledge-center/data-integrity-s3/ 
    }

    await s3Response = s3.upload(s3Params, function(err, data) {
        if (err) console.log(err);
        else {
            console.log(data);
            etag = data.ETag; //um identificador unico daquela versao do objeto 
            location = data.Location; //URL do objeto armazenado
        }
    })

    console.log(s3Response)
    
    // Usando ISPB (como clientId) e ESTADO da transacao (como sortKey) para idempotência das API
    // ETag do S3 para garantir a busca do arquivo enviado durante a chamada de API
    estadoTransacao = 'ENVIO_PAYLOAD'
    ispb = event['queryStringParameters']['ispb']

    var ddbParams = { 
        Item: { 
            "ISPB": { 
                S: ispb
            },
            "Transacao": { 
                S: estadoTransacao
            },
            "Payload": { 
                S: location
            },
            "MD5": { 
                S: hash
            }
        },
        TableName: "R2C3"
    }

    await ddbResponse = ddb.putItem(ddbParams, function(err, data) { 
        if (err) console.log(err, err.stack);
        else console.log(data);
    })
    
    console.log(ddbResponse)

    // Resposta do Lambda Proxy pro API Gateway
    response = {
        'statusCode': 200,
        'body': JSON.stringify({'retorno final da funcao'})
    }

    return response
};
