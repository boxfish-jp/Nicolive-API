import type { Websocket } from "./Websocket";
import type { PlatformAPI } from "./platform/PlatformAPI";

export class WSAPIClient {
	private readonly liveId: string;
	private readonly userId: string;
	private pingerId: number | null = null;
	private websocketClient: Websocket | null = null;
	private reconnectCounter = 0;
	constructor(
		liveId: string,
		userId: string,
		private readonly platformAPI: PlatformAPI,
	) {
		this.liveId = liveId.replace(/^lv/, "");
		this.userId = userId;
	}

	public async connect() {
		this.reconnectCounter++;
		if (this.reconnectCounter > 10) {
			throw new Error("[WSAPIClient] reconnect failed");
		}
		if (this.websocketClient !== null) {
			this.disconnect();
		}
		if (!this.liveId && !this.userId) {
			throw new Error("liveId or userId must be specified");
		}

		const url = this.liveId
			? `https://live.nicovideo.jp/watch/lv${this.liveId}`
			: `https://live.nicovideo.jp/watch/user/${this.userId}`;
		const liveHTML = await (await fetch(url)).text();
		const websocketURL =
			await this.platformAPI.extractWSAPIURLFromHTML(liveHTML);

		const websocketClient = this.platformAPI.createWebsocket(websocketURL);

		let opened = false;
		// attach message and close handlers early
		websocketClient.on("message", this.onRawMessage);
		websocketClient.on("close", () => {
			setTimeout(() => {
				this.connect();
			}, 3000);
		});

		await new Promise<void>((resolve, reject) => {
			websocketClient.on("error", (err) => {
				if (!opened) {
					console.error("[WSAPIClient] websocket error:", err);
					reject(err);
					return;
				}
			});

			websocketClient.on("open", () => {
				opened = true;
				websocketClient.send(
					JSON.stringify({
						type: "startWatching",
						data: {
							stream: {
								quality: "high",
								protocol: "hls",
								latency: "low",
								chasePlay: false,
							},
							room: { protocol: "webSocket", commentable: false },
							reconnect: false,
						},
					}),
				);
				resolve();
			});
		});

		this.websocketClient = websocketClient;
	}

	public disconnect() {
		this.stopPinger();

		if (this.websocketClient === null) return;
		this.websocketClient.close();
		this.websocketClient = null;
	}

	private startPinger(interval: number) {
		this.pingerId = setInterval(() => {
			this.websocketClient?.send(JSON.stringify({ type: "keepSeat" }));
		}, interval * 1000) as unknown as number;
	}

	private stopPinger() {
		if (this.pingerId !== null) {
			clearInterval(this.pingerId);
			this.pingerId = null;
		}
	}

	private onRawMessage = (data: string) => {
		const message = JSON.parse(data) as WSAPIMessage;
		switch (message.type) {
			case "messageServer": {
				this.onMessageServerMessage(message);
				break;
			}
			case "seat": {
				this.startPinger(message.data.keepIntervalSec);
				break;
			}
			case "ping": {
				this.websocketClient?.send(JSON.stringify({ type: "pong" }));
				break;
			}
			default: {
				// ignored
			}
		}
	};

	public onMessageServerMessage = (message: WSAPIMessageServerMessage) => {};
}

type WSAPIMessage =
	| WSAPIMessageServerMessage
	| WSAPISeatMessage
	| WSAPIPingMessage;

interface WSAPIMessageServerMessage {
	type: "messageServer";
	data: {
		viewUri: string;
		vposBaseTime: string;
	};
}

interface WSAPISeatMessage {
	type: "seat";
	data: {
		keepIntervalSec: number;
	};
}

interface WSAPIPingMessage {
	type: "ping";
}
