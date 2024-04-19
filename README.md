In ideal world we should have separate repo per microservice.
However for the purpose of speed and simplicity this repo contains
two services at the same time.

### Running

To run microservices you should create .env files (copy paste .env.example)
and simply compose everything up.

```bash
cd userService;
cp .env.example .env;
docker-compose up;

cd ../notificationService;
cp .env.example .env;
docker-compose up notificationService;
```

After this you should be able to use REST api of user service, notification
service and send messages via rabbitmq.

### What's done

Implemented health endpoint for both services, CRUD operations within
userService in integration with mongodb, service to service
communication via rabbitmq, logging, data validation, error handling.
