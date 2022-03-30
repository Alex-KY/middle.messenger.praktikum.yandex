import Chats from './Chats';

import { withStore } from '../../utils/store';

export const withChats = withStore((state: any) => ({ state: state.chats }));

export default withChats(Chats);
