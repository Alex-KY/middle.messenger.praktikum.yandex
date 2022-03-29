import Profile from './Profile';

import { withStore } from '../../utils/store';

export const withUser = withStore((state: any) => ({ state: state.userData }));

export default withUser(Profile);
