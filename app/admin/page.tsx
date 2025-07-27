"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Clock, Shield, Search, Filter, MoreHorizontal, Calendar, AlertTriangle } from "lucide-react"

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for demonstration
  const [accounts] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@company.com",
      company: "Acme Corp",
      type: "ld",
      status: "active",
      hoursUsed: 2.5,
      hoursLimit: 5,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      demoCredentials: { username: "demo_abc123", password: "temp_pass_456" },
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@startup.com",
      company: "Tech Startup",
      type: "demo",
      status: "active",
      hoursUsed: 0,
      hoursLimit: 0,
      startDate: "2024-01-20",
      endDate: "2024-01-30",
      demoCredentials: { username: "demo_xyz789", password: "temp_pass_123" },
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@enterprise.com",
      company: "Enterprise Inc",
      type: "ld",
      status: "expired",
      hoursUsed: 5,
      hoursLimit: 5,
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      demoCredentials: { username: "demo_def456", password: "temp_pass_789" },
    },
  ])

  const filteredAccounts = accounts.filter(
    (account) =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    totalAccounts: accounts.length,
    ldAccounts: accounts.filter((a) => a.type === "ld").length,
    demoAccounts: accounts.filter((a) => a.type === "demo").length,
    activeAccounts: accounts.filter((a) => a.status === "active").length,
    expiredAccounts: accounts.filter((a) => a.status === "expired").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage L&D and Demo accounts</p>
            </div>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Add New Account
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAccounts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">L&D Accounts</CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.ldAccounts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demo Accounts</CardTitle>
              <Shield className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.demoAccounts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeAccounts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expired</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.expiredAccounts}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="accounts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="accounts">All Accounts</TabsTrigger>
            <TabsTrigger value="ld">L&D Accounts</TabsTrigger>
            <TabsTrigger value="demo">Demo Accounts</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Account Management</CardTitle>
                    <CardDescription>Manage all user accounts and demo access</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search accounts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Usage/Validity</TableHead>
                      <TableHead>Demo Credentials</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAccounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{account.name}</div>
                            <div className="text-sm text-gray-500">{account.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{account.company}</TableCell>
                        <TableCell>
                          <Badge variant={account.type === "ld" ? "default" : "outline"}>
                            {account.type === "ld" ? "L&D" : "Demo"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={account.status === "active" ? "default" : "destructive"}>
                            {account.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {account.type === "ld" ? (
                            <div className="text-sm">
                              <div>
                                {account.hoursUsed}/{account.hoursLimit} hours
                              </div>
                              <div className="text-gray-500">Next: {account.endDate}</div>
                            </div>
                          ) : (
                            <div className="text-sm">
                              <div>Expires: {account.endDate}</div>
                              <div className="text-gray-500">10 days total</div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-mono">
                            <div>{account.demoCredentials.username}</div>
                            <div className="text-gray-500">{account.demoCredentials.password}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ld">
            <Card>
              <CardHeader>
                <CardTitle>L&D Accounts</CardTitle>
                <CardDescription>Learning & Development account management</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Hours Used</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Next Billing</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAccounts
                      .filter((a) => a.type === "ld")
                      .map((account) => (
                        <TableRow key={account.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{account.name}</div>
                              <div className="text-sm text-gray-500">{account.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span>
                                {account.hoursUsed}/{account.hoursLimit}
                              </span>
                              <div className="w-16 h-2 bg-gray-200 rounded">
                                <div
                                  className="h-2 bg-blue-600 rounded"
                                  style={{ width: `${(account.hoursUsed / account.hoursLimit) * 100}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={account.status === "active" ? "default" : "destructive"}>
                              {account.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{account.endDate}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demo">
            <Card>
              <CardHeader>
                <CardTitle>Demo Accounts</CardTitle>
                <CardDescription>10-day demo access management</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAccounts
                      .filter((a) => a.type === "demo")
                      .map((account) => (
                        <TableRow key={account.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{account.name}</div>
                              <div className="text-sm text-gray-500">{account.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{account.startDate}</TableCell>
                          <TableCell>{account.endDate}</TableCell>
                          <TableCell>
                            <Badge variant={account.status === "active" ? "default" : "destructive"}>
                              {account.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Extend
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expired">
            <Card>
              <CardHeader>
                <CardTitle>Expired Accounts</CardTitle>
                <CardDescription>Accounts that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Expired Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAccounts
                      .filter((a) => a.status === "expired")
                      .map((account) => (
                        <TableRow key={account.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{account.name}</div>
                              <div className="text-sm text-gray-500">{account.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={account.type === "ld" ? "default" : "outline"}>
                              {account.type === "ld" ? "L&D" : "Demo"}
                            </Badge>
                          </TableCell>
                          <TableCell>{account.endDate}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Reactivate
                              </Button>
                              <Button variant="ghost" size="sm">
                                Contact
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
