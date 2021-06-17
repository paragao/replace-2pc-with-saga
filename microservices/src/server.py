from flask import Flask, request, jsonify
import boto3
import json

server = Flask(__name__)
sfn = boto3.client('stepfunctions', region_name='us-east-1')
ddb = boto3.client('dynamodb')

#microserviços
@server.route("/")
def root_path():
    return("ok")

@server.route("/teste/prepara-agenda", methods=["POST"])
def teste():

    event = request.json
    print(event['TaskToken'])
    token = event['TaskToken']
    ispb = event['ispb']

    message = '{ "output":  "Prepara agenda para {} concluido com sucesso" }'.format(ispb)

    if (True):
        sucesso = True
        response = sfn.send_task_success(taskToken=token, output=message)
        return (response)
    else:
        sucesso = False
        error = { "error": "Falso" } 
        cause = { "cause": "Prepara Agendas não foi concluído com sucesso" }
        response = sfn.send_task_failure(taskToken=token, error=error, cause=cause)
        return (response)


@server.route("/teste/efetiva-operacao", methods=["POST"])
def efetiva_operacao():


    return("chamada EFETIVA OPERACAO do microserviço")

@server.route("/teste/valida-anuencia/")
def valida_anuencia():

    event = request.json
    ispb = event['ispb']
    message = "chamada VALIDA ANUENCIA do microserviço" 

    return ({ "ispb": ispb, "message": message})

@server.route("/teste/envia-anuencia", methods=["POST"])
def envia_anuencia():

    event = request.json
    ispb = event['ispb']
    message = "chamada ENVIA ANUENCIA do microserviço"

    response = ddb.update_item(
        TableName='r2c3',
        Key={
            'ispb': { 
                'S': ispb
            }
        },
        UpdateExpression='SET Anuencia = :status',
        ExpressionAttributeValues={
            ':status': { 
                'S': 'enviada'
            }
        }
    )

    return ({ "ispb": ispb, "message": message})

@server.route('/<task>')
def worker_task(task):
    return("tarefa {} executada").format(task)

if __name__ == "__main__":
    server.run(host='0.0.0.0')

