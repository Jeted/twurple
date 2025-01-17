import type { BotCommandContext } from './BotCommandContext';

export interface BotCommandMatch {
	command: BotCommand;
	params: string[];
}

export abstract class BotCommand {
	abstract get name(): string;

	get aliases(): string[] {
		return [];
	}

	match(line: string, prefix: string): string[] | null {
		let [command, ...params] = line.split(' ');
		if (!command.startsWith(prefix)) {
			return null;
		}
		command = command.slice(prefix.length);
		if (command === this.name || this.aliases.includes(command)) {
			return params;
		}
		return null;
	}

	abstract execute(params: string[], context: BotCommandContext): void | Promise<void>;
}
