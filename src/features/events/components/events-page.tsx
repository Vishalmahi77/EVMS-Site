"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Trash2,
  CalendarPlus,
  Calendar as CalendarIcon,
  Pencil,
  X as XIcon,
  Check,
} from "lucide-react"
import { useEventsStore } from "@/lib/store/events"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { SiteHeader } from "@/components/header"
import { useConfirm } from "@/hooks/use-confirm"
import { toast } from "sonner"

export default function EventsPage() {
  const { events, addEvent, removeEvent, updateEvent, resetToDefaults } =
    useEventsStore()
  useEffect(() => {
    resetToDefaults()
    // If you previously persisted events, optionally clear the old key:
    // try { localStorage.removeItem("events-storage") } catch {}
  }, [resetToDefaults])
  // create form state
  const [name, setName] = useState("")
  const [date, setDate] = useState<Date | undefined>()

  // edit state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editDate, setEditDate] = useState<Date | undefined>(undefined)

  const confirm = useConfirm()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !date) return
    addEvent({ name: name.trim(), date: date.toISOString().split("T")[0] })
    setName("")
    setDate(undefined)
    toast.success("Event created successfully")
  }

  const handleDelete = async (id: string, displayName: string) => {
    const ok = await confirm({
      title: "Are you sure?",
      description: "Deleting this cannot be revert back.",
      confirmText: "Delete",
      cancelText: "Cancel",
      destructive: true,
    })
    if (ok) {
      removeEvent(id)
      toast.success("Event deleted successfully")
    }
  }

  const startEdit = (id: string) => {
    const item = events.find((x) => x.id === id)
    if (!item) return
    setEditingId(id)
    setEditName(item.name)
    // convert ISO yyyy-mm-dd to Date
    setEditDate(new Date(item.date + "T00:00:00"))
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditName("")
    setEditDate(undefined)
  }

  const saveEdit = () => {
    if (!editingId || !editName.trim() || !editDate) return
    updateEvent(editingId, {
      name: editName.trim(),
      date: editDate.toISOString().split("T")[0],
    })
    cancelEdit()
    toast.success("Event updated successfully")
  }

  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 text-white grid place-items-center">
            <CalendarPlus className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Events</h1>
        </div>

        {/* Create Form */}
        <form
          onSubmit={onSubmit}
          className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Event Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Team Meetup"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Date <span className="text-red-500">*</span>
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !date ? "text-slate-500" : ""
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Event
            </Button>

            <Button asChild variant="outline">
              <Link href="/">Back Home</Link>
            </Button>
          </div>
        </form>

        {/* List */}
        <section className="mt-6">
          <h2 className="mb-3 text-sm font-medium text-slate-600">
            {sorted.length ? "Your Events" : "No events yet"}
          </h2>

          {sorted.length ? (
            <ul className="space-y-3">
              {sorted.map((e) => {
                const isEditing = editingId === e.id
                return (
                  <li
                    key={e.id}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm"
                  >
                    {isEditing ? (
                      // --- Edit Row ---
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 items-start">
                        <div className="sm:col-span-2">
                          <label className="mb-1 block text-xs font-medium text-slate-600">
                            Event Name
                          </label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(ev) => setEditName(ev.target.value)}
                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-600">
                            Date
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal ${
                                  !editDate ? "text-slate-500" : ""
                                }`}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {editDate
                                  ? format(editDate, "PPP")
                                  : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={editDate}
                                onSelect={setEditDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="sm:col-span-3 flex flex-wrap gap-2">
                          <Button
                            onClick={saveEdit}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                          >
                            <Check className="h-4 w-4" />
                            Save
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={cancelEdit}
                            className="inline-flex items-center gap-2"
                          >
                            <XIcon className="h-4 w-4" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // --- Display Row ---
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-slate-900">
                            {e.name}
                          </div>
                          <div className="text-xs text-slate-500">{e.date}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEdit(e.id)}
                            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            aria-label={`Edit ${e.name}`}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(e.id, e.name)}
                            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            aria-label={`Delete ${e.name}`}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
              Start by adding your first event above.
            </div>
          )}
        </section>
      </main>
    </>
  )
}
