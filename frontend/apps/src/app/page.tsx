"use client";
import { useTranslate } from "@/hooks";
import { TranslateCard, TranslateRequestForm, useApp } from "@/components";
import {ResizableHandle,ResizablePanel,ResizablePanelGroup,
} from "@/components/ui/resizable"
import { createRef, useEffect } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { LoadingPage } from "@/components/ui/loading";




export default function Home() {
  const {user, translations,isLoading,
  } = useTranslate();

  const {selectedTranslation,setSelectedTranslation}= useApp()
  const leftPanelRef = createRef<ImperativePanelHandle>();

if (isLoading) {
    return <LoadingPage />;
 }
 
  useEffect(() => { 
    if (!leftPanelRef.current){
      return
    }

if (user){
  leftPanelRef.current?.expand()
} else{
  leftPanelRef.current?.collapse()
}
  },[user]

)
 
 

  return (
    <main className="flex flex-col h-screen">

      <ResizablePanelGroup direction="horizontal">

      <ResizablePanel collapsible ref={leftPanelRef}>
        <div className="bg-gray-900 w-full h-full flex flex-col space-y-2 p-2">
        <h1 className=" text-white text-xl font-bold mb-4">All Translations:</h1>
      
        {!user ? (
          <p className="text-gray-400">Sign in to see your translations.</p>
        ) : (
          <div className="flex flex-col space-y-1">
            {translations.map((item) => (
         <TranslateCard 
         selected ={item.requestId === selectedTranslation?.requestId}
         onSelected={setSelectedTranslation}
         key={item.requestId} translateItem={item}/>
            ))}
          </div>
        )}
      </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

<ResizablePanel>
  <div className="p-4"> 
   <TranslateRequestForm /></div>
  </ResizablePanel>

    </ResizablePanelGroup>
      

      
    </main>
  );
}
