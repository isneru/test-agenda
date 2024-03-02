import { createTRPCRouter, publicProcedure } from '@server/api/trpc'
import { ResolvedTestEmail } from '@components/emails'
import { resend } from '@lib/resend'
import { z } from 'zod'

export const emailRouter = createTRPCRouter({
	sendResolved: publicProcedure
		.input(
			z.object({
				orderId: z.string(),
				email: z.string().email({ message: 'Email inválido' })
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await resend.emails.send({
				to: input.email,
				subject: `O seu teste ${input.orderId} foi resolvido!`,
				from: 'Cex MaiaShopping <cex-testes@diogonogueira.dev>',
				react: <ResolvedTestEmail orderId={input.orderId} />
			})
		})
})
