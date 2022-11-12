import IconSpin from "../icons/IconSpin"

// TODO: remix remove
function ScreenAsModalLoading() {
	return (
		<div className="flex w-full h-full justify-center">
			<IconSpin className="w-12 h-12 text-slate-400 absolute inset-y-1/3" />
		</div>
	)
}

export default ScreenAsModalLoading