import { useEffect } from 'react';
import useRouter from "~/hook/useRouter"

function useBeforePopState(cb) {
  const router = useRouter()

  useEffect(() => {
		const isBrowser = typeof window !== "undefined";
		if (isBrowser) {
			router.beforePopState(() => {
				const allowRedirect = cb()
				return allowRedirect
			})
		}
   
		return () => {
			router.beforePopState(() => {
				return true
			})
		}
  }, [ cb, router ])

  return {
  }
}

export default useBeforePopState