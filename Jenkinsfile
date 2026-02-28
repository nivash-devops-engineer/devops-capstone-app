pipeline {
    agent any

    environment {
        IMAGE_NAME = "yourdockerhubusername/devops-capstone-app"
        APP_SERVER = "ubuntu@APP_SERVER_IP"
    }

    stages {

        stage('Clone') {
            steps {
                git 'https://github.com/YOUR-USERNAME/devops-capstone-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                        docker login -u $USER -p $PASS
                        docker push $IMAGE_NAME:$BUILD_NUMBER
                    '''
                }
            }
        }

        stage('Deploy to App Server') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no $APP_SERVER "
                docker pull $IMAGE_NAME:$BUILD_NUMBER &&
                docker stop app || true &&
                docker rm app || true &&
                docker run -d -p 5000:5000 --name app $IMAGE_NAME:$BUILD_NUMBER
                "
                '''
            }
        }
    }
}
