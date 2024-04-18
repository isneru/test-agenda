import { Layout } from '@components/ui'
import { jetBrainsMono } from '@lib/font'
import clsx from 'clsx'

export default function Utils() {
	return (
		<Layout>
			<div className='prose-invert prose-lg container mx-auto prose-h2:font-semibold prose-ul:list-disc prose-ol:list-decimal h-[200vh]'>
				<h1>Utilidades</h1>
				<h2 id='encontrar-serial-windows' className='relative group'>
					<span className='absolute -left-10 text-cex opacity-0 group-hover:opacity-100 select-none transition-opacity'>
						#
					</span>
					<a href='#encontrar-serial-windows' className='hover:underline'>
						Encontrar o Serial Number de um PC Windows
					</a>
				</h2>
				<ol>
					<li>
						Escrever na linha de comandos:
						<pre
							className={clsx(
								jetBrainsMono.className,
								'rounded-lg bg-neutral-900 font-bold'
							)}>
							wmic bios get serialnumber
						</pre>
					</li>
				</ol>

				<h2 id='setup-windows-sem-conta-microsoft' className='relative group'>
					<span className='absolute -left-10 text-cex opacity-0 group-hover:opacity-100 select-none transition-opacity'>
						#
					</span>
					<a
						href='#setup-windows-sem-conta-microsoft'
						className='hover:underline'>
						Bypass de conta Microsoft no setup do Windows
					</a>
				</h2>
				<ol>
					<li>
						Chegando ao ecrã de ligar a uma rede Wi-Fi, pressionar&nbsp;
						<span className='rounded-lg py-1 px-2 bg-neutral-900 font-semibold select-none'>
							Shift
						</span>
						&nbsp;
						<span className='rounded-lg py-1 px-2 bg-neutral-900 font-semibold select-none'>
							F10
						</span>
						&nbsp; para abrir a linha de comandos.
					</li>
					<li>
						Escrever:
						<pre
							className={clsx(
								jetBrainsMono.className,
								'rounded-lg bg-neutral-900 font-bold'
							)}>
							OOBE\BYPASSNRO
						</pre>
					</li>
					<li>
						O PC irá reiniciar e o setup irá continuar sem pedir uma conta.
						Poderá não funcionar em algumas versões do Windows.
					</li>
				</ol>
			</div>
		</Layout>
	)
}
