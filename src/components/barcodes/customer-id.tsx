import Barcode from 'react-jsbarcode'
import colors from 'tailwindcss/colors'

type CustomerIdBarcodeProps = {
	customerId: string
}

export const CustomerIdBarcode = ({ customerId }: CustomerIdBarcodeProps) => {
	return (
		<div className='flex w-full flex-col items-center'>
			<p className='text-2xl font-bold'>Ficha de Cliente</p>
			<Barcode
				className='rounded max-w-[376px]'
				value={customerId}
				options={{
					background: colors.red[300],
					displayValue: false,
					height: 50
				}}
			/>
			<span>{customerId}</span>
		</div>
	)
}
