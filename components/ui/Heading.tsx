

import { ReactNode } from "react"

export default function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-center text-2xl md:text-4xl font-semibold text-gray-800 tracking-wide mb-6 relative">
      {children}
      <span className="block h-[2px] w-12 bg-amber-500 mx-auto mt-2 rounded"></span>
    </h2>
  )
}
