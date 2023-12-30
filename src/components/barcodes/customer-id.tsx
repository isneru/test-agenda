import Barcode from 'react-jsbarcode'
import colors from 'tailwindcss/colors'

type CustomerIdBarcodeProps = {
	customerId: string
}

export const CustomerIdBarcode = ({ customerId }: CustomerIdBarcodeProps) => {
	return (
		<div className='flex w-full flex-col items-center'>
			<p className='text-2xl font-bold'>Ficha de Cliente</p>
			<div className='bg-background w-full rounded shadow'>
				<Barcode
					className='max-w-[376px] mx-auto w-full'
					value={customerId}
					options={{
						background: colors.neutral[950],
						lineColor: colors.neutral[50],
						displayValue: false,
						height: 50
					}}
				/>
			</div>
			<span>{customerId}</span>
		</div>
	)
}
