import Link from 'next/link';
import React from 'react';

interface Props {

}

const Navbar = ({
	...props
}: Props) => {



	return (
		<nav className='bg-gray-200 flex items-center h-12'>
			<h2>Next.js Test</h2>

			<Link href='/' ><a className='ml-auto p-3 hover:text-pink-600'>Home</a></Link>
			<Link href='/test'><a className='p-3 hover:text-pink-600'>Test</a></Link>
		</nav>
	)
}

export default Navbar;