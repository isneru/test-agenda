import Barcode from 'react-jsbarcode'
import colors from 'tailwindcss/colors'

type CustomBarcodeProps = {
	value: string
	children?: React.ReactNode
}

export const CustomBarcode = ({ value, children }: CustomBarcodeProps) => {
	return (
		<div className='flex w-full flex-col items-center'>
			<p className='text-2xl font-bold'>{children}</p>
			<div className='bg-background w-full rounded shadow barcode-print'>
				<Barcode
					className='max-w-[376px] mx-auto w-full'
					value={value}
					options={{
						background: colors.neutral[950],
						lineColor: colors.neutral[50],
						displayValue: false,
						height: 40
					}}
				/>
			</div>
			<span>{value}</span>
		</div>
	)
}
