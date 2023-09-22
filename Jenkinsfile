pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
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
                git url: 'https://github.com/joelwembo/reactprodx-k8s-jenkins.git' 
            }
        }
        stage('Dependencies') {
            steps{
            sh 'npm install --legacy-peer-deps'
            // sh 'chmod 777 ./deployments/installer.sh'
            //   dir('deployments') {
            //     sh "installer.sh || exit 0"
            //   } 
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
        stage('Push') {
          steps {
            sh 'docker push joelwembo/reactprodx:latest'
          }
        }
        // stage('Manuel Test'){
        //     steps{
        //         sh "npm run test"
        //     }
        // }
        stage('Deploy'){
            steps{
                sh "docker-compose down"
                sh "docker-compose up -d"
                sh 'docker image ls'
                sh 'docker images --filter "reference=reactprodx*"'         
            }
        }

        stage('Deploy to AKS') {
          steps {
            sh 'minikube ip'
            sh 'kubectl cluster-info'
            dir('deployments') {
              sh 'kubectl delete namespace reactprodx'
              sh 'kubectl create namespace reactprodx'
              sh 'kubectl config set-context --current --namespace=reactprodx'
              sh 'kubectl apply -f deployment.yaml'
            }    
            sh 'kubectl get services && kubectl get pods'
            sh 'minikube service reactprodx -n  reactprodx &'
            sh 'exit 0'
      }
    }

        // stage('SendEmail'){
        //     steps{
        //         emailext(attachLog: true, body: 'HelloEmIl body', subject: 'This is Nodejs Test subject', to: 'joelwembo@outlook.ph')      
        //     }
        // }

     
    }
}