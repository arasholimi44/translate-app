import {APIGatewayProxyResult} from 'aws-lambda'

export const createGatewayResponse = ({
    statusCode,
    body
}: {
    statusCode: number,
    body: string
}): APIGatewayProxyResult => {
 return {
    statusCode,
    headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
    body,
  };
}

export const createSuccessJsonResponse = (body: object) => createGatewayResponse({
        statusCode: 200,
        body: JSON.stringify(body)
    });

    export const createErrorJsonResponse = (error: any) => createGatewayResponse({
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || "Unknown error",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      }),
    });  

  