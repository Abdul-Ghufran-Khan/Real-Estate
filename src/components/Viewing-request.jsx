"use client"

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

export default function ViewingRequests() {
  // We'll manage our own viewing requests data right here
  const [viewingRequests, setViewingRequests] = useState(dummyViewingRequests)
  const [openDialogId, setOpenDialogId] = useState(null)

  // When a viewing request is approved with a specific time
  const approveViewing = (id, timeSlot) => {
    // Update its status in our local state
    setViewingRequests((currentRequests) =>
      currentRequests.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "approved",
              scheduledTime: timeSlot,
            }
          : req,
      ),
    )

    // Close the dialog
    setOpenDialogId(null)
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

  return (
    <Card className="shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-black dark:text-white" />
          Viewing Requests
        </CardTitle>
        <CardDescription>Manage property viewing requests from potential clients</CardDescription>
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
                  <TableHead className="hidden lg:table-cell font-semibold">Preferred Date</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold">Budget</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {viewingRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{request.email}</TableCell>
                    <TableCell className="hidden sm:table-cell">{request.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell">{request.preferredViewDate}</TableCell>
                    <TableCell className="hidden md:table-cell">{request.budget}</TableCell>
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
                            <DialogTitle className="text-xl">Viewing Request Details</DialogTitle>
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
                              <div className="font-medium text-gray-500">Preferred View Date:</div>
                              <div>{request.preferredViewDate}</div>
                              <div className="font-medium text-gray-500">Budget:</div>
                              <div>{request.budget}</div>
                              <div className="font-medium text-gray-500">Request Date:</div>
                              <div>{request.requestDate}</div>
                              <div className="font-medium text-gray-500">Status:</div>
                              <div>{getStatusBadge(request.status)}</div>
                              {request.scheduledTime && (
                                <>
                                  <div className="font-medium text-gray-500">Scheduled Time:</div>
                                  <div className="font-semibold text-green-600">{request.scheduledTime}</div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Only show time selection and reject button if it's still pending */}
                          {request.status === "pending" && (
                            <div className="space-y-4">
                              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                <div className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                                  Select viewing time:
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                  <Button
                                    variant="outline"
                                    className="justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                                    onClick={() => approveViewing(request.id, "09:00 AM")}
                                  >
                                    9:00 AM
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                                    onClick={() => approveViewing(request.id, "12:00 PM")}
                                  >
                                    12:00 PM
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                                    onClick={() => approveViewing(request.id, "3:00 PM")}
                                  >
                                    3:00 PM
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <Button
                                  variant="outline"
                                  onClick={() => rejectViewing(request.id)}
                                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
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

