"use client"

import { Label } from "@/components/ui/label"

import { useSearchParams } from "next/navigation"
import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, CheckCircle, Clock, Shield, Calendar } from "lucide-react"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState({ username: false, password: false })

  // Memoize the credentials to prevent infinite re-renders
  const credentials = useMemo(() => {
    return {
      username: searchParams.get("username") || "",
      password: searchParams.get("password") || "",
      type: searchParams.get("type") || "ld",
    }
  }, [searchParams])

  const copyToClipboard = async (text: string, field: "username" | "password") => {
    await navigator.clipboard.writeText(text)
    setCopied((prev) => ({ ...prev, [field]: true }))
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [field]: false }))
    }, 2000)
  }

  const startDate = new Date()
  const endDate = new Date()
  if (credentials.type === "demo") {
    endDate.setDate(startDate.getDate() + 10)
  } else {
    endDate.setMonth(startDate.getMonth() + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-green-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-3xl text-green-800">Registration Successful!</CardTitle>
            <CardDescription className="text-lg">
              Your {credentials.type === "ld" ? "L&D Management" : "Demo"} account has been created
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Account Type Badge */}
            <div className="flex justify-center">
              {credentials.type === "ld" ? (
                <Badge variant="secondary" className="px-4 py-2">
                  <Clock className="h-4 w-4 mr-2" />
                  L&D Management Account
                </Badge>
              ) : (
                <Badge variant="outline" className="px-4 py-2">
                  <Shield className="h-4 w-4 mr-2" />
                  Demo Account
                </Badge>
              )}
            </div>

            {/* Demo Credentials */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Your Demo Credentials
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Username</Label>
                    <p className="font-mono text-lg">{credentials.username}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(credentials.username, "username")}>
                    {copied.username ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Password</Label>
                    <p className="font-mono text-lg">{credentials.password}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(credentials.password, "password")}>
                    {copied.password ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Account Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Start Date</Label>
                  <p className="text-lg">{startDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    {credentials.type === "demo" ? "End Date" : "Next Billing"}
                  </Label>
                  <p className="text-lg">{endDate.toLocaleDateString()}</p>
                </div>
                {credentials.type === "ld" && (
                  <>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Free Hours</Label>
                      <p className="text-lg">5 hours/month</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Status</Label>
                      <Badge variant="secondary">Free Trial</Badge>
                    </div>
                  </>
                )}
                {credentials.type === "demo" && (
                  <>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Validity</Label>
                      <p className="text-lg">10 days</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Status</Label>
                      <Badge variant="outline">Demo Active</Badge>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Save your demo credentials in a secure location
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Use these credentials to test our platform features
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {credentials.type === "ld"
                    ? "Monitor your usage to stay within the 5-hour free limit"
                    : "Remember that demo access expires in 10 days"}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Contact support if you need assistance
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full">Go to Dashboard</Button>
              </Link>
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Test Demo Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
