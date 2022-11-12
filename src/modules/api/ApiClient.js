import MessageParser from "./MessageParser";
import BaseMessage from "./base/BaseMessage";

export default class ApiClient {
  /** @type {WebSocket|null} */
  #ws = null;

  /** @type {string|null} */
  #userId = null;

  #parser = new MessageParser();

  connect() {
    this.#ws = new WebSocket(`ws://${window.location.host}/ws`);

    this.on('error', () => this.disconnect());
    this.on('close', () => this.disconnect());

    this.on('message', wsMessage => {
      const message = this.#parser.parse(wsMessage);

      if (!(message instanceof BaseMessage)) {
        throw new Error("Message is not instance of BaseMessage");
      }

      this.#ws.dispatchEvent(
        new CustomEvent(
          ApiClient.#prefixMessageTypeEvent(message.type),
          {
            detail: message
          }
        ));
    })

    this.onMessage('hello', event => {
      this.#userId = event.detail.userId;
    })
  }

  disconnect() {
    this.#ws.close();
    this.#ws = null;
  }

  get connected() {
    return this.#ws && this.#ws instanceof WebSocket && this.#ws.readyState === WebSocket.OPEN;
  }

  get userId() {
    return this.#userId;
  }

  /**
   * @template {keyof WebSocketEventMap} K
   * @param {K} event
   * @param {(event: WebSocketEventMap[K]) => *} callback
   */
  on(event, callback) {
    if (!this.#ws)
      throw new Error("WebSocket is not initialized");

    this.#ws.addEventListener(event, callback);
  }

  /**
   * @template {keyof WebSocketEventMap} K
   * @param {K} event
   * @param {(event: WebSocketEventMap[K]) => *} callback
   */
  off(event, callback) {
    if (!this.#ws)
      throw new Error("WebSocket is not initialized");

    this.#ws.removeEventListener(event, callback);
  }

  /**
   * @template {keyof MessageTypesMap | string} TypeName
   * @param {TypeName} type
   * @param {(event: CustomEvent<MessageTypesMap[TypeName]>) => *} callback
   */
  onMessage(type, callback) {
    if (!this.#ws) {
      throw new Error("WebSocket is not initialized!");
    }

    this.#ws.addEventListener(ApiClient.#prefixMessageTypeEvent(type), callback);
  }

  static #prefixMessageTypeEvent(messageType) {
    return `message:${messageType}`;
  }

  /**
   * @param {BaseMessage} message
   */
  send(message) {
    if (!this.#ws)
      throw new Error("WebSocket is not initialized");

    this.#ws.send(message.toString());
  }
}