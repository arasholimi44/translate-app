
import {ITranslatePrimaryKey,ITranslateResultList, ITranslateRequest, ITranslateDbObject} from "@sff/shared-types"

  
  const URL = "https://2npt0aqfbs.execute-api.localhost.localstack.cloud:4566/prod/";
  // Translation function
  export const translateUsersText = async (request:ITranslateRequest) => {
    try {
      const result = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(request),
      
      });

      const rtnValue = (await result.json()) as ITranslateDbObject | string;
    if (!result.ok){
      throw new Error(rtnValue as string)
    }
    return rtnValue as ITranslateDbObject
    } catch (e: unknown) {
      console.error(e);
      throw e as Error;
    }
  };
  // Get translations function
 export const getUsersTranslations = async () => {
    try {
  
      const result = await fetch(URL, {
        method: "GET",
   });
  
      const rtnValue = (await result.json()) as ITranslateResultList;
      return rtnValue;
  
    } catch (e: unknown) { // Changed from 'any' to 'unknown'
      console.error("getTranslations error:", e);
      return [];
    }
  };

 export const deleteUsersTranslations = async (item: ITranslatePrimaryKey) => {
    try {
  
      const result = await fetch(URL, {
        method: "DELETE",
        body: JSON.stringify(item),
 
      });
  
      const rtnValue = (await result.json()) as ITranslatePrimaryKey;
      return rtnValue;
  
    } catch (e: unknown) { // Changed from 'any' to 'unknown'
      console.error("getTranslations error:", e);
      return [];
    }
  };