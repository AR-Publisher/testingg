"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const revenueData = [
    { name: "Jan", total: 1200 },
    { name: "Feb", total: 1500 },
    { name: "Mar", total: 1800 },
    { name: "Apr", total: 2200 },
    { name: "May", total: 2500 },
    { name: "Jun", total: 2800 },
  ]

  const patronData = [
    { name: "Basic", value: 400 },
    { name: "Pro", value: 300 },
    { name: "Premium", value: 150 },
  ]

  const engagementData = [
    { name: "Mon", comments: 20, likes: 40 },
    { name: "Tue", comments: 25, likes: 50 },
    { name: "Wed", comments: 30, likes: 60 },
    { name: "Thu", comments: 22, likes: 45 },
    { name: "Fri", comments: 28, likes: 55 },
    { name: "Sat", comments: 35, likes: 70 },
    { name: "Sun", comments: 40, likes: 80 },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Creator Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patrons">Patrons</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={revenueData}
                  index="name"
                  categories={["total"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `$${value}`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Patron Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={patronData}
                  index="name"
                  category="value"
                  colors={["blue", "green", "yellow"]}
                  valueFormatter={(value) => `${value} patrons`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="patrons">
          <Card>
            <CardHeader>
              <CardTitle>Patron Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={revenueData}
                index="name"
                categories={["total"]}
                colors={["green"]}
                valueFormatter={(value) => `${value} patrons`}
                className="aspect-[16/9]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={engagementData}
                index="name"
                categories={["comments", "likes"]}
                colors={["blue", "pink"]}
                valueFormatter={(value) => `${value}`}
                className="aspect-[16/9]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

