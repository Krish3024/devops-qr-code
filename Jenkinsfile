pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_HUB_REPO = "krish3024" // your Docker Hub username
        IMAGE_BACKEND = "qr-backend"
        IMAGE_FRONTEND = "qr-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/skrish3024/devops-qr-code.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_HUB_REPO/$IMAGE_BACKEND ./backend'
                    sh 'docker build -t $DOCKER_HUB_REPO/$IMAGE_FRONTEND ./frontend'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    sh 'echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin'
                    sh 'docker push $DOCKER_HUB_REPO/$IMAGE_BACKEND'
                    sh 'docker push $DOCKER_HUB_REPO/$IMAGE_FRONTEND'
                }
            }
        }
    }
}
