pipeline {
    agent any

    stages {
        stage('Build Static Pages') {
            steps {
                //sh 'git clone https://github.com/revature-rss-ben-1370/e-commerce-frontend.git'
                nodejs(nodeJSInstallationName: 'npm') {
                    sh 'npm --version'
                    dir('./e-commerce-frontend'){
                        sh 'npm install' 
                        //sh 'cat package.json'
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('upload static pages to s3'){
            steps {
                echo 'echo jenkins workspace stage 2'
				sh 'ls -al'
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'UploadStaticPagesToS3Bucket', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    //s3Upload(bucket:"2205java-sre-p3", path:'', includePathPattern:'**/*', workingDir:'./e-commerce-frontend/build')
                }
            }
        }
    }
}
