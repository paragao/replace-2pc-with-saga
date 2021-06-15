from flask import Flask, request, jsonify
import boto3

server = Flask(__name__)
sfn = boto3.client('stepfunctions', region_name='us-east-1')

#microserviços
@server.route("/")
def root_path():
    return("ok")

@server.route("/teste/prepara-agenda", methods=["POST"])
def teste():
    try:
        event = request.json

        if (True):
            sucesso = True
            output = "Prepara Agendas concluído com sucesso"
            response = sfn.send_task_success(event['taskToken'], output)
        else:
            sucesso = False
            error = "Falso"
            cause = "Prepara Agendas não foi concluído com sucesso"
            response = sfn.send_task_failure(event['taskToken'], error, cause)
    except: 
        print('error')

    return jsonify(event['taskToken'], sucesso)

@server.route("/teste/efetiva-operacao")
def efetiva_operacao():
    return("chamada EFETIVA OPERACAO do microserviço")

@server.route("/teste/valida-anuencia")
def valida_anuencia():
    return("chamada VALIDA ANUENCIA do microserviço")

@server.route("/teste/envia-anuencia")
def envia_anuencia():
    return("chamada ENVIA ANUENCIA do microserviço")

@server.route('/<task>')
def worker_task(task):
    return("tarefa {} executada").format(task)

if __name__ == "__main__":
    server.run(host='0.0.0.0')

