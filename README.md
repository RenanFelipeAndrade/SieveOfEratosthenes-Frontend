# Sieve Of Eratosthenes - Web

## Requirements

- Docker-compose v2.1
- Docker v23
- [The server](https://github.com/RenanFelipeAndrade/sieve-of-eratosthenes-server.git)

## Instalation

Clone the server and the web client, put them side by side

```
root_dir
|
|
----sieve-of-eratosthenes-server
|
----sieve-of-eratosthenes-web
```

Inside the **server** directory, run

```
docker-compose up
```

This command will create both containers, server and
web, and resolve all the dependencies but they will
not work. Once the containers are created, find the
server's network with

```
docker network ls
```

Once you have the network id, run

```bash
ifconfig # linux
# or
ipconfig # windows
```

Find the ip corresponding to the network's id and put it in a
.env file

```properties
API_URL="http://network-container-ip:8080"
```

Now, just run again both containers

```
docker-compose up
```

The web client will be running at [localhost:3000](http://localhost:3000)
and the server at [localhost:8080](http://localhost:8080)

> Note: The server takes a couple of seconds to really start
> listening for requests

## About the project

This is a web client for the project
[sieve-of-eratosthenes-server](https://github.com/RenanFelipeAndrade/sieve-of-eratosthenes-server). The client
depends entirely on the server, so make sure to have it cloned too.

## Contributors

<div>
<strong>Renan Andrade</strong>
<br />
Student at Instituto Federal Catarinense
<br />

[Telegram](https://t.me/renanandrad); [Github](https://github.com/RenanFelipeAndrade)

</div>

<div>
<strong>Gustavo Ferreira</strong>
<br />
Student at Universidade de São Paulo
<br />

[Telegram](https://t.me/gusferreira1203); [Github](https://github.com/gusferreira1203)

</div>
