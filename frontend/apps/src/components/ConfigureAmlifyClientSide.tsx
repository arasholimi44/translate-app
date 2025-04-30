"use client"
import {Amplify} from "aws-amplify"

Amplify.configure({
    Auth:{
        Cognito:{
             userPoolId: "",
             userPoolClientId:"",
           
        },
    },
},
{ssr: true}
);

export function ConfigureAmplify(){
    return null;
}