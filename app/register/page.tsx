"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Shield } from "lucide-react"

export default function RegisterPage() {
  const searchParams = useSearchParams()

  // Use useMemo to get the initial account type from URL params
  const initialAccountType = useMemo(() => {
    const type = searchParams.get("type")
    return type === "demo" || type === "ld" ? type : "ld"
  }, [searchParams])

  const [accountType, setAccountType] = useState<"ld" | "demo">(initialAccountType)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    const submissionData = { ...formData, accountType }
    console.log("Registration data:", submissionData)

    // Generate demo credentials
    const demoUsername = `demo_${Math.random().toString(36).substring(2, 8)}`
    const demoPassword = Math.random().toString(36).substring(2, 10)

    // Redirect to success page with credentials
    window.location.href = `/register/success?username=${demoUsername}&password=${demoPassword}&type=${accountType}`
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAccountTypeChange = (value: "ld" | "demo") => {
    setAccountType(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-md">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {accountType === "ld" ? (
                <div className="flex items-center space-x-2">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <Badge variant="secondary">L&D Account</Badge>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="h-8 w-8 text-purple-600" />
                  <Badge variant="outline">Demo Account</Badge>
                </div>
              )}
            </div>
            <CardTitle className="text-2xl">
              {accountType === "ld" ? "Register for L&D Management" : "Get Demo Access"}
            </CardTitle>
            <CardDescription>
              {accountType === "ld"
                ? "Get 5 hours free monthly + demo credentials for testing"
                : "10-day trial access with instant demo credentials"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <Select value={accountType} onValueChange={handleAccountTypeChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ld">L&D Management (5 hours free/month)</SelectItem>
                    <SelectItem value="demo">Demo Account (10 days trial)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                {accountType === "ld" ? "Create L&D Account" : "Get Demo Access"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
