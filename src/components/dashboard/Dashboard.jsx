import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Bell,
  TrendingUp,
  Clock,
  CircleDollarSign,
  PlusCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats] = useState({
    total: 150,
    active: 89,
    expired: 61,
    totalReserved: 5420,
  });

  const [timeframeData] = useState([
    { name: "Mon", count: 4 },
    { name: "Tue", count: 7 },
    { name: "Wed", count: 5 },
    { name: "Thu", count: 9 },
    { name: "Fri", count: 6 },
    { name: "Sat", count: 3 },
    { name: "Sun", count: 4 },
  ]);

  const [notifications] = useState([
    { id: 1, message: "New BRT ONE created - 20 $BLU", time: "2 mins ago" },
    { id: 2, message: "BRT ALPINE updated - 50 $BLU", time: "5 mins ago" },
    { id: 3, message: "BRT TWO expired - 100 $BLU", time: "10 mins ago" },
  ]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/brts/create"
              className="w-full text-left px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Create BRT
            </Link>
          </li>
          <li>
            <Link
              to="/brts"
              className="w-full text-left px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              View BRTs
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">BRT Management Dashboard</h1>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <PlusCircle className="h-5 w-5 mr-2" />
            Create BRT
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total BRTs</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active BRTs</CardTitle>
              <Clock className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.active}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Expired BRTs
              </CardTitle>
              <Clock className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.expired}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reserved $BLU
              </CardTitle>
              <CircleDollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalReserved}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>BRT Creation Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="weekly">
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                <TabsContent value="weekly" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timeframeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Real-time Notifications</CardTitle>
              <Bell className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex flex-col space-y-1 border-b pb-3"
                  >
                    <p className="text-sm">{notification.message}</p>
                    <span className="text-xs text-gray-500">
                      {notification.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
