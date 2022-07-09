import { Meteor } from 'meteor/meteor';
import { Match } from 'meteor/check';
import type { UpdateResult } from 'mongodb';
import type { IUser } from '@rocket.chat/core-typings';

import { Messages, Rooms } from '../../../models/server';

export const saveRoomEncrypted = function (rid: string, encrypted: boolean, user: IUser, sendMessage = true): Promise<UpdateResult> {
	if (!Match.test(rid, String)) {
		throw new Meteor.Error('invalid-room', 'Invalid room', 'RocketChat.saveRoomEncrypted');
	}

	const update = Rooms.saveEncryptedById(rid, encrypted);
	if (update && sendMessage) {
		Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser(
			`room_e2e_${encrypted ? 'enabled' : 'disabled'}`,
			rid,
			user.username,
			user,
			{},
		);
	}
	return update;
};
