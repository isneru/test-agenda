import Barcode from 'react-jsbarcode'
import colors from 'tailwindcss/colors'

type OrderIdBarcodeProps = {
	orderId: string
}

export const OrderIdBarcode = ({ orderId }: OrderIdBarcodeProps) => {
	return (
		<div className='flex flex-col items-center justify-between'>
			<h2 className='text-2xl font-bold'>{orderId}</h2>
			<Barcode
				className='rounded'
				value={orderId}
				options={{
					background: colors.red[300],
					displayValue: false,
					height: 50
				}}
			/>
		</div>
	)
}
