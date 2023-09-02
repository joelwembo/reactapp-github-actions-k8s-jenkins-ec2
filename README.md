# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# app ether main
npm install
npm start

# Using docker
1. DOCKER_SCAN_SUGGEST=false docker build -t reactprodx .

For building an image to be push to dockerhub
DOCKER_SCAN_SUGGEST=false docker build -t joelwembo/reactprodx:latest .

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
ec2instance = "18.141.186.159"

 ssh -i "ProctKeyPair.pem" ubuntu@ec2-18-141-186-159.ap-southeast-1.compute.amazonaws.com

# cleanup
docker container rm reactprodx
OR
docker image rm reactprodx:latest

# Jenkins

Step 1


# Jenkins installations
sudo apt-get install debian-keyring debian-archive-keyring --assume-yes
sudo apt-key update
sudo apt-get update
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 40976EAF437D05B5
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5BA31D57EF5975CA
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 3B4FE6ACC0B21F32
sudo apt update
sudo apt install openjdk-11-jre-headless --assume-yes
sudo java -version
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install jenkins --assume-yes

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

Navigate to http://18.141.186.159:8181/login?from=%2F

cat /var/lib/jenkins/secrets/initialAdminPassword

- Step 4 

- Navigate to Manage Jenkins and install Nodejs and Docker required plugins

- Navigate to Manage Jenkins and Configure Nodes and Docker tools 
  choose node 18.9.1 and add docker main registry and your docker ip


- Step 5

- Setup Github credentials globally
- Setup aws token
- setup webhook on github : http://18.141.186.159:8181/github-webhook/

- Step 6

# Setup Jenkins Multibranch Pipeline
![Configure-nodejs-tools](https://github.com/joelwembo/reactprodx-k8s-jenkins/assets/19718580/6b6a3f58-8ec2-4038-a155-91b46b638804)

![Install-node-docker-plugins](https://github.com/joelwembo/reactprodx-k8s-jenkins/assets/19718580/baf81351-1900-4982-802b-3e5b36ae8772)

![pluginsinstallations](https://github.com/joelwembo/reactprodx-k8s-jenkins/assets/19718580/4d3cc671-5f29-4d9b-833b-e20639fa8f3e)

![Screenshot 2023-09-02 195223](https://github.com/joelwembo/reactprodx-k8s-jenkins/assets/19718580/217d5893-19cd-415c-a647-4963788f754a)


![Screenshot 2023-09-02 195411](https://github.com/joelwembo/reactprodx-k8s-jenkins/assets/19718580/d3386eb5-45bd-4678-b39d-5c81cb61879b)


![Screenshot 2023-09-02 200229](https://github.com/joelwembo/reactprodx-k8s-jenkins/assets/19718580/6aca64a2-c5bb-4605-afe2-80b35258890a)


![Screenshot 2023-09-02 200555](https://github.com/joelwembo/reactprodx-k8s-jenkins/assets/19718580/46ed4a0c-891e-4eec-8c22-0d21ba62a80d)

![Screenshot 2023-09-02 203047](https://github.com/joelwembo/reactprodx-k8s-jenkins/assets/19718580/b4e36a92-74a8-4b3b-a119-c05a456be550)


# Kubernetes

1. DOCKER_SCAN_SUGGEST=false docker build -t reactprodx .
2. docker run -d -p 80:80 --name react reactprodx   OR  docker run -d -p 3000:80 reactprodx
3. docker push joelwembo/reactprodx:latest
4. minikube start --driver=docker --force
5. kubectl create namespace reactprodx-nginx-deployment
6. kubectl config set-context --current --namespace=reactprodx-nginx-deployment
7. kubectl apply -f deployment.yaml
8. kubectl apply -f load-balancer.yaml
9. kubectl get services -w
9. minikube ip
10. kubectl scale deployment react-docker --replicas=10


# Important Commands
minikube ip