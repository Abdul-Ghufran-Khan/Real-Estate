import { useState , useEffect } from "react"
import { Eye, Check, X, Home } from "lucide-react"
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

// Our rental requests data - we'll keep this inside the component
const dummyRentalRequests = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234-567-8901",
    propertyId: "P001",
    propertyName: "Sunset Villa",
    checkInDate: "2023-06-01",
    checkOutDate: "2023-06-07",
    guests: 2,
    requestDate: "2023-05-15",
    status: "pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 345-678-9012",
    propertyId: "P002",
    propertyName: "Ocean View Apartment",
    checkInDate: "2023-06-15",
    checkOutDate: "2023-06-22",
    guests: 3,
    requestDate: "2023-05-16",
    status: "pending",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 456-789-0123",
    propertyId: "P003",
    propertyName: "Mountain Retreat",
    checkInDate: "2023-07-01",
    checkOutDate: "2023-07-10",
    guests: 4,
    requestDate: "2023-05-17",
    status: "pending",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 567-890-1234",
    propertyId: "P004",
    propertyName: "Downtown Loft",
    checkInDate: "2023-06-10",
    checkOutDate: "2023-06-15",
    guests: 2,
    requestDate: "2023-05-18",
    status: "pending",
  },
]

export default function RentalRequests({ onAddSchedule, scheduledRequestIds }) {
  // We'll manage our own rental requests data right here
  const [rentalRequests, setRentalRequests] = useState(dummyRentalRequests)
  const [openDialogId, setOpenDialogId] = useState(null)

  // When we approve a rental request
  const approveRental = (id) => {
    // Find the request we're approving
    const request = rentalRequests.find((req) => req.id === id)
    if (!request) return

    // Update its status in our local state
    setRentalRequests((currentRequests) =>
      currentRequests.map((req) => (req.id === id ? { ...req, status: "approved" } : req)),
    )

    // Let the parent component know we've approved this for scheduling
    onAddSchedule({
      id: Date.now(), // Just a quick way to get a unique ID
      type: "rental",
      requestId: id,
      scheduledDate: request.checkInDate,
      // We'll include all the request data so the schedule component has everything it needs
      requestData: request,
    })
  }

  // When we reject a rental request
  const rejectRental = (id) => {
    setRentalRequests((currentRequests) =>
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
          <Home className="h-5 w-5" />
          Rental Requests
        </CardTitle>
        <CardDescription>Manage all incoming rental requests for properties</CardDescription>
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
                  <TableHead className="hidden lg:table-cell">Check In</TableHead>
                  <TableHead className="hidden lg:table-cell">Check Out</TableHead>
                  <TableHead className="hidden md:table-cell">Guests</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentalRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{request.email}</TableCell>
                    <TableCell className="hidden sm:table-cell">{request.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell">{request.checkInDate}</TableCell>
                    <TableCell className="hidden lg:table-cell">{request.checkOutDate}</TableCell>
                    <TableCell className="hidden md:table-cell">{request.guests}</TableCell>
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
                            <DialogTitle>Rental Request Details</DialogTitle>
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
                              <div className="font-medium">Check In Date:</div>
                              <div>{request.checkInDate}</div>
                              <div className="font-medium">Check Out Date:</div>
                              <div>{request.checkOutDate}</div>
                              <div className="font-medium">Number of Guests:</div>
                              <div>{request.guests}</div>
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
                          {/* Only show approve/reject buttons if it's still pending */}
                          {request.status === "pending" && (
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => rejectRental(request.id)}>
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                              <Button onClick={() => approveRental(request.id)}>
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            </div>
                          )}
                          {request.status !== "pending" && (
                            <div className="flex justify-end">
                              <DialogClose asChild>
                                <Button>Close</Button>
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

