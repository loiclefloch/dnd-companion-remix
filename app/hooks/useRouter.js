

export default function useRouter() {
	return {
		goBack: () => history.go(-1),
		reload: () => history.go(0),
		// TODO: remix
		beforePopState: () => {
		},
		// TODO: remix
		query: {}, 
		// TODO: remix
		push: (path) => {
		},
		asPath: ''
	}

}