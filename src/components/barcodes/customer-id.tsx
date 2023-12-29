import Barcode from 'react-jsbarcode'
import colors from 'tailwindcss/colors'

type CustomerIdBarcodeProps = {
	customerId: string
}

export const CustomerIdBarcode = ({ customerId }: CustomerIdBarcodeProps) => {
	return (
		<div className='flex w-full flex-col items-center'>
			<p className='text-2xl font-bold'>Ficha de Cliente</p>
			<div className='bg-red-500 w-full rounded'>
				<Barcode
					className='mx-auto max-w-[376px]'
					value={customerId}
					options={{
						background: colors.red[500],
						lineColor: colors.neutral[950],
						displayValue: false,
						height: 50
					}}
				/>
			</div>
			<span>{customerId}</span>
		</div>
	)
}
