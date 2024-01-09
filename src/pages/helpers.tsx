import { Layout } from '@components'
import { Input } from '@components/ui'
import { useState } from 'react'
import Barcode from 'react-jsbarcode'
import colors from 'tailwindcss/colors'

export default function Helpers() {
	const [barcode, setBarcode] = useState('')
	const [input, setInput] = useState('')

	return (
		<Layout>
			<Input value={input} onChange={e => setInput(e.target.value)} />
			<button onClick={() => setBarcode(input)}>Generate</button>
			{!!barcode && (
				<Barcode
					className='max-w-[8cm] mx-auto w-full'
					value={input}
					options={{
						background: colors.neutral[950],
						lineColor: colors.neutral[50],
						displayValue: false,
						height: 50
					}}
				/>
			)}
		</Layout>
	)
}
