import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RentalRequests from "@/components/Rental-request"
import ViewingRequests from "@/components/Viewing-request"

export default function AdminPage() {
  // We'll only keep track of the active tab
  const [activeTab, setActiveTab] = useState("rental")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-6 space-y-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage property requests</p>
        </header>

        <Tabs defaultValue="rental" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
            <TabsTrigger
              value="rental"
              className={`text-sm sm:text-base py-3 rounded-md transition-all duration-200 ${
                activeTab === "rental" ? "bg-black text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Rental Requests
            </TabsTrigger>
            <TabsTrigger
              value="viewing"
              className={`text-sm sm:text-base py-3 rounded-md transition-all duration-200 ${
                activeTab === "viewing" ? "bg-black text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Viewing Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rental" className="mt-0">
            <RentalRequests />
          </TabsContent>

          <TabsContent value="viewing" className="mt-0">
            <ViewingRequests />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

