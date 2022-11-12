import { useLocation } from "@remix-run/react";

type RangeUnitDtoEnum = 'METERS' | 'RETARDS';

interface ConfigurationDto {
  lang: string;
  rangeUnit: RangeUnitDtoEnum;
}

function useConfiguration(): ConfigurationDto {
  const location = useLocation()
  return {
    lang: location.query.l || 'fr', // we can use the query param 'l' to force a lang
    rangeUnit: 'METERS',
    RangeUnit: { // TODO: remove
      METERS: 'METERS',
      RETARD: 'RETARD',
    }
  }
}

export default useConfiguration