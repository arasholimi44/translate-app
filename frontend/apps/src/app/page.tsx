"use client";
import { useState } from "react";
import {ITranslateDbObject, ITranslateRequest, ITranslateResponse} from "@sff/shared-types"

const URL ="https://y7vgeebwcd.execute-api.localhost.localstack.cloud:4566/prod/"

 const translateText= async({
  inputLang,
  outputLang,
  inputText,
}: {
  inputLang: string;
  outputLang: string;
  inputText: string;

}) => {
  try{
  const request: ITranslateRequest = {
  sourceLang: inputLang,
  targetLang: outputLang,
  sourceText: inputText
  }

  const result = await fetch(URL, {
    method: "POST",
body: JSON.stringify(request),
  });

  const rtnValue = await result.json() as ITranslateResponse;
  return rtnValue;
}catch(e: unknown) {
  console.error(e);
  throw e as Error;  // Only use if you're certain
}
};

 const getTranslations= async() => {
  try{
  

  const result = await fetch(URL, {
    method: "GET",
  });

  const rtnValue = await result.json() as Array<ITranslateDbObject>;
  return rtnValue;
}catch(e: unknown) {
  console.error(e);
  throw e as Error;  // Only use if you're certain
}
};


export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [inputLang, setInputLang] = useState<string>("");
  const [outputLang, setOutputLang] = useState<string>("");
  const [outputText, setOutputText] = useState<ITranslateResponse | null>(null);
  const [translations, setTranslations] = useState<Array<ITranslateDbObject>>([]);

  return (
    <main className="flex flex-col m-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Translate</h1>
  
      <form className="flex flex-col gap-6" onSubmit={async (event) => {
        event?.preventDefault();
        const result = await translateText({ inputText, inputLang, outputLang });
        setOutputText(result);
      }}>
        <div className="flex flex-col">
          <label htmlFor="inputText" className="mb-2 font-medium">Input Text</label>
          <textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="p-3 border rounded-md min-h-[120px] text-base focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>
  
        <div className="flex flex-col">
          <label htmlFor="inputLang" className="mb-2 font-medium">Source Language</label>
          <input
            id="inputLang"
            value={inputLang}
            onChange={(e) => setInputLang(e.target.value)}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div className="flex flex-col">
          <label htmlFor="outputLang" className="mb-2 font-medium">Target Language</label>
          <input
            id="outputLang"
            value={outputLang}
            onChange={(e) => setOutputLang(e.target.value)}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <button
          type="submit"
          className="p-2 mt-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700"
        >
          Translate
        </button>
      </form>
  
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Result:</h2>
        <pre className="p-3 bg-gray-100 border rounded whitespace-pre-wrap font-mono">
          {JSON.stringify(outputText)}
        </pre>
      </div>
  
      <button
        type="button"
        onClick={async () => {
          const rtnValue = await getTranslations();
          setTranslations(rtnValue);
        }}
        className="p-2 mt-6 rounded-xl text-white bg-blue-600 hover:bg-blue-700"
      >
        Get Translations
      </button>
  
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">All Translations:</h2>
        <div className="space-y-4">
          {translations.map((item) => (
            <div key={item.requestId} className="p-3 border rounded bg-gray-50">
              <p><strong>{item.sourceLang}:</strong> {item.sourceText}</p>
              <p><strong>{item.targetLang}:</strong> {item.targetText}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
