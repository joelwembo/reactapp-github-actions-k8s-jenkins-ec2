pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '3'))
      }
      environment {
        DOCKERHUB_CREDENTIALS = credentials('globaldockerhub')
      }
    tools { nodejs "NodeJS"}  
    stages{
         stage('Environment') {
          steps{
            sh 'git --version'
            sh 'docker -v'
            sh 'node -v'
          }
        }
        stage('Code'){
            steps{
                git url: 'https://github.com/joelwembo/reactprodx-k8s-jenkins.git' , branch : 'main'
            }
        }
        stage('Dependencies') {
            steps{
            sh 'npm install --legacy-peer-deps'
            }
        }
        // stage('Unit Test 1'){
        //     steps{
        //         sh "npm run test"
        //     }
        // }
        
        stage('Build'){
            steps{
                sh 'docker-compose down'
                sh 'docker build -t joelwembo/reactprodx:latest  --no-cache .'
            }
        }
        
        stage('Login') {
          steps {
            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
          }
        }

        stage('Docker Push') {
          steps {
            sh 'docker push joelwembo/reactprodx:latest'
          }
        }
        stage('Deploy'){
            steps{
                sh "docker-compose down"
                sh "docker-compose up -d"
                sh 'docker image ls'
                sh 'docker images --filter "reference=reactprodx*"'         
            }
        }

      //   stage('Kubernetes') {
      //     steps {
      //       sh 'wget https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64'
      //       sh 'cp minikube-linux-amd64 /usr/local/bin/minikube'
      //       sh 'sudo chmod +x /usr/local/bin/minikube'
      //       sh 'sudo minikube start --driver=docker --force'
      //       sh 'sudo minikube ip'
      //       // sh 'kubectl cluster-info'
      //       // dir('deployments') {
      //       //   sh 'kubectl delete namespace reactprodx'
      //       //   sh 'kubectl create namespace reactprodx'
      //       //   sh 'kubectl config set-context --current --namespace=reactprodx'
      //       //   sh 'kubectl apply -f deployment.yaml'
      //       // }    
      //       // sh 'kubectl get services && kubectl get pods'
      //       // sh 'minikube service reactprodx -n  reactprodx &'
      //       sh 'exit 0'
      // }
    }   
    
}
