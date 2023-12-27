import Link from 'next/link';
import React from 'react';
import { Menu } from 'semantic-ui-react';

const Header = () => {
	return (
		<Menu style={{ marginTop: '12px' }}>
			<Link href={'/'}>
				<Menu.Item>Web3CrowdFund</Menu.Item>
			</Link>

			<Menu.Menu position="right">
				<Link href={'/'}>
					<Menu.Item name="Campaigns">Campaigns</Menu.Item>
				</Link>

				<Link href={'/campaigns/new'}>
					<Menu.Item name="add">+</Menu.Item>
				</Link>
			</Menu.Menu>
		</Menu>
	);
};

export default Header;
