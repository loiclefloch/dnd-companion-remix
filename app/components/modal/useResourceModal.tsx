import useScreenAsModal from "../screenAsModal/useScreenAsModal"

export default function useResourceModal<P>(component: JSX.Element) {
	const { showScreenAsModal } = useScreenAsModal<P>()

	const showModal = (props: P) => {
		showScreenAsModal(component, props)
	}

	return showModal
}

