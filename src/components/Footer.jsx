import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="bg-gray-100 mt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">RentAHouse</h3>
                <p className="text-gray-600">
                  Find your perfect property with our extensive listings and expert agents.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      Properties
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Popular Locations</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      New York, NY
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      Los Angeles, CA
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      Miami, FL
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      San Francisco, CA
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                <address className="not-italic text-gray-600">
                  <p>123 Real Estate Ave</p>
                  <p>New York, NY 10001</p>
                  <p className="mt-2">Email: info@rentahouse.com</p>
                  <p>Phone: (123) 456-7890</p>
                </address>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
              <p>© {new Date().getFullYear()} RentAHouse. All rights reserved.</p>
            </div>
          </div>
        </footer>
    </>
  )
}

export default Footer