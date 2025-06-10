import { Note } from "@/registry/ui/note"

export default function NoteClosableDemo() {
  return (
    <Note variant="info" closable>
      **Turbopack** is a high-performance bundler and dev server for Next.js.
      Enabling this option ensures faster builds and an improved development
      experience.
    </Note>
  )
}