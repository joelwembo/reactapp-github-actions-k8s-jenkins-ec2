node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
    }
    stage('Build Docker Image'){
     sh 'docker build -t reactprodx:lastest .'
    }
    stage('Publish Image'){
     sh 'docker push joelwembo/reactprodx:latest'
    }
     stage('Test Application'){
     sh 'docker run -d -p 3000:80 reactprodx'
    }
    // stage('Docker test'){
    //   sh 'docker run --rm react-test'
    // }
    // stage('Clean Docker test'){
    //   sh 'docker rmi react-test'
    // }
    stage('Deploy'){
      if(env.BRANCH_NAME == 'master'){
        sh 'docker build -t reactprodx --no-cache .'
        sh 'docker tag reactprodx localhost:5000/reactprodx'
        sh 'docker push localhost:5000/reactprodx'
        sh 'docker rmi -f reactprodx localhost:5000/reactprodx'
      }
    }
  }
  catch (err) {
    throw err
  }
}