import Barcode from 'react-jsbarcode'
import colors from 'tailwindcss/colors'

type OrderIdBarcodeProps = {
	orderId: string
}

export const OrderIdBarcode = ({ orderId }: OrderIdBarcodeProps) => {
	return (
		<div className='flex flex-col items-center justify-between w-full'>
			<p className='text-2xl font-bold'>{orderId}</p>
			<div className='bg-background w-full rounded shadow'>
				<Barcode
					className='max-w-[376px] mx-auto w-full'
					value={orderId}
					options={{
						background: colors.neutral[950],
						lineColor: colors.neutral[50],
						displayValue: false,
						height: 50
					}}
				/>
			</div>
		</div>
	)
}
