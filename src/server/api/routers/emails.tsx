import { z } from 'zod'

import { ResolvedTestEmail } from '@components/emails'

import { resend } from '@lib/resend'

import { createTRPCRouter, publicProcedure } from '@server/api/trpc'

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
				subject: 'O seu teste foi resolvido!',
				from: 'cex-testes@diogonogueira.dev',
				react: <ResolvedTestEmail orderId={input.orderId} />
			})
		})
})
