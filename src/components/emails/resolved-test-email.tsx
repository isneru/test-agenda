import { poppins } from '@lib/font'
import {
	Body,
	Container,
	Head,
	Html,
	Img,
	Preview,
	Section,
	Tailwind,
	Text
} from '@react-email/components'
import clsx from 'clsx'

interface ResolvedTestEmailProps {
	orderId: string
}

export const ResolvedTestEmail = ({ orderId }: ResolvedTestEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>
				O seu teste com o ID {orderId} foi resolvido com sucesso.
			</Preview>
			<Tailwind>
				<Body className={clsx(poppins.className, 'py-3 bg-white text-black')}>
					<Container>
						<Img
							src='https://i.imgur.com/CvogSkM.png'
							width='76'
							height='56'
							alt='CeX'
						/>
						<Section>
							<Text>Estimado/a cliente,</Text>
							<Text>
								Gostariamos de informar que o seu teste com o ID {orderId}{' '}
								encontra-se resolvido. Assim que possível, deverá dirigir-se à
								loja para mais informações.
							</Text>
							<Text className='font-semibold text-lg'>
								⚠️ Relembramos que este serviço de mensagens é exclusivo à loja
								Cex Maiashopping! Obrigado e até já! ⚠️
							</Text>
							<Text className='m-0'>Atenciosamente,</Text>
							<Text className='m-0'>A Equipa CeX do MaiaShopping</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
