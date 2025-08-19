"use client"

import { create } from "zustand"

export type EventItem = {
  id: string
  name: string
  date: string
}

export const DEFAULT_EVENTS: EventItem[] = [
  { id: "seed-1", name: "Product Launch Meetup", date: "2025-09-01" },
  { id: "seed-2", name: "Design Sprint Workshop", date: "2025-09-10" },
  { id: "seed-3", name: "Community MITM", date: "2025-09-20" },
]

type EventsState = {
  events: EventItem[]
  addEvent: (e: Omit<EventItem, "id">) => void
  removeEvent: (id: string) => void
  updateEvent: (id: string, patch: Partial<Omit<EventItem, "id">>) => void
  clearAll: () => void
  resetToDefaults: () => void
}

export const useEventsStore = create<EventsState>((set) => ({
  events: DEFAULT_EVENTS.map((e) => ({ ...e })), // start with seeds
  addEvent: (e) =>
    set((s) => ({
      events: [...s.events, { id: crypto.randomUUID(), ...e }],
    })),
  removeEvent: (id) =>
    set((s) => ({ events: s.events.filter((x) => x.id !== id) })),
  updateEvent: (id, patch) =>
    set((s) => ({
      events: s.events.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    })),
  clearAll: () => set({ events: [] }),
  resetToDefaults: () => set({ events: DEFAULT_EVENTS.map((e) => ({ ...e })) }),
}))
