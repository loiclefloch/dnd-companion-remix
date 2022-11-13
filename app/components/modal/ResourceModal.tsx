import { createElement, memo, useEffect } from "react";
import ScreenAsModal from "../screenAsModal/ScreenAsModal";

export interface ResourceModalProps {
	onCloseScreen: () => void;
}

interface Props<T>  {
	fetcher: any;
	title: (props: T) => void;
	name: string;
	component: any; // TODO: react component
	onCloseScreen: () => void;
	params: { [key: string]: any };
}

function ResourceModal<T>({ fetcher, title, params, name, component, onCloseScreen, ...props }: Props<T>) {
	const data = fetcher.data as T

	useEffect(() => {
		fetcher.submit(
			params,
			{ method: 'get', action: '/resource/modal/' + name },
		)
	}, [ fetcher.submit ])

	const isLoading = fetcher.state !== 'idle'

	return (
    <ScreenAsModal
      title={data && title && title(data)}
      isLoading={isLoading}
      onCloseScreen={onCloseScreen}
    >
      {data &&
        createElement(component, {
          onCloseScreen,
          ...data,
          ...props,
        })}
    </ScreenAsModal>
  );
}

export default memo(ResourceModal)