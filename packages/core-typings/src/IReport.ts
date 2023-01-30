import type { IRocketChatRecord } from './IRocketChatRecord';
import type { IMessage } from './IMessage/IMessage';

export interface IReport extends IRocketChatRecord {
	message: IMessage;
	description: string;
	ts: Date;
	userId: string;
	_hidden?: boolean;
	_hiddenAt?: Date;
	_hiddenBy?: string;
}
