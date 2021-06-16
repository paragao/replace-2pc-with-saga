var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' })
var ddb = new AWS.DynamoDB({apiversion: '2012-08-10'});
const uuid = require('uuid');

exports.handler = async (event) => {
    console.log(event)

    ispb = uuid.v4()
    params = {
        TableName: 'r2c3',
        Item: {
            'ispb': {
                'S': ispb
            }
        }
    }

    for (let key in event) {
        if (event[key] == '/registro-operacao') {
            console.log('Registrando operacao...')
            const results = ddb.putItem(params, function (err, data) {
                if (err) {
                    console.log("Error inserting item", err);
                } else {
                    console.log("Success inserting item", data);
                }
            });
            console.log("Results", results);
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