import type { AWS } from '@serverless/typescript';
import { getUser, createUser, updateUser, deleteUser, getWeather, getGoldSilverPrice } from './src/functions';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });

const tableName: string = 'userTable'
const API_KEY: string = process.env.API_KEY!;
const API_KEY2: string = process.env.API_KEY2!;

const serverlessConfiguration: AWS = {
  service: 'contact-center',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    tableName
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    profile: 'serverlessUser',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      tableName,
      API_KEY,
      API_KEY2
    },
    iamRoleStatements: [
      {
        "Effect": "Allow",
        "Action": [
          "dynamodb:*"
        ],
        "Resource": "*"
      }
    ],
    lambdaHashingVersion: '20201221',
  },
  functions: { 
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getWeather,
    getGoldSilverPrice,
  },
  
  resources: {
    Resources: {
      MyDynamoDbTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: tableName,
          AttributeDefinitions: [
            {
              AttributeName: "phoneNumber",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "phoneNumber",
              KeyType: "HASH"
            }
          ],
          BillingMode: "PAY_PER_REQUEST"
        }
      }
    }
  }
}

module.exports = serverlessConfiguration;
