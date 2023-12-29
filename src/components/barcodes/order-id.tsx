import Barcode from 'react-jsbarcode'
import colors from 'tailwindcss/colors'

type OrderIdBarcodeProps = {
	orderId: string
}

export const OrderIdBarcode = ({ orderId }: OrderIdBarcodeProps) => {
	return (
		<div className='flex flex-col items-center justify-between w-full'>
			<p className='text-2xl font-bold'>{orderId}</p>
			<div className='bg-red-500 w-full rounded'>
				<Barcode
					className='max-w-[376px] mx-auto'
					value={orderId}
					options={{
						background: colors.red[500],
						lineColor: colors.neutral[950],
						displayValue: false,
						height: 50
					}}
				/>
			</div>
		</div>
	)
}
