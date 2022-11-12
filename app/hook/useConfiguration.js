import useRouter from "~/hook/useRouter"

const RangeUnit = {
  METERS: 'METERS',
  RETARD: 'RETARD',
}

function useConfiguration() {
  const { query } = useRouter()
  return {
    lang: query.l || 'fr', // we can use the query param 'l' to force a lang
    rangeUnit: RangeUnit.METERS,
    RangeUnit,
  }
}

export default useConfiguration