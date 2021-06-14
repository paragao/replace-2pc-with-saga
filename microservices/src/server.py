from flask import Flask

server = Flask(__name__)

@server.route("/")
def base():
    return("chamada direta via ECS.RunTask")

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

