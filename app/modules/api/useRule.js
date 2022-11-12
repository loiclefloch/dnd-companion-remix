import useRootData from "~/hooks/useRootData"

export function format(rule) {
  if (!rule) {
    return null
  }
  rule.descLocalized = {
    en: rule.desc
  }

  return rule
}

function useRule(index) {
  const { ruleSections } = useRootData()
  return format(ruleSections.find(rule => rule.index === index))
}

export default useRule