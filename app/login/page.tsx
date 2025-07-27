"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [demoData, setDemoData] = useState({
    username: "",
    password: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle regular login
    console.log("Login:", loginData)
    window.location.href = "/dashboard"
  }

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle demo login
    console.log("Demo Login:", demoData)
    window.location.href = "/demo-dashboard"
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
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Access your account or use demo credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account Login</TabsTrigger>
                <TabsTrigger value="demo">Demo Login</TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="demo">
                <form onSubmit={handleDemoLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="demo-username">Demo Username</Label>
                    <Input
                      id="demo-username"
                      value={demoData.username}
                      onChange={(e) => setDemoData((prev) => ({ ...prev, username: e.target.value }))}
                      placeholder="demo_abc123"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-password">Demo Password</Label>
                    <Input
                      id="demo-password"
                      type="password"
                      value={demoData.password}
                      onChange={(e) => setDemoData((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="temp_pass_456"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-transparent" variant="outline">
                    Demo Login
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600 hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
