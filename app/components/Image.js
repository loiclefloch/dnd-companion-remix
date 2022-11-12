
import useImageFullScreenAsModal from "./useImageFullScreenAsModal"
import CustImage from '~/components/Image'

function Image({ alt, src, ...otherProps }) {
	const { showImageFullScreen } = useImageFullScreenAsModal()
	// can override onClick
	return (
		<CustImage src={src} alt={alt} onClick={() => showImageFullScreen(alt, src)}{...otherProps}  />
	)
}

export default Image