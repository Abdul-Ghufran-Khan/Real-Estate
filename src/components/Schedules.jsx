import { Calendar, Eye, X, Home } from "lucide-react"
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
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function Schedules({ schedules = [], setActiveTab }) {
  // We don't need to manage state here - we just display what we're given

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Schedules
        </CardTitle>
        <CardDescription>View and manage all scheduled property rentals and viewings</CardDescription>
      </CardHeader>
      <CardContent>
        {schedules.length > 0 ? (
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="hidden md:table-cell">Property</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="hidden sm:table-cell">Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => {
                    // Get the request data that was stored with the schedule
                    // This is nice because we don't need to look it up from another component
                    const request = schedule.requestData

                    return (
                      <TableRow key={schedule.id}>
                        <TableCell className="font-medium">{schedule.id}</TableCell>
                        <TableCell>
                          <Badge variant={schedule.type === "rental" ? "default" : "secondary"}>
                            {schedule.type === "rental" ? "Rental" : "Viewing"}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{request.propertyName}</TableCell>
                        <TableCell>
                          {schedule.scheduledDate}
                          {schedule.type === "viewing" && ` at ${schedule.scheduledTime}`}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{request.phone}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                <span className="hidden sm:inline">View</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  {schedule.type === "rental" ? "Rental" : "Viewing"} Schedule Details
                                </DialogTitle>
                                <DialogDescription>Schedule ID: {schedule.id}</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="font-medium">Type:</div>
                                  <div className="capitalize">{schedule.type}</div>
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

                                  {schedule.type === "rental" ? (
                                    <>
                                      <div className="font-medium">Check In Date:</div>
                                      <div>{schedule.scheduledDate}</div>
                                      <div className="font-medium">Check Out Date:</div>
                                      <div>{request.checkOutDate}</div>
                                      <div className="font-medium">Number of Guests:</div>
                                      <div>{request.guests}</div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="font-medium">Viewing Date:</div>
                                      <div>{schedule.scheduledDate}</div>
                                      <div className="font-medium">Viewing Time:</div>
                                      <div>{schedule.scheduledTime}</div>
                                      <div className="font-medium">Budget:</div>
                                      <div>{request.budget}</div>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Reschedule
                                </Button>
                                <Button variant="destructive">
                                  <X className="h-4 w-4 mr-1" />
                                  Cancel
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          // Show a nice empty state when there are no schedules
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Scheduled Appointments</h3>
            <p className="text-muted-foreground mt-2">Approve rental or viewing requests to create schedules.</p>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setActiveTab("rental")}>
                <Home className="h-3 w-3"/>
                Rental Req
              </Button>
              <Button variant="outline" onClick={() => setActiveTab("viewing")}>
                <Eye className="h-3 w-3"/>
                Viewing Req
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

