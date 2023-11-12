# Branak Front End Project

## Project built with React and AWS Amplify 

## Requirements: 
-  NODE VERSION 14.17.0
-  yarn (npm install -g yarn@1.22.17) 
-  aws-amplify cli (npm install -g @aws-amplify/cli@7.6.21)

## Steps to initialize

- clone the repository
- cd into the repository
- Execute 'yarn' to install dependecies (prefer yarn over npm, npm takes a lot of time and has issues)
- Fix core.autocrlf (on windows) run the command "git config --local core.autocrlf false"
  (this fixes file endings, so you don´t get unexpected changes to cloudformation
  templates)
- Go to AWS console (https://branak.signin.aws.amazon.com/console) login with the user
  given to you
- Create programmatic access keys (accessKeyId and secretAccessKey) and copy them
- install aws cli (https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- open a terminal
- configure a profile using aws configure --profile branak
- enter accessKeyId, secret accessKey, region: us-east-1, output format: json
- execute: amplify init
- for environment choose dev
- answer the questions
- Do you want to use an AWS profile? choose Yes and select the branak profile created
  before.
  
## Steps to Develop and Deploy a Feature
- Create a branch with the prefix feature/ for example feature/awesome-feature
- Develop the awesome feature and push you branch
- A deployed URL will be created with the format https://awesome-feature.d45r546pjmip2.amplifyapp.com/ that you can share to show your work
- Check the deploy status in https://console.aws.amazon.com/amplify/home?region=us-east-1&code=fbf5c39170c916fe7e9b#/d45r546pjmip2
- If you need to modify the Graphql schema, first develop locally using amplify mock api, then update the Graphql in the cloud using amplify push, and lastly push you changes to git to init a delpoyment.

## Steps to Deploy to Production

- Create a PR, once accepted it will be automatically deploy to production.


## Database development
The project uses DynamoDB exposed via GraphQL from AppSync, get familiar with modeling data see https://docs.amplify.aws/cli/graphql/data-modeling/  