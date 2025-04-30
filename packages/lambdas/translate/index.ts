import * as lambda from "aws-lambda";
import {ITranslateDbObject, ITranslateRequest, ITranslateResponse} from "@sff/shared-types"
import * as dynamodb from "@aws-sdk/client-dynamodb"
import {marshall, unmarshall} from "@aws-sdk/util-dynamodb"
import { gateway, apertiumTranslator, TranslationTable } from "utils-lambda-layer"

const {  TRANSLATION_TABLE_NAME,TRANSLATION_PARTITION_KEY}= process.env;

if (!TRANSLATION_TABLE_NAME){ throw new Error("TRANSLATION_TABLE_NAME is empty");}
if (!TRANSLATION_PARTITION_KEY){ throw new Error("TRANSLATION_PARTITION_KEY is empty");}


const translateTable = new TranslationTable ({
  tableName: TRANSLATION_TABLE_NAME,
  partitionKey: TRANSLATION_PARTITION_KEY
})

export const translate: lambda.APIGatewayProxyHandler = async function (
  event: lambda.APIGatewayProxyEvent,
  context: lambda.Context
) {
  try {
    if (!event.body) {
      throw new Error("Missing request body");
    }

    let body = JSON.parse(event.body) as ITranslateRequest;
    
    if (!body.sourceLang){throw new Error("sourceLang is missing");}
    if (!body.targetLang){throw new Error("targetLang is missing");}
    if (!body.sourceText){throw new Error("sourceText is missing");}

    const { sourceLang, targetLang, sourceText } = body
    const now = new Date().toISOString();

 /// here the Lambda Layer (apertiumTranslator) do the translate function which is localy done in Docker
    const result  = await apertiumTranslator(body);

    const rtnData: ITranslateResponse = {
      timestamp: now,
      targetText: result.responseData?.translatedText || result.responseData,
    };

 /// Organizing translation in variable called tableObj and ready to pass it translateTable.insert 
    const tableObj: ITranslateDbObject = {
      requestId: context.awsRequestId,
      ...body,
      ...rtnData,
    };
 /// here the lambda Layer (translateTable) gonna put item in Database (dynamoDB**)
    await translateTable.insert(tableObj);
    return gateway.createSuccessJsonResponse(rtnData);

  } catch (e: any) {
    console.error(e);
    return gateway.createErrorJsonResponse(e)
  
  }
};


export const getTranslation: lambda.APIGatewayProxyHandler = async function (
  event: lambda.APIGatewayProxyEvent,
  context: lambda.Context
) {

  try{ 
  const rtnData = await translateTable.getAll();
  return gateway.createSuccessJsonResponse(rtnData);
} catch (e: any) {
  console.error(e);
  return gateway.createErrorJsonResponse(e)
}
};

