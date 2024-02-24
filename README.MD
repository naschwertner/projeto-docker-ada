## LINKS IMAGENS DOCKERHUB:
BANCO: https://hub.docker.com/repository/docker/nascw/projetodockernathalia-db/general
APLICAÇÃO: https://hub.docker.com/repository/docker/nascw/projetodockernathalia-app/general



## PASSO A PASSO DEPOIS DA CRIAÇÃO DOS ARQUIVOS DO PROJETO E DO BANCO (iniciar pelo mysql):


## 1. BUILD E CRIAÇÃO DAS IMAGENS 
##FAZER BUILD DA APLICAÇÃO 
Navegue até o diretório onde está o Dockerfile da aplicação.
Execute o seguinte comando no terminal, substituindo <nome_da_imagem_aplicacao> pelo nome que você deseja dar à imagem da aplicação:

docker build -t <nome_da_imagem_aplicacao> .


##FAZER O BUILD DO BANCO
Navegue até o diretório onde está o Dockerfile do banco e o arquivo schema.sql.
Execute o seguinte comando no terminal, substituindo <nome_da_imagem_banco> pelo nome que você deseja dar à imagem do seu banco de dados:

docker build -t <nome_da_imagem_banco> .

para listar as imagens criadas: docker images ls
imagem_aplicacao
imagem_banco



## 2. CRIAÇÃO DA REDE
É necessário criar a rede para que os dois conteiners consigam conversar (criar a rede antes de subir o conteiner e rodar o docker run)

docker network create <nome_da_rede>


para listar as imagens criadas: docker network ls
Usada nesse projeto: docker network create db-node



## 3. subir o conteiner com as duas imagens criadas
Iniciar os Contêineres
Após o build das imagens, você deve iniciar os contêineres usando os comandos docker run mencionados anteriormente. Certifique-se de que os nomes das imagens nos comandos docker run correspondam aos nomes que você usou durante o build.


Rodar os contêineres Docker
Após construir as imagens, você pode iniciar os contêineres. Primeiro, inicie o contêiner MySQL:
docker run --name mysql_container -e MYSQL_ROOT_PASSWORD=<senha_root> -d <nome_da_imagem_mysql>  


duvida de qual desses esta certo:


docker run -d -e VARIAVEL_DE_AMBIENTE=yes --name <nome-do-conteiner> -v NOME-DO-VOLUME:/caminho/no/conteiner/ <nome-da-imagem>

docker run -d -p 5001:5001 -e MYSQL_ALLOW_EMPTY_PASSWORD=True --name mysql_api_conteiner --network flask-mysql imagem_mysql    --> mysql_api_conteiner definido no arquivo app.py




############# INICIANDO CONTAINER FLASK
Então, inicie o contêiner Flask, assegurando-se de conectar à rede do MySQL para comunicação interna:
docker run --name flask_container --link mysql_container:mysql_api_conteiner -p 5000:5000 -d <nome_da_imagem_flask>


docker run -d -p 5000:5000 --name flask-conteiner --network <nome-da-rede>

docker run --name meu_container_flask --network flask-mysql -p 5000:5000 -d imagem_flask (comando utilizado)


nome da rede: flask-mysql
nome da imagem: imagem_flask

comando para listar containers --> docker ps 



## 4. Adicionando docker-compose.yml

docker-compose.yml substitui o docker run 


Explicação do docker-compose.yml:
version: Especifica a versão do docker-compose.yml. 
services: Define os serviços (containers) que fazem parte da sua aplicação.
app: O serviço da aplicação Flask.
build: Caminho para o diretório que contém o Dockerfile da aplicação Flask.
ports: Mapeia a porta 5000 do container para a porta 5000 do host.
depends_on: Garante que o serviço db seja iniciado antes do serviço app.
environment: Variáveis de ambiente necessárias para a configuração do Flask se conectar ao banco de dados MySQL.
db: O serviço do banco de dados MySQL.
build: Caminho para o diretório que contém o Dockerfile do MySQL.
environment: Variáveis de ambiente para definir a senha do root do MySQL (neste caso, deixada em branco) e o nome do banco de dados.
ports: Mapeia a porta 3306 do container para a porta 3306 do host.
volumes: Persiste os dados do MySQL entre as reinicializações do container usando um volume nomeado db-data.


Iniciar os Serviços: Na raiz do projeto, onde o docker-compose.yml está localizado, execute o comando:
docker-compose up --build


Parar os Serviços: Para parar os serviços e remover os containers, networks e volumes criados pelo docker-compose, execute:
docker-compose down -v