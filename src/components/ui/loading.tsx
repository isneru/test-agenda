import { Spinner } from '@components/ui'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

type LoadingProps = {
	children: ReactNode
	isLoading: boolean
} & ComponentPropsWithoutRef<'svg'>

export const Loading = ({ children, isLoading, ...props }: LoadingProps) => {
	return isLoading ? <Spinner {...props} /> : children
}
