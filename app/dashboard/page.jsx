import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DashboardStats, DashboardCourses } from "./components"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-lg font-semibold">Your Learning Dashboard</h1>
            <p className="text-sm text-muted-foreground">Overview of your courses and progress</p>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-4">
          <DashboardStats />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <DashboardCourses />
            </div>
            <aside className="space-y-4">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 text-sm font-medium">Daily Goal</h3>
                <p className="text-sm text-muted-foreground">Keep your 7-day streak going — complete at least 20 minutes today.</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 text-sm font-medium">Recommended</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-4">
                  <li>JavaScript Patterns</li>
                  <li>Frontend Testing</li>
                </ul>
              </div>
            </aside>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
