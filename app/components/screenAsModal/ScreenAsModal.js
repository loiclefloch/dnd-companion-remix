import IconX from '../icons/IconX'
import IconSpin from "../icons/IconSpin"
import useEscapeEffect from "../useEscapeEffect"
import useBeforePopState from "../useBeforePopState"
import clsx from 'clsx'

function ScreenLoading() {
	return (
		<div className="flex justify-center w-full h-full">
			<IconSpin className="absolute w-12 h-12 text-slate-400 inset-y-1/3" />
		</div>
	)
}

function ScreenAsModal({ title, leftAction = null, isLoading = false, onCloseScreen, children, withBottomSpace = false }) {
	useEscapeEffect(onCloseScreen)
	useBeforePopState(() => {
		onCloseScreen()
		return false
	})

	return (
		<div className='flex flex-col h-screen-all bg-app relative'>
			<header className='flex flex-row p-2 z-40 top-0 sticky '>
				{leftAction && <div className="flex">{leftAction}</div>}
				<div className='flex-1 text-lg font-semibold text-center'>{title}</div>
				<div className='flex'>
					<button onClick={onCloseScreen}><IconX className="w-5 h-5" /></button>
				</div>
			</header>
			<div className={clsx('flex-1 overflow-y-auto bg-app', {
				"pb-12": withBottomSpace
			})}>
				{isLoading
					? <ScreenLoading />
					: children
				}
			</div>
		</div>
	)
}

export default ScreenAsModal