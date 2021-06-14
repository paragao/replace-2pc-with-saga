#!/bin/bash

docker build -t microservices . 
docker tag microservices 441224055073.dkr.ecr.us-east-1.amazonaws.com/serverless-saga
aws ecr get-login-password | docker login --username AWS --password-stdin 441224055073.dkr.ecr.us-east-1.amazonaws.com
docker push 441224055073.dkr.ecr.us-east-1.amazonaws.com/serverless-saga

if [ $? -ne 0 ]; then
    echo "did not build the image correctly"
    exit 1
fi 
