import clsx from "clsx";
import type { ReactNode } from "react";
import { toggleValueOnArray } from "~/modules/utils/array"

interface ListSelectorRowProps<T> {
	label: string;
	selected?: boolean;
	rightView?: ReactNode;
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
	item: T; // used for dev tools
}

function ListSelectorRow<T>({
	label,
	selected,
	rightView,
	className,
	disabled,
	onClick,
	item, // used for dev tools
}: ListSelectorRowProps<T>) {
	return (
		<div 
			className={clsx(className, "flex items-center w-full p-2 py-1 select-none hover:bg-coolGray-100")}
		>
			<div className="w-8">
				<div
					className={clsx("w-4 h-4 cursor-pointer", {
						"border border-solid rounded-full border-slate-400": !selected,
						"border border-solid rounded-full border-blue-400 bg-blue-400 bg-coolGray-100": selected,
					})}
					onClick={onClick}
				/>
			</div>
			<div
				onClick={onClick}
				className={clsx("flex flex-1 cursor-pointer", {
					"text-gray-400": disabled,
				})}
			>
				{label}
			</div>
			<div>{rightView}</div>
		</div>
	)
}

interface Option<T> {
	key?: string;
	value: T;
	label: string;
	selected?: boolean;
	disabled?: boolean;
	rightView?: ReactNode;
}

interface ListSelectorProps<T> {
	value: T | T[];
	options: Option<T>[];
	onChange: (value: T | T[]) => void;
	multiple?: boolean; 
	nbMaxValues?: number;
	className?: string;
}

function ListSelector<T>({ value, options, onChange, multiple = false, nbMaxValues = -1, className }: ListSelectorProps<T>) {
	return (
		<div className={clsx("relative w-full gap-2 px-2 divide-y divider", className)}>
			{options?.map(option => (
				<ListSelectorRow 
					key={option.key || `${JSON.stringify(option.value)}`}
					label={option.label} 
					selected={option.selected}
					rightView={option.rightView}
					disabled={option.disabled}
					item={option.value} // used for dev tools
					onClick={() => {
						if (option.disabled) {
							return
						}
						if (multiple) {
							const updated = toggleValueOnArray(value as T[], option.value)
							if (nbMaxValues === -1) {
								onChange(updated)
							} else {
								if (updated.length > nbMaxValues) {
									// remove older selected value
									onChange(updated.reverse().slice(0, nbMaxValues).reverse())
								} else {
									onChange(updated)
								}
							}
						} else {
							onChange(option.value)
						}
					}} 
				/>
			))}
		</div>
	)
}

ListSelector.Row = ListSelectorRow

export default ListSelector