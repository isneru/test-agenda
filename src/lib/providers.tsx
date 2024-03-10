import { api } from '@lib/api'
import { useSession } from 'next-auth/react'
import { createContext, ReactNode, useState } from 'react'

interface ChangelogContextData {}

export const ChangelogContext = createContext({} as ChangelogContextData)

interface ChangeloProviderProps {
	children: ReactNode
}

export const ChangelogProvider = ({ children }: ChangeloProviderProps) => {
	const [isChangelogVisible, setIsChangelogVisible] = useState(false)
	const { data: session } = useSession()
	const { data: code } = api.changelog.getCode.useQuery(undefined, {
		enabled: !!session
	})

	return (
		<ChangelogContext.Provider value={{}}>
			<div className='absolute inset-0 h-screen w-screen bg-blue-900'></div>
			{children}
		</ChangelogContext.Provider>
	)
}
