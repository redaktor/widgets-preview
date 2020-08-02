/* TODO FIXME : crypto-browserify */

/**
 * redaktor/password
 *
 * TODO FIXME - DESCRIPTION when alpha
 *
 * Copyright (c) 2016 Sebastian Lasse, redaktor foundation
 * TODO FIXME - CLEAR LICENSE when alpha
 */

import i18n, { getCachedMessages, Messages } from '@dojo/framework/i18n/main';
import * as zxcvbnFn from 'zxcvbn';
import { repeat } from '../../framework/String/repeat';
import uuid from '../../framework/uuid';
import bundle from './nls/';

interface StrengthResult {
	score: number;
	suggestions: string[];
	warning: string;
	message: string;
	bar: string[];
	zxcvbn: zxcvbn.ZXCVBNResult;
}

function zxcvbnI18n(s: string) {
	const messages: Messages = getCachedMessages(bundle, i18n.locale)||{};
	if (!s.length) { return '' }
	const id = `zxcvbn_${uuid(s).split('-')[0]}`;
	return messages[id]||s
}

export function strengthBar(score: number = 0, max: number = 5) {
	max = Math.round(max);
	score = Math.round(Math.max(0, Math.min(score, max)));
	return [repeat('█', score), repeat('█', max - score)]
}
export async function strength(password: string, user_inputs: string[] = []): Promise<StrengthResult> {
	user_inputs = Array.isArray(user_inputs) ? user_inputs : [];
	const messages = await i18n(bundle, i18n.locale);
	// TODO
	const inputs = user_inputs.concat(['redaktor','lorem ipsum','dolor']);
	const zxcvbn = zxcvbnFn(password, inputs);
	const score = zxcvbn.score < 4 ? zxcvbn.score : (zxcvbn.guesses_log10 < 16 ? 4 : 5);
	let message = `${messages.yourPW} ${messages.scores} ${score}/5`;
	const bar = strengthBar(score);
/*
var os = require("os"); os.EOL
*/
	let { suggestions = [], warning = '' } = zxcvbn.feedback;
	warning = zxcvbnI18n(warning);
	suggestions = suggestions.map(zxcvbnI18n);
	warning = (warning.length ? warning : '');
	return { score, message, suggestions, warning, bar, zxcvbn }
}
