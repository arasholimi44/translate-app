"use client"; 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { translateApi } from "@/lib";
import { ITranslatePrimaryKey, ITranslateRequest } from "@sff/shared-types";
import { useApp } from "@/components";
import { useUSer } from "./useUser";


export const useTranslate = () => {
  const { user } = useUSer();
  const {  setError, setSelectedTranslation} = useApp(); // ✅ use `user` from your custom hook
  const queryClient = useQueryClient();
  const queryKey = ["translate"];
 


  const translateQuery = useQuery({
    queryKey,
    queryFn: () => {
      console.log("translate query fn");
      if (!user) {
        return []; // User not logged in, return empty
      }
      return translateApi.getUsersTranslations();
    },
    enabled: !!user, // ✅ only fetch if logged in
    initialData: [],
  });

  const translateMutation = useMutation({
    mutationFn: (request: ITranslateRequest) => {

      return translateApi.translateUsersText(request);
    },
    
   
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({ queryKey });
      setSelectedTranslation({
        ...variables, // sourceLang, targetLang, sourceText
        ...result     // (possibly just targetText, or also others)
      })
    
},
    onError: (e) => {
      setError(e.toString());
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (key: ITranslatePrimaryKey) => {
      return translateApi.deleteUsersTranslations(key);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    user,
    translations: !translateQuery.data ? [] : translateQuery.data,
    isLoading: translateQuery.isPending,
    translate: translateMutation.mutate,
    isTranslating: translateMutation.status === "pending",
    deleteTranslation: deleteMutation.mutate,
    isDeleting: deleteMutation.status === "pending",
    translateError: translateMutation.error,
  };
};
