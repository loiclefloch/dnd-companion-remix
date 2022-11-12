import { useSearchParams } from "@remix-run/react";

const LANG_SEARCH_PARAM = 'l'
const DEFAULT_LANG = 'fr' // TODO: change

type RangeUnitDtoEnum = 'METERS' | 'RETARDS';

interface ConfigurationDto {
  lang: string;
  rangeUnit: RangeUnitDtoEnum;
}

function useConfiguration(): ConfigurationDto {
  const [searchParams] = useSearchParams();
  return {
    lang: searchParams.get(LANG_SEARCH_PARAM) || DEFAULT_LANG, // we can use the query param 'l' to force a lang
    rangeUnit: 'METERS',
    RangeUnit: { // TODO: remove
      METERS: 'METERS',
      RETARD: 'RETARD',
    }
  }
}

export default useConfiguration