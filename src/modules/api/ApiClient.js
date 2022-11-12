export default class ApiClient {
  /**
   * @type {WebSocket|null}
   */
  #ws = null;

  connect() {
    this.#ws = new WebSocket(`ws://${window.location.host}/ws`);
  }

  get connected() {
    return this.#ws && this.#ws instanceof WebSocket && this.#ws.readyState === WebSocket.OPEN;
  }
}