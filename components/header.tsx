import React from 'react';
import { Menu } from 'semantic-ui-react';

const Header = () => {
	return (
		<Menu style={{ marginTop: '12px' }}>
			<Menu.Item>Web3CrowdFund</Menu.Item>

			<Menu.Menu position="right">
				<Menu.Item name="signup" onClick={() => {}}>
					Campaigns
				</Menu.Item>

				<Menu.Item name="help" onClick={() => {}}>
					Help
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};

export default Header;
