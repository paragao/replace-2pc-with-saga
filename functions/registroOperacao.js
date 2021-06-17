var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' })
var ddb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

async function createIspb(){
    ispb = uuid.v4()
    const params = {
        TableName: 'r2c3',
        Item: {
            'ispb': {
                'S': ispb
            }
        }
    }
    
    try {
        await ddb.put(params).promise();
    } catch (err) { 
        console.log(err);
    }
}

exports.handler = async (event) => {
    console.log(event)

    for (let key in event) {
        if (event[key] == '/registro-operacao') {
            console.log('Registrando operacao...')
            try {
                await createIspb()
                console.log("Sucesso")
            } catch (err) {
                console.log("Erro", err)
            }
        }

        if (event[key] == '/gera-resposta') {
            console.log('Gerando resposta')
        };

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            'sucessoRegistro': 'true',
            'ispb': ispb
        }),
    };

    return response;
    }
};