pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '3'))
      }
      environment {
        DOCKERHUB_CREDENTIALS = credentials('globaldockerhub')
        appName = "reactfr"
      //   registry = ""
      //   registryCredential = ""
      //   projectPath = ""
      //   AWS_ACCESS_KEY_ID = ocredentials('your_aws_access_key_id')
      //   AWS_SECRET_ACCESS_KEY = credentials('your_aws_secret_access_key')
      //   AWS_REGION = 'your_aws_region'
      //   EC2_INSTANCE = 'your_ec2_instance_id'
      //   SSH_KEY = credentials('your_ssh_key')
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
                git url: 'https://github.com/joelwembo/reactapp-github-actions-k8s-jenkins-ec2.git'
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
      //       sh 'sudo minikube start --driver=docker --force'
      //       sh 'sudo minikube ip'
      //       sh 'kubectl cluster-info'
      //       dir('deployments') {
      //         sh 'kubectl delete namespace reactprodx'
      //         sh 'kubectl create namespace reactprodx'
      //         sh 'kubectl config set-context --current --namespace=reactprodx'
      //         sh 'kubectl apply -f deployment.yaml'
      //       }    
      //       sh 'kubectl get services && kubectl get pods'
      //       sh 'minikube service reactprodx -n  reactprodx &'
      //       sh 'exit 0'
      //     }
      // }
      // stage('Deploy to AWS') {
      //       steps {
      //            dir('deployments') {
      //               sh "pwd"
      //               sh "chmod +x -R ./deploy-aws-ec2.sh"
      //               sh 'docker images --filter "reference=reactprodx*"' 
      //               sh './deploy-aws-ec2.sh'
      //            }
              
      //       }
      //   } 
    }   

    // post {
    //         success {
    //             script {
    //                 currentBuild.result = 'SUCCESS'
    //                 slackSend(color: 'good', message: "Deployment successful! :tada:", channel: "#DEV")
    //                 emailext subject: 'Deployment Successful',
    //                         body: 'Deployment was successful!',
    //                         recipientProviders: [[$class: 'CulpritsRecipientProvider']]
    //             }
    //         }
    //         failure {
    //             script {
    //                 currentBuild.result = 'FAILURE'
    //                 slackSend(color: 'danger', message: "Deployment failed. :x:", channel: "#DEV")
    //                 emailext subject: 'Deployment Failed',
    //                         body: 'Deployment failed!',
    //                         recipientProviders: [[$class: 'CulpritsRecipientProvider']]
    //             }
    //         }

    //     }
    
}
