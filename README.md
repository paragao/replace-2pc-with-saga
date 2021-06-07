# replace-2pc-with-saga
A project to show how AWS Step Functions can be used to replace 2-Phase Commit using the SAGA pattern. Sample microservices will be used to simulate a complex transaction using an orchestration strategy.


The idea comes from [this document](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/implement-the-serverless-saga-pattern-by-using-aws-step-functions.html) and follows the ideas behind modernizing applications through different strategies of decomposing monolithic applications to microservices, as described in [this whitepaper](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/welcome.html).


Another good source of information is about idempotent API. The Amazon Builder libray has a [very good paper about it](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs). 