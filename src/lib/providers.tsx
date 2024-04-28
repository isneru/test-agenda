import { api } from '@lib/api'
import { useSession } from 'next-auth/react'
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react'
import { getCookie, setCookie } from 'cookies-next'
import * as Dialog from '@radix-ui/react-dialog'
import { poppins } from '@lib/font'
import clsx from 'clsx'
import { Cross1Icon } from '@radix-ui/react-icons'

interface ChangelogContextData {}

const ChangelogContext = createContext({} as ChangelogContextData)

interface ChangelogProviderProps {
	children: ReactNode
}

export const ChangelogProvider = ({ children }: ChangelogProviderProps) => {
	const [isChangelogVisible, setIsChangelogVisible] = useState(false)
	const { data: session } = useSession()
	const { data } = api.changelog.getCode.useQuery(undefined, {
		enabled: !!session
	})

	useEffect(() => {
		if (!!data?.code) {
			const lastSeenVersion = getCookie('lastSeenVersion')
			const currentVersion = getCookie('currentVersion')

			if (!lastSeenVersion || lastSeenVersion !== currentVersion) {
				setIsChangelogVisible(true)
			}
		}
	}, [data?.code])

	function toggleModal(open: boolean) {
		if (!open) {
			setCookie('lastSeenVersion', getCookie('currentVersion'), {
				maxAge: 2592000,
				sameSite: 'lax',
				path: '/'
			})
		}

		setIsChangelogVisible(open)
	}

	return (
		<ChangelogContext.Provider value={{}}>
			<Dialog.Root open={isChangelogVisible} onOpenChange={toggleModal}>
				<Dialog.Overlay className='fixed inset-0 z-[90] bg-black/60 data-[state=closed]:animate-[overlay-hide_200ms] data-[state=open]:animate-[overlay-show_200ms]' />
				<Dialog.Content
					className={clsx(
						poppins.className,
						'flex overflow-y-scroll fixed left-1/2 z-[100] top-1/2 prose-invert prose-lg container mx-auto prose-h1:mt-0 prose-h1:prose-base prose-h2:font-semibold prose-ul:list-disc prose-ol:list-decimal h-[90%] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg shadow bg-neutral-900 border border-foreground/40 py-6 px-8 data-[state=closed]:animate-[content-hide_200ms] data-[state=open]:animate-[content-show_200ms] outline-none'
					)}>
					<Dialog.Close className='absolute right-8 top-7 outline-none'>
						<Cross1Icon />
					</Dialog.Close>
					<div dangerouslySetInnerHTML={{ __html: data?.code ?? '' }} />
					<footer className='flex mt-auto ml-auto pt-10 text-white/60 text-base'>
						{data?.versionDate}
					</footer>
				</Dialog.Content>
			</Dialog.Root>
			{children}
		</ChangelogContext.Provider>
	)
}

interface SidebarContextData {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

const SidebarContext = createContext({} as SidebarContextData)

interface SidebarProviderProps {
	children: ReactNode
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<SidebarContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</SidebarContext.Provider>
	)
}

export function useSidebar() {
	return useContext(SidebarContext)
}
