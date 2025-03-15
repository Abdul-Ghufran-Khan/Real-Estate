import { useState } from "react"
import { Eye, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Our viewing requests data - keeping it inside the component
const dummyViewingRequests = [
  {
    id: 1,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 678-901-2345",
    propertyId: "P001",
    propertyName: "Sunset Villa",
    preferredViewDate: "2023-05-25",
    budget: "$2,500/month",
    requestDate: "2023-05-20",
    status: "pending",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 789-012-3456",
    propertyId: "P002",
    propertyName: "Ocean View Apartment",
    preferredViewDate: "2023-05-26",
    budget: "$1,800/month",
    requestDate: "2023-05-21",
    status: "pending",
  },
  {
    id: 3,
    name: "David Taylor",
    email: "david.taylor@example.com",
    phone: "+1 890-123-4567",
    propertyId: "P003",
    propertyName: "Mountain Retreat",
    preferredViewDate: "2023-05-27",
    budget: "$3,200/month",
    requestDate: "2023-05-22",
    status: "pending",
  },
  {
    id: 4,
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    phone: "+1 901-234-5678",
    propertyId: "P004",
    propertyName: "Downtown Loft",
    preferredViewDate: "2023-05-28",
    budget: "$2,100/month",
    requestDate: "2023-05-23",
    status: "pending",
  },
]

export default function ViewingRequests({ onAddSchedule, setActiveTab, scheduledRequestIds }) {
  // We'll manage our own viewing requests data right here
  const [viewingRequests, setViewingRequests] = useState(dummyViewingRequests)
  const [openDialogId, setOpenDialogId] = useState(null)

  // When a viewing request is approved with a specific time
  const approveViewing = (id, timeSlot) => {
    // Find the request we're approving
    const request = viewingRequests.find((req) => req.id === id)
    if (!request) return

    // Update its status in our local state
    setViewingRequests((currentRequests) =>
      currentRequests.map((req) => (req.id === id ? { ...req, status: "approved" } : req)),
    )

    // Let the parent component know we've approved this for scheduling
    onAddSchedule({
      id: Date.now(), // Quick unique ID
      type: "viewing",
      requestId: id,
      scheduledDate: request.preferredViewDate,
      scheduledTime: timeSlot,
      // Include all request data for the schedule component
      requestData: request,
    })

    // Close the dialog and switch to the schedule tab
    setOpenDialogId(null)
    setActiveTab("schedule")
  }

  // When we reject a viewing request
  const rejectViewing = (id) => {
    setViewingRequests((currentRequests) =>
      currentRequests.map((req) => (req.id === id ? { ...req, status: "rejected" } : req)),
    )
    setOpenDialogId(null)
  }

  // Helper to get the right badge for each status
  const getStatusBadge = (status) => {
    // Return different badge styles based on status
    if (status === "pending") {
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          Pending
        </Badge>
      )
    } else if (status === "approved") {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Approved
        </Badge>
      )
    } else if (status === "rejected") {
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          Rejected
        </Badge>
      )
    }

    return <Badge variant="outline">{status}</Badge>
  }

  // Check if a request has already been scheduled
  const isScheduled = (id) => scheduledRequestIds.includes(id)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Viewing Requests
        </CardTitle>
        <CardDescription>Manage property viewing requests from potential clients</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden sm:table-cell">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell">Preferred Date</TableHead>
                  <TableHead className="hidden md:table-cell">Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {viewingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{request.email}</TableCell>
                    <TableCell className="hidden sm:table-cell">{request.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell">{request.preferredViewDate}</TableCell>
                    <TableCell className="hidden md:table-cell">{request.budget}</TableCell>
                    <TableCell>
                      {/* Show scheduled badge if it's in the scheduled list */}
                      {isScheduled(request.id) ? (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Scheduled
                        </Badge>
                      ) : (
                        getStatusBadge(request.status)
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog
                        open={openDialogId === request.id}
                        onOpenChange={(open) => (open ? setOpenDialogId(request.id) : setOpenDialogId(null))}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Viewing Request Details</DialogTitle>
                            <DialogDescription>Request ID: {request.id}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="font-medium">Client:</div>
                              <div>{request.name}</div>
                              <div className="font-medium">Email:</div>
                              <div>{request.email}</div>
                              <div className="font-medium">Phone:</div>
                              <div>{request.phone}</div>
                              <div className="font-medium">Property:</div>
                              <div>{request.propertyName}</div>
                              <div className="font-medium">Property ID:</div>
                              <div>{request.propertyId}</div>
                              <div className="font-medium">Preferred View Date:</div>
                              <div>{request.preferredViewDate}</div>
                              <div className="font-medium">Budget:</div>
                              <div>{request.budget}</div>
                              <div className="font-medium">Request Date:</div>
                              <div>{request.requestDate}</div>
                              <div className="font-medium">Status:</div>
                              <div>
                                {isScheduled(request.id) ? (
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    Scheduled
                                  </Badge>
                                ) : (
                                  getStatusBadge(request.status)
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Only show time selection and reject button if it's still pending */}
                          {request.status === "pending" && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-3 font-medium">Select viewing time:</div>
                                <Button
                                  variant="outline"
                                  className="justify-center"
                                  onClick={() => approveViewing(request.id, "09:00")}
                                >
                                  9:00 AM
                                </Button>
                                <Button
                                  variant="outline"
                                  className="justify-center"
                                  onClick={() => approveViewing(request.id, "12:00")}
                                >
                                  12:00 PM
                                </Button>
                                <Button
                                  variant="outline"
                                  className="justify-center"
                                  onClick={() => approveViewing(request.id, "15:00")}
                                >
                                  3:00 PM
                                </Button>
                              </div>
                              <div className="flex justify-end">
                                <Button variant="outline" onClick={() => rejectViewing(request.id)}>
                                  <X className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          )}

                          {request.status !== "pending" && (
                            <div className="flex justify-end">
                              <DialogClose asChild>
                                <Button variant="outline">Close</Button>
                              </DialogClose>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

