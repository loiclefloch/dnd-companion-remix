import useRootData from "~/hooks/useRootData"

function useSkills() {
  const { skills } = useRootData()
  return skills
}

export default useSkills