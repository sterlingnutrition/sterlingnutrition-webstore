import React from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { Card } from "components/ui/card"

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-50 rounded-full text-blue-600">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Email Us</h3>
          <p className="text-gray-600 mb-2">Get in touch via email</p>
          <a
            href="mailto:dhileepkumargm@21st.dev"
            className="text-blue-600 hover:underline"
          >
            dhileepkumargm@21st.dev
          </a>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="p-3 bg-green-50 rounded-full text-green-600">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Call Us</h3>
          <p className="text-gray-600 mb-2">Speak directly with our team</p>
          <a href="tel:+15551234567" className="text-blue-600 hover:underline">
            +1 (555) 123-4567
          </a>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="p-3 bg-purple-50 rounded-full text-purple-600">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
          <p className="text-gray-600 mb-2">Our headquarters</p>
          <p className="text-gray-800">San Francisco, CA</p>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
