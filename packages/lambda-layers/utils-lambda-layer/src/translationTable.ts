import * as dynamodb from "@aws-sdk/client-dynamodb"
import {marshall, unmarshall} from "@aws-sdk/util-dynamodb"
import { ITranslateDbObject } from "@sff/shared-types";


export class TranslationTable {
    tableName: string;
    partitionKey: string;
    
    dynamodbClient: dynamodb.DynamoDBClient

    constructor({tableName,partitionKey }:{
        tableName: string,
        partitionKey: string,
        
    }){
        this.tableName = tableName;
        this.partitionKey =partitionKey;
        
        this.dynamodbClient = new dynamodb.DynamoDBClient({});
    }

    async insert(data: ITranslateDbObject){

        const tableInsetCmd: dynamodb.PutItemCommandInput = {
            TableName: this.tableName,
            Item: marshall(data)
          };

          await this.dynamodbClient.send(new dynamodb.PutItemCommand(tableInsetCmd));
    }

    async query({requestId}:{requestId: string}){

        const queryCmd: dynamodb.QueryCommandInput = {
            TableName: this.tableName,
            KeyConditionExpression:"#PARTITION_KEY = :partitionValue",
            ExpressionAttributeNames: {
                "#PARTITION_KEY":this.partitionKey
            },
            ExpressionAttributeValues:{
                ":partitionValue": {S: requestId}
            },
            ScanIndexForward: true,
          };

          const {Items}=await this.dynamodbClient.send(new dynamodb.QueryCommand(queryCmd));
          if (!Items){
            return[]
          }
          const rtnData = Items.map(item => unmarshall(item) as ITranslateDbObject);
          return rtnData;   
    }


    async getAll(){

        const scanCmd: dynamodb.ScanCommandInput = {
            TableName: this.tableName,
          };
      
          const {Items} = await this.dynamodbClient.send(
            new dynamodb.ScanCommand(scanCmd));
          
          if (!Items){return[];}

        const rtnData = Items.map(item => unmarshall(item) as ITranslateDbObject);
        return rtnData;
    }

    async delete({requestId}:{ requestId: string}){

        const deleteCmd: dynamodb.DeleteItemCommandInput = {
            TableName: this.tableName,
            Key:{
                [this.partitionKey]: {S: requestId},
                
            }
          };

          await this.dynamodbClient.send(new dynamodb.DeleteItemCommand(deleteCmd));
          return this.getAll();
    }

}