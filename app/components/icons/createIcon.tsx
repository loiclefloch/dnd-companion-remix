import type { FunctionComponent, ReactNode, SVGProps } from "react";
import { createElement } from "react"
import clsx from "clsx"

// icons from https://heroicons.com/


interface CreationProps {
  viewBox?: string;
  fill?: string;
  className?: string;
  stroke?: string;
}

const createIcon = (IconName: string, Component: FunctionComponent<CreationProps>,  { className: creationClassName, ...creationProps }: CreationProps = {}) => {
	const Icon = ({ className, children, ...props }: SVGProps<SVGSVGElement>) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" className={clsx(creationClassName, className)} {...creationProps} {...props}>
				{createElement(Component)}
			</svg>
		)
	}

	Icon.displayName = IconName
	return Icon
}

export default createIcon