import {ITranslateRequest} from "@sff/shared-types"

export async function apertiumTranslator(
    { sourceLang, 
      targetLang, 
      sourceText
    }: ITranslateRequest){
const translateCommand = {
    langpair: `${sourceLang}|${targetLang}`,
    q: sourceText,
  };

  const url = `http://apertium:2737/translate?langpair=${translateCommand.langpair}&q=${encodeURIComponent(
    translateCommand.q
  )}`;

  const data = await fetch(url);
  const result = await data.json();
  return result;
}