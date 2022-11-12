import clsx from 'clsx'
import BottomScreen from "./BottomScreen"
import type { ButtonsProps } from "./Button";
import Button from "./Button"

type ButtonBottomScreenProps = ButtonsProps & {
	children: string;
	className: string;
	hide?: boolean,
}

function ButtonBottomScreen({ children, className, hide = false, ...props }: ButtonBottomScreenProps) {
	return (
		<BottomScreen
			className={clsx("border-t border-solid border-slate-300",
				"transform ease-in-out transition-all duration-700", {
				"-translate-y-0": !hide,
				"translate-y-full": hide,
			})}
		>
			<Button size="big" className={clsx("border-0", className)} {...props}>{children}</Button>
		</BottomScreen>
	
	)
}

export default ButtonBottomScreen