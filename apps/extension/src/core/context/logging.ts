const PREFIX = "[Context]";

export function contextLog(message: string): void {
  console.debug(PREFIX, message);
}
