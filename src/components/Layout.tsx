import { Children } from 'src/types';


interface Props {
	nav: Children
	children: Children
}

const Layout = ({
	nav,
	children
}: Props) => {



	return (
		<div className='h-full flex flex-col'>
			<div className='flex-initial flex-shrink-0'>
				{nav}
			</div>
			<div className='flex-auto overflow-auto'>
				{children}
			</div>
		</div>
	)
}

export default Layout;