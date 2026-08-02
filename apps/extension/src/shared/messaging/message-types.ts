import { MSG } from "./constants";
import type { PageDetection } from "../detection/types";
import type { ExtensionStatus } from "./types";

export interface PingMessage {
  type: typeof MSG.PING;
}

export interface PongMessage {
  type: typeof MSG.PONG;
}

export interface GetExtensionStatusMessage {
  type: typeof MSG.GET_EXTENSION_STATUS;
}

export interface ExtensionStatusMessage {
  type: typeof MSG.EXTENSION_STATUS;
  payload: ExtensionStatus;
}

export interface OpenSidePanelMessage {
  type: typeof MSG.OPEN_SIDE_PANEL;
}

export interface SidePanelOpenedMessage {
  type: typeof MSG.SIDE_PANEL_OPENED;
}

export interface HeartbeatMessage {
  type: typeof MSG.HEARTBEAT;
  payload: {
    timestamp: number;
  };
}

export interface PageDetectedMessage {
  type: typeof MSG.PAGE_DETECTED;
  payload: PageDetection;
}

export interface GetPageDetectionMessage {
  type: typeof MSG.GET_PAGE_DETECTION;
}

export interface PageDetectionMessage {
  type: typeof MSG.PAGE_DETECTION;
  payload: PageDetection | null;
}

export type Request =
  | PingMessage
  | GetExtensionStatusMessage
  | OpenSidePanelMessage
  | HeartbeatMessage
  | PageDetectedMessage
  | GetPageDetectionMessage;

export type Response =
  PongMessage | ExtensionStatusMessage | SidePanelOpenedMessage | PageDetectionMessage;

export type Message = Request | Response;
