# DOCKER_SCAN_SUGGEST=false docker build -t reactprodx .
# docker run -p 80:80 --name react reactprodx

docker-compose down &&  docker-compose build --no-cache && docker-compose up

# docker-compose -f ./deployments/traefik/docker-compose-ssl.yml up -d
# DOCKER_SCAN_SUGGEST=false docker build -t reactprodx:latest .
# docker-compose -f ./docker-compose-ssl.yml up -d