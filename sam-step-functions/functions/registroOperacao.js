exports.handler = async (event) => {

    console.log(event)
    
    for (let key in event) {
        if event[key] == '/registro-Operacao' { 
            const response = {
                statusCode: 200,
                body: JSON.stringify({ 'sucessoRegistro': 'true' }),
            };
        }

        if event[key] == '/gera-resposta' { 
            const response = {
                statusCode: 200,
                body: JSON.stringify({ 'sucessoRegistro': 'true' }),
            };
        }
    }
    
    return response;
};
