import React from 'react'
import { useState } from "react"
import { format } from "date-fns"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon , Phone} from "lucide-react"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Button } from '@/components/ui/button'


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  checkIn: z.date({ required_error: "Please select a check-in date" }),
  checkOut: z.date({ required_error: "Please select a check-out date" }),
  guests: z.string().min(1, { message: "Please enter number of guests" }),
  specialRequests: z.string().optional(),
})

const Renthouse = () => {
    const [selectedHouse, setSelectedHouse] = useState(null)
    const [open, setOpen] = useState(false);
  
    const houses = [
      {
        image: "https://i.pinimg.com/474x/0b/06/c4/0b06c4a42c2d66d765e94bc268981d5c.jpg",
        price: "$50,00",
        beds: 3,
        baths: 2,
        sqft: 1800,
        location: "New York, NY",
      },
      {
        image: "https://i.pinimg.com/474x/95/8f/1d/958f1da47a87363d203b048bee3b48f4.jpg",
        price: "$54,00",
        beds: 4,
        baths: 3,
        sqft: 2200,
        location: "Los Angeles, CA",
      },
      {
        image: "https://i.pinimg.com/736x/42/19/f9/4219f9548b8b61162e34dd99638ae04c.jpg",
        price: "$32,00",
        beds: 2,
        baths: 1,
        sqft: 1200,
        location: "Houston, TX",
      },
      {
        image: "https://i.pinimg.com/236x/c6/43/82/c643826265a25958e520e17937328a5b.jpg",
        price: "$45,00",
        beds: 5,
        baths: 4,
        sqft: 3000,
        location: "Chicago, IL",
      },
      {
        image: "https://i.pinimg.com/236x/1e/97/3b/1e973bde8c7ddd94cc1b7e4e3ce3135a.jpg",
        price: "$60,00",
        beds: 6,
        baths: 5,
        sqft: 4000,
        location: "Miami, FL",
      },
      {
        image: "https://i.pinimg.com/474x/49/c8/93/49c8930905de59661305414c9810c5de.jpg",
        price: "$26,00",
        beds: 5,
        baths: 4,
        sqft: 3500,
        location: "San Francisco, CA",
      },
    ]
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        guests: "",
        specialRequests: "",
      },
    })
  
    function onSubmit(values) {
      // In a real app, you would send this data to your backend
      console.log(values)
      console.log("Booking for property:", selectedHouse)
  
      toast.success("Booking request submitted!", {
        description: `We've received your booking request for a property in ${selectedHouse?.location}. We'll contact you shortly.`,
      })
      setOpen(false)
      form.reset()
    }
  
    const handleBookClick = (house) => {
      setSelectedHouse(house)
      setOpen(true)
    }
  
    return (
        <div className="container mx-auto px-4">
            <div className="container mx-auto flex md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 sm:mt-10 font-medium">
                        RentAHouse - Find Your Perfect Home Easily!
                    </h1>
                    <p className="mb-8 leading-relaxed">
                        RentAHouse simplifies your home search by offering a wide range of rental properties. Browse listings, compare prices, and find the perfect place to call home all in one convenient platform.
                    </p>
                    <div className="flex justify-center">
                        <Button className="gap-3 p-5 py-2">
                            <Phone className="h-4 w-4" />
                            <span className="hidden lg:inline">Contact Agent</span>
                        </Button>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img
                        className="object-cover object-center rounded"
                        alt="hero"
                        src="https://i.pinimg.com/736x/7c/19/ba/7c19bac944b10c4c5264e5b777649d32.jpg"
                    />
                </div>
            </div>


            {/* Placeholder for page content */}
            <h1 className="mt-1 text-3xl font-bold">Most Demanding Villa For Rent</h1>
            <div className="mt-6 grid gap-8 md:grid-cols-3">
                {houses.map((item, index) => (
                    <div key={index} className="rounded-lg border p-4 shadow-sm">
                        <img
                            src={item.image || "/placeholder.svg"}
                            alt="House"
                            className="w-full h-60 object-cover rounded-md bg-gray-200"
                        />
                        <h2 className="mt-4 text-xl font-semibold">Luxury Villa</h2>
                        <p className="text-primary">{item.price} / Day</p>
                        <p className="mt-2 text-sm text-gray-600">
                            {item.beds} beds • {item.baths} bath • {item.sqft} sqft
                        </p>
                        <p className="mt-2 text-sm text-gray-600">{item.location}</p>
                        <Button className="mt-4 w-full" onClick={() => handleBookClick(item)}>
                            Book Villa
                        </Button>
                    </div>
                ))}
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Book {selectedHouse?.location || "Property"}</DialogTitle>
                        <DialogDescription>Fill out the form below to request a booking for this property.</DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="you@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="(123) 456-7890" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="checkIn"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Check-in Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                                        >
                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) => date < new Date()}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="checkOut"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Check-out Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                                        >
                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date < new Date() || (form.watch("checkIn") && date <= form.watch("checkIn"))
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="guests"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Number of Guests</FormLabel>
                                        <FormControl>
                                            <Input type="number" min="1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="specialRequests"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Special Requests</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Any special requests or requirements..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>Optional: Let us know if you have any special requirements.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button type="submit">Book Now</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Renthouse