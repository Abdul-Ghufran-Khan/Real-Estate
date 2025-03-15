import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RentalRequests from "@/components/Rental-request"
import ViewingRequests from "@/components/Viewing-request"
import Schedules from "@/components/Schedules"

// Import our components


export default function AdminPage() {
  // We'll only keep track of the active tab and schedules at this level
  const [activeTab, setActiveTab] = useState("rental")
  const [schedules, setSchedules] = useState([])

  // This function gets called when a child component approves a request
  const addNewSchedule = (newSchedule) => {
    setSchedules((current) => [...current, newSchedule])
  }

  // We need to track which requests have been scheduled so we can show the right status
  // Let's create arrays of IDs for each type
  const rentalScheduleIds = schedules
    .filter((schedule) => schedule.type === "rental")
    .map((schedule) => schedule.requestId)

  const viewingScheduleIds = schedules
    .filter((schedule) => schedule.type === "viewing")
    .map((schedule) => schedule.requestId)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage property requests and schedules</p>
        </div>
      </header>

      <Tabs defaultValue="rental" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger
            value="rental"
            className={`text-sm sm:text-base ${activeTab === "rental" ? "bg-black text-white" : ""}`}
          >
            Rental Req
          </TabsTrigger>
          <TabsTrigger
            value="viewing"
            className={`text-sm sm:text-base ${activeTab === "viewing" ? "bg-black text-white" : ""}`}
          >
            Viewing Req
          </TabsTrigger>
          <TabsTrigger
            value="schedule"
            className={`text-sm sm:text-base ${activeTab === "schedule" ? "bg-black text-white" : ""}`}
          >
            Schedules
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rental">
          <RentalRequests
            onAddSchedule={addNewSchedule}
            setActiveTab={setActiveTab}
            scheduledRequestIds={rentalScheduleIds}
          />
        </TabsContent>

        <TabsContent value="viewing">
          <ViewingRequests
            onAddSchedule={addNewSchedule}
            setActiveTab={setActiveTab}
            scheduledRequestIds={viewingScheduleIds}
          />
        </TabsContent>

        <TabsContent value="schedule">
          <Schedules schedules={schedules} setActiveTab={setActiveTab} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

