# Deploying react to kubernetes / aws ec2 using Jenkins

![image](https://github.com/joelwembo/reactprodx-k8s-jenkins/assets/19718580/7a3f2005-6d9c-4f42-b138-12bbb01e3f5e)

# Tools

- NodeJS
- React
- Jenkins
- Kubernetes
- Docker
- Docker Compose
- AWS EC2 / Digital Ocean
- Github Actions
- Vagrant
- ArgoCD

## Usage

<!-- #default-branch-switch -->

1. Copy the files into your project, or one of the [example projects](https://github.com/mui/material-ui/tree/master/examples).
2. Make sure your project has the required dependencies: @mui/material, @mui/icons-material, @emotion/styled, @emotion/react, recharts.
3. Import and use the `Dashboard` component.

## Demo

<!-- #default-branch-switch -->

View the demo at https://mui.com/material-ui/getting-started/templates/dashboard/.


# Using docker

1. DOCKER_SCAN_SUGGEST=false docker build -t reactprodx .

For building an image to be push to dockerhub
DOCKER_SCAN_SUGGEST=false docker build -t joelwembo/reactapp:latest .

push docker image to dockerhub

2. docker push joelwembo/reactprodx:latest
3. docker run -p 80:80 --name react reactprodx  
OR
docker run -d -p 3000:80 reactprodx


# Terraform Provisionning

aws_instance.project-iac (remote-exec): commit: fd7ecd9c4599bef9f04c0986c4a0187f98a4396e
aws_instance.project-iac (remote-exec): Minikube Installed successfully installer
aws_instance.project-iac (remote-exec):   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
aws_instance.project-iac (remote-exec):                                  Dload  Upload   Total   Spent    Left  Speed
aws_instance.project-iac (remote-exec):   0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
aws_instance.project-iac (remote-exec):   1 44.4M    1  552k    0     0   595k      0  0:01:16 --:--:--  0:01:16  594k
aws_instance.project-iac (remote-exec):  35 44.4M   35 15.8M    0     0  8442k      0  0:00:05  0:00:01  0:00:04 8438k
aws_instance.project-iac: Still creating... [5m20s elapsed]
aws_instance.project-iac (remote-exec):  81 44.4M   81 36.3M    0     0  12.4M      0  0:00:03  0:00:02  0:00:01 12.4M
aws_instance.project-iac (remote-exec): 100 44.4M  100 44.4M    0     0  13.1M      0  0:00:03  0:00:03 --:--:-- 13.1M
aws_instance.project-iac (remote-exec): Kubeclt Installed successfully installer
aws_instance.project-iac: Creation complete after 5m22s [id=i-0c8c9dd49e22b82e4]

Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
Outputs:
ec2instance = "18.141.000.159"

 ssh -i "ProctKeyPair.pem" ubuntu@ec2-18-141-186-159.ap-southeast-1.compute.amazonaws.com

# cleanup
docker container rm reactprodx
OR
docker image rm reactprodx:latest

# Jenkins

Step 1


# Jenkins installations
- sudo apt-get install debian-keyring debian-archive-keyring --assume-yes
- sudo apt-key update
- sudo apt-get update
- sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 40976EAF437D05B5
- sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5BA31D57EF5975CA
- sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 3B4FE6ACC0B21F32
- sudo apt update
- sudo apt install openjdk-11-jre-headless --assume-yes
- sudo java -version
- curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
- echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
- sudo apt-get update
- sudo apt-get install jenkins --assume-yes

- Step 1
First open the /etc/default/jenkins file.
Then under JENKINS_ARGS section, you can change the port like this HTTP_PORT=8181.

Then you should restart Jenkins with sudo service jenkins restart.

Then to check the status use this command sudo systemctl status jenkins

- Step 2

vim /usr/lib/systemd/system/jenkins.service

change the port in the line

Environment="JENKINS_PORT=8181"

systemctl daemon-reload
systemctl restart jenkins.service

- Step 3

Navigate to http://xxxx:8181/login?from=%2F

cat /var/lib/jenkins/secrets/initialAdminPassword

- Step 4 

- Navigate to Manage Jenkins and install Nodejs and Docker required plugins

- Navigate to Manage Jenkins and Configure Nodes and Docker tools 
  choose node 18.9.1 and add docker main registry and your docker ip


- Step 5

- Setup Github credentials globally
- Setup aws token
- setup webhook on github : http://18.xxxx.59:8181/github-webhook/

- Step 6

# Setup Jenkins Multibranch Pipeline


# Kubernetes

Requirement

- minikube start --driver=docker --force
- minikube ip = 192.168.49.2

- kubectl cluster-info
- Kubernetes control plane is running at https://192.168.49.2:8443
        CoreDNS is running at https://192.168.49.2:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

1. DOCKER_SCAN_SUGGEST=false docker build -t joelwembo/reactprodx:latest .
2. docker run -d -p 80:80 --name reactwebapp2 joelwembo/reactprodx   OR  docker run -d -p 80:80 reactprodx
3. docker push joelwembo/reactprodx:latest
4. minikube start --driver=docker --force
5. - kubectl delete namespace reactprodx
   - kubectl create namespace reactprodx
6. kubectl config set-context --current --namespace=reactprodx
7. kubectl apply -f deployment.yaml
8. kubectl apply -f load-balancer.yaml
9. kubectl get services -w
9. minikube deployment
     - minikube service reactprodx -n reactprodx
    

NAMESPACE  |    NAME    | TARGET PORT |            URL            |
|------------|------------|-------------|---------------------------|
| reactprodx | reactprodx |        8080 | http://192.168.49.2:31000 |
NAMESPACE  |    NAME    | TARGET PORT |          URL           |
|------------|------------|-------------|------------------------|
| reactprodx | reactprodx |             | http://127.0.0.1:55110 |

10. kubectl scale deployment reactprodx --replicas=3

11. Check Services and running pods
   - kubectl get pods
   - kubectl get nodes
   - kubectl describe pod reactprodx-6f547c9f6b-zvlrc

# Important Commands
minikube ip
docker run -d -p 5000:5000 --name reactwebapp1 joelwembo/reactprodx

# Vagrant

# Prometheus

Prometheus (metrics database) http://<host-ip>:9090
Prometheus-Pushgateway (push acceptor for ephemeral and batch jobs) http://<host-ip>:9091
AlertManager (alerts management) http://<host-ip>:9093
NodeExporter (host metrics collector)
cAdvisor (containers metrics collector)
Caddy (reverse proxy and basic auth provider for prometheus and alertmanager)

# Grafana

Grafana (visualize metrics) http://<host-ip>:3000

# Elastic Search

# Slack / Jira Connection

