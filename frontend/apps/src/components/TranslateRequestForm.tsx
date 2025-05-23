"use client"; 
import { useTranslate } from "@/hooks"
import { ITranslateRequest } from "@sff/shared-types"
import React, { useEffect } from "react"
import {useForm, SubmitHandler} from "react-hook-form"
import { useApp } from "./AppProvider";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export const TranslateRequestForm = () =>{
const { translate, isTranslating,translateError} = useTranslate()
const { setError, selectedTranslation } = useApp();


    const{
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    }=useForm<ITranslateRequest>()


    useEffect(() => {
      if (translateError) {
        setError(translateError.message)
      }
    }, [translateError, setError])

    useEffect(() => {
      if (selectedTranslation) {
        setValue("sourceLang", selectedTranslation.sourceLang);
        setValue("targetLang", selectedTranslation.targetLang);
        setValue("sourceText", selectedTranslation.sourceText);
      }
    }, [selectedTranslation, setValue])

    const onSubmit: SubmitHandler<ITranslateRequest> = (data, event) => {
      if (event) event.preventDefault();
        console.log("call on translate")
        translate(data, {
          onError: () => {
            // This will be caught by the useEffect above
          }
        })
    }

    return(
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}
        >
                  {/* Your form inputs remain the same */}
                  <div className="flex flex-col">
                    <Label htmlFor="sourceText" className="mb-2 font-medium">Input Text</Label>
                    <Textarea
                      id="sourceText"
                      {...register("sourceText",{required: true})}
                      // className="p-3 border rounded-md min-h-[120px] text-base font-mono"
                    />
                    {errors.sourceText && <span>field is required</span>}
                  </div>
            
                  <div className="flex flex-col">
                    <Label htmlFor="sourceLang" className="mb-2 font-medium">Source Language</Label>
                    <Input
                      id="sourceLang"
                      {...register("sourceLang",{required: true})}
                      // className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                     {errors.sourceLang && <span>field is required</span>}

                  </div>
            
                  <div className="flex flex-col">
                    <Label htmlFor="outputLang" className="mb-2 font-medium">Target Language</Label>
                    <Input
                      id="outputLang"
                      {...register("targetLang",{required: true})}
                    />
                     {errors.targetLang && <span>field is required</span>}
                  </div>
            
                  <Button
                    type="submit">
                    {isTranslating ? "translating..." : "Translate"}
                  </Button>

                  <div className="flex flex-col">
                    <Label htmlFor="targetText">Translated Text</Label>
                    <Textarea
                    readOnly
                      id="targetText"
                     value={selectedTranslation?.targetText}
                      // className="p-3 border rounded-md min-h-[120px] text-base font-mono"
                    />
                    {errors.sourceText && <span>field is required</span>}
                  </div>

                </form>
            
    )
}