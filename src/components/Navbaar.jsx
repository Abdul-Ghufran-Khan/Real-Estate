import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import { Home, Menu, X, Search, Phone, ChevronDown, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

const Navbar = ({ onBuyClick , onRentClick }) => {
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [adminCode, setAdminCode] = useState("")

  const handleAdminSubmit = (e) => {
    e.preventDefault()
    // Handle admin code submission logic here
    if (adminCode == import.meta.env.VITE_Admin_Secret_Code) {
      navigate("/admin")
    }
    // Reset the form
    setAdminCode("")
    setIsAdminOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">RentAHouse</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <a href="#home" className="text-sm font-medium hover:text-primary">
            Home
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-medium hover:text-primary">
                Properties <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem onClick={onBuyClick}>
                <a href="#buy">Buy</a>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onRentClick}>
                <a href="#rent">Rent</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#new-developments">New Developments</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a href="#services" className="text-sm font-medium hover:text-primary">
            Services
          </a>

          <a href="#agents" className="text-sm font-medium hover:text-primary">
            Agents
          </a>

          <a href="#about" className="text-sm font-medium hover:text-primary">
            About Us
          </a>

          <a href="#contact" className="text-sm font-medium hover:text-primary">
            Contact
          </a>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {isSearchOpen ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search properties..."
                className="w-64 rounded-md border border-gray-300 px-3 py-1.5 pr-8 text-sm focus:border-primary focus:outline-none"
              />
              <X
                className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <Search
              className="h-5 w-5 cursor-pointer text-gray-600 hover:text-primary"
              onClick={() => setIsSearchOpen(true)}
            />
          )}

          {/* Admin Button and Panel */}
          <div className="relative">
            <Button variant="outline" size="icon" onClick={() => setIsAdminOpen(!isAdminOpen)} className="mr-2">
              <Shield className="h-4 w-4" />
              <span className="sr-only">Admin</span>
            </Button>

            {isAdminOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-md border bg-white p-4 shadow-lg">
                <form onSubmit={handleAdminSubmit} className="flex flex-col gap-2">
                  <div className="text-sm font-medium">Admin Access</div>
                  <Input
                    type="password"
                    placeholder="Enter admin code"
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                  />
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              </div>
            )}
          </div>

          <Button className="gap-2">
            <Phone className="h-4 w-4" />
            <span className="hidden lg:inline">Contact Agent</span>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 md:hidden">
          <Search className="h-5 w-5 cursor-pointer text-gray-600" onClick={() => setIsSearchOpen(!isSearchOpen)} />

          {/* Mobile Admin Button */}
          <Button variant="outline" size="icon" onClick={() => setIsAdminOpen(!isAdminOpen)}>
            <Shield className="h-4 w-4" />
            <span className="sr-only">Admin</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-6">
                <a href="#home" className="text-lg font-medium hover:text-primary">
                  Home
                </a>
                <div className="space-y-3">
                  <p className="text-lg font-medium">Properties</p>
                  <div className="flex flex-col gap-2 pl-4">
                    <a href="#buy" className="text-sm hover:text-primary" onClick={onBuyClick}>
                      Buy
                    </a>
                    <a href="#rent" className="text-sm hover:text-primary" onClick={onRentClick}>
                      Rent
                    </a>
                    <a href="#new-developments" className="text-sm hover:text-primary">
                      New Developments
                    </a>
                  </div>
                </div>
                <a href="#services" className="text-lg font-medium hover:text-primary">
                  Services
                </a>
                <a href="#agents" className="text-lg font-medium hover:text-primary">
                  Agents
                </a>
                <a href="#about" className="text-lg font-medium hover:text-primary">
                  About Us
                </a>
                <a href="#contact" className="text-lg font-medium hover:text-primary">
                  Contact
                </a>
                <Button className="mt-4 w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Agent
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="border-t p-2 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 pr-8 text-sm focus:border-primary focus:outline-none"
            />
            <X
              className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setIsSearchOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Mobile Admin Panel */}
      {isAdminOpen && (
        <div className="border-t p-4 md:hidden">
          <form onSubmit={handleAdminSubmit} className="flex flex-col gap-2">
            <div className="text-sm font-medium">Admin Access</div>
            <Input
              type="password"
              placeholder="Enter admin code"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      )}
    </nav>
  )
}

export default Navbar

