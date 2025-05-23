"use client";

import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner"; // or replace with `sonner`
import { Session } from "next-auth";
import { ITranslateDbObject } from "@sff/shared-types";

type IAppContext = {
   user: Session["user"] | null | undefined;
   setUser: (user: Session["user"] | null) => void;
   setError: (msg: string) => void;
   resetError: () => void;
   selectedTranslation: ITranslateDbObject |null,
   setSelectedTranslation: (item:ITranslateDbObject) => void
}
const AppContext = createContext<IAppContext>({
   user: null,
   setUser: () => {},
   setError: () => {},
   resetError: () => {},
   selectedTranslation: null,
   setSelectedTranslation: () => {}
  
 });
 function useInitialApp(): IAppContext {

   const [user, setUser] = useState<Session["user"] | null | undefined>(undefined);
   const[selectedTranslation, setSelectedTranslation] = useState<ITranslateDbObject |null>(null);

   return {
     user,
     setUser,
     setError: (msg) => {
      console.error(msg);
      toast("Error: " + msg);
     },
     resetError: () => {
      toast.dismiss();
     },
     selectedTranslation,
     setSelectedTranslation

   };
 }

 export function AppProvider({ children }: { children: React.ReactNode }) {
   const initialValue = useInitialApp();
   return (
     <AppContext.Provider value={initialValue}>{children}</AppContext.Provider>
   );
 }
 
 export function useApp() {
   return useContext(AppContext);
 }