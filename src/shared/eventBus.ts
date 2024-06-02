// src/eventBus.ts
import { reactive } from 'vue';

type EventCallback = (...args: any[]) => void;

class EventBus {
  private events: Map<string, EventCallback[]>;

  constructor() {
    this.events = reactive(new Map());
  }

  on(event: string, callback: EventCallback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
    console.log(`Event listener added for: ${event}`);
  }

  off(event: string, callback: EventCallback) {
    if (this.events.has(event)) {
      const callbacks = this.events.get(event)!.filter(cb => cb !== callback);
      this.events.set(event, callbacks);
      console.log(`Event listener removed for: ${event}`);
    }
  }

  emit(event: string, ...args: any[]) {
    console.log(`Event emitted: ${event}`, ...args);
    if (this.events.has(event)) {
      this.events.get(event)!.forEach(callback => {
        console.log(`Event handler called for: ${event}`);
        callback(...args);
      });
    }
  }
}

export const eventBus = new EventBus();
