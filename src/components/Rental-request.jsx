"use client"

import { useState } from "react"
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

export default function RentalRequests() {
  // We'll manage our own rental requests data right here
  const [rentalRequests, setRentalRequests] = useState(dummyRentalRequests)
  const [openDialogId, setOpenDialogId] = useState(null)

  // When we approve a rental request
  const approveRental = (id) => {
    // Update its status in our local state
    setRentalRequests((currentRequests) =>
      currentRequests.map((req) => (req.id === id ? { ...req, status: "approved" } : req)),
    )

    // Close the dialog
    setOpenDialogId(null)
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

  return (
    <Card className="shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5 text-black dark:text-white" />
          Rental Requests
        </CardTitle>
        <CardDescription>Manage all incoming rental requests for properties</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-900">
                <TableRow>
                  <TableHead className="w-[80px] font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Client</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold">Email</TableHead>
                  <TableHead className="hidden sm:table-cell font-semibold">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell font-semibold">Check In</TableHead>
                  <TableHead className="hidden lg:table-cell font-semibold">Check Out</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold">Guests</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentalRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{request.email}</TableCell>
                    <TableCell className="hidden sm:table-cell">{request.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell">{request.checkInDate}</TableCell>
                    <TableCell className="hidden lg:table-cell">{request.checkOutDate}</TableCell>
                    <TableCell className="hidden md:table-cell">{request.guests}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog
                        open={openDialogId === request.id}
                        onOpenChange={(open) => (open ? setOpenDialogId(request.id) : setOpenDialogId(null))}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5 mr-1 text-black dark:text-white" />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader className="border-b pb-4">
                            <DialogTitle className="text-xl">Rental Request Details</DialogTitle>
                            <DialogDescription>Request ID: {request.id}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="font-medium text-gray-500">Client:</div>
                              <div className="font-semibold">{request.name}</div>
                              <div className="font-medium text-gray-500">Email:</div>
                              <div>{request.email}</div>
                              <div className="font-medium text-gray-500">Phone:</div>
                              <div>{request.phone}</div>
                              <div className="font-medium text-gray-500">Property:</div>
                              <div className="font-semibold">{request.propertyName}</div>
                              <div className="font-medium text-gray-500">Property ID:</div>
                              <div>{request.propertyId}</div>
                              <div className="font-medium text-gray-500">Check In Date:</div>
                              <div>{request.checkInDate}</div>
                              <div className="font-medium text-gray-500">Check Out Date:</div>
                              <div>{request.checkOutDate}</div>
                              <div className="font-medium text-gray-500">Number of Guests:</div>
                              <div>{request.guests}</div>
                              <div className="font-medium text-gray-500">Request Date:</div>
                              <div>{request.requestDate}</div>
                              <div className="font-medium text-gray-500">Status:</div>
                              <div>{getStatusBadge(request.status)}</div>
                            </div>
                          </div>
                          {/* Only show approve/reject buttons if it's still pending */}
                          {request.status === "pending" && (
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={() => rejectRental(request.id)}
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                              <Button
                                onClick={() => approveRental(request.id)}
                                className="bg-black hover:bg-gray-800 text-white"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            </div>
                          )}
                          {request.status !== "pending" && (
                            <div className="flex justify-end">
                              <DialogClose asChild>
                                <Button className="bg-black hover:bg-gray-800 text-white">Close</Button>
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

