import { Link } from "react-router";
import {
  LayoutDashboard,
  ShoppingCart,
  Store,
  TrendingUp,
  Menu,
  Bell,
  Search,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Package,
  Clock,
  CheckCircle2,
  DollarSign,
  FileText,
  Printer,
  Users,
  Calendar,
  MapPin,
  Phone,
  Mail as MailIcon,
  Eye,
  X,
  AlertCircle,
  Settings,
  Upload,
  Shield,
  Trash2,
  Plus,
  MoreVertical,
  Edit2,
  Filter,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  CalendarIcon,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";
import logo from "figma:asset/992e51a9268ff5106d57083d372c6962b2244f1b.png";
import { useAuth } from "../contexts/auth-context";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

type ViewType = "dashboard" | "orders" | "shop-management" | "paper-pricing" | "transactions" | "sales-reports";
type OrderStatus = "pending" | "processing" | "ready" | "completed";

interface Order {
  id: string;
  customerName: string;
  fileName: string;
  filePreview: string;
  printOptions: {
    size: string;
    color: string;
    copies: number;
    services: string[];
  };
  status: OrderStatus;
  amount: number;
  date: string;
  paymentStatus: "paid";
  customerNote?: string;
  preferredPickupTime?: string;
  paymentMethod?: string;
  transactionRef?: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Maria Santos",
    fileName: "Thesis_Final.pdf",
    filePreview: "PDF Document",
    printOptions: {
      size: "A4",
      color: "Black & White",
      copies: 5,
      services: ["Print", "Bind"],
    },
    status: "pending",
    amount: 450,
    date: "2026-03-21",
    paymentStatus: "paid",
    customerNote: "Please use spiral binding. Need this by 3 PM today. Thank you!",
    preferredPickupTime: "3:00 PM",
    paymentMethod: "GCash",
    transactionRef: "GCASH-2026032101234",
  },
  {
    id: "ORD-002",
    customerName: "Jose Reyes",
    fileName: "Resume.docx",
    filePreview: "Word Document",
    printOptions: {
      size: "Letter",
      color: "Color",
      copies: 3,
      services: ["Print", "Laminate"],
    },
    status: "processing",
    amount: 280,
    date: "2026-03-21",
    paymentStatus: "paid",
    customerNote: "Please laminate all copies. High quality preferred.",
    preferredPickupTime: "5:30 PM",
    paymentMethod: "PayMaya",
    transactionRef: "PAYMAYA-2026032102456",
  },
  {
    id: "ORD-003",
    customerName: "Ana Cruz",
    fileName: "Presentation.pptx",
    filePreview: "PowerPoint",
    printOptions: {
      size: "A4",
      color: "Color",
      copies: 10,
      services: ["Print"],
    },
    status: "ready",
    amount: 680,
    date: "2026-03-20",
    paymentStatus: "paid",
    customerNote: "Color printing must be vibrant. Will pick up at 5 PM.",
    preferredPickupTime: "5:00 PM",
    paymentMethod: "GCash",
    transactionRef: "GCASH-2026032003789",
  },
  {
    id: "ORD-004",
    customerName: "Pedro Lopez",
    fileName: "Contract.pdf",
    filePreview: "PDF Document",
    printOptions: {
      size: "Legal",
      color: "Black & White",
      copies: 2,
      services: ["Print", "Bind"],
    },
    status: "completed",
    amount: 320,
    date: "2026-03-19",
    paymentStatus: "paid",
    customerNote: "Legal size paper required. Bind with hard cover.",
    preferredPickupTime: "2:00 PM",
    paymentMethod: "GCash",
    transactionRef: "GCASH-2026031904321",
  },
];

export function AdminDashboard() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const totalOrders = orders.length;
  const processingOrders = orders.filter((o) => o.status === "processing").length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;

  const handleAcceptOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "processing" } : order
      )
    );
  };

  const handleUpdateStatus = (order: Order) => {
    let newStatus: OrderStatus;
    
    if (order.status === "processing") {
      newStatus = "ready";
    } else if (order.status === "ready") {
      newStatus = "completed";
    } else {
      return; // Do nothing for other statuses
    }
    
    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id ? { ...o, status: newStatus } : o
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#DBEAFE] flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white/95 backdrop-blur-sm border-r border-border/50 shadow-xl transition-all duration-300 ${
          sidebarOpen ? "w-60" : "w-18"
        }`}
      >
        <div className="h-full flex flex-col justify-between overflow-hidden">
          <div className="flex flex-col gap-4">
            {/* Logo */}
            <div className={`h-16 flex items-center border-b border-border transition-all duration-300 ${
              sidebarOpen ? "px-6" : "px-4 justify-center"
            }`}>
              <img src={logo} alt="Logo" className={`h-10 w-auto transition-all duration-300 ${
                sidebarOpen ? "" : "h-8"
              }`} />
            </div>

            {/* Shop Info */}
            <div className={`border-b border-gray-100 bg-gradient-to-br from-[#CAF0F8]/30 to-[#E0F2FE]/30 transition-all duration-300 ${
              sidebarOpen ? "px-6 py-4" : "px-2 py-3"
            }`}>
              {sidebarOpen ? (
                <>
                  <p className="text-xs text-gray-500 mb-1 font-medium">Print Shop</p>
                  <h3 className="font-bold text-[#03045E]">QuickPrint Calbayog</h3>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Calbayog City
                  </p>
                </>
              ) : (
                <div className="w-full flex justify-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00BAD8] to-[#0077B6] flex items-center justify-center shadow-md">
                    <Store className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className={`flex flex-col gap-2 transition-all duration-300 ${
              sidebarOpen ? "px-4" : "px-2"
            }`}>
              <button
                onClick={() => setCurrentView("dashboard")}
                className={`flex items-center gap-3 rounded-xl transition-all duration-300 relative group ${
                  currentView === "dashboard"
                    ? "text-white bg-gradient-to-r from-[#0077B6] to-[#00BAD8] shadow-lg shadow-blue-200"
                    : "text-gray-700 hover:bg-gradient-to-br hover:from-[#CAF0F8]/50 hover:to-[#E0F2FE]/50"
                } ${sidebarOpen ? "px-4 py-3 justify-start" : "px-3 py-3 justify-center"}`}
              >
                <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="whitespace-nowrap font-medium">Dashboard</span>}
              </button>
              <button
                onClick={() => setCurrentView("orders")}
                className={`flex items-center gap-3 rounded-xl transition-all duration-300 relative group ${
                  currentView === "orders"
                    ? "text-white bg-gradient-to-r from-[#0077B6] to-[#00BAD8] shadow-lg shadow-blue-200"
                    : "text-gray-700 hover:bg-gradient-to-br hover:from-[#CAF0F8]/50 hover:to-[#E0F2FE]/50"
                } ${sidebarOpen ? "px-4 py-3 justify-start" : "px-3 py-3 justify-center"}`}
              >
                <ShoppingCart className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="whitespace-nowrap font-medium">Orders</span>}
              </button>
              <button
                onClick={() => setCurrentView("shop-management")}
                className={`flex items-center gap-3 rounded-xl transition-all duration-300 relative group ${
                  currentView === "shop-management"
                    ? "text-white bg-gradient-to-r from-[#0077B6] to-[#00BAD8] shadow-lg shadow-blue-200"
                    : "text-gray-700 hover:bg-gradient-to-br hover:from-[#CAF0F8]/50 hover:to-[#E0F2FE]/50"
                } ${sidebarOpen ? "px-4 py-3 justify-start" : "px-3 py-3 justify-center"}`}
              >
                <Store className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="whitespace-nowrap font-medium">Shop Management</span>}
              </button>
              <button
                onClick={() => setCurrentView("paper-pricing")}
                className={`flex items-center gap-3 rounded-xl transition-all duration-300 relative group ${
                  currentView === "paper-pricing"
                    ? "text-white bg-gradient-to-r from-[#0077B6] to-[#00BAD8] shadow-lg shadow-blue-200"
                    : "text-gray-700 hover:bg-gradient-to-br hover:from-[#CAF0F8]/50 hover:to-[#E0F2FE]/50"
                } ${sidebarOpen ? "px-4 py-3 justify-start" : "px-3 py-3 justify-center"}`}
              >
                <FileText className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="whitespace-nowrap font-medium">Paper Pricing</span>}
              </button>
              <button
                onClick={() => setCurrentView("transactions")}
                className={`flex items-center gap-3 rounded-xl transition-all duration-300 relative group ${
                  currentView === "transactions"
                    ? "text-white bg-gradient-to-r from-[#0077B6] to-[#00BAD8] shadow-lg shadow-blue-200"
                    : "text-gray-700 hover:bg-gradient-to-br hover:from-[#CAF0F8]/50 hover:to-[#E0F2FE]/50"
                } ${sidebarOpen ? "px-4 py-3 justify-start" : "px-3 py-3 justify-center"}`}
              >
                <DollarSign className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="whitespace-nowrap font-medium">Transactions</span>}
              </button>
              <button
                onClick={() => setCurrentView("sales-reports")}
                className={`flex items-center gap-3 rounded-xl transition-all duration-300 relative group ${
                  currentView === "sales-reports"
                    ? "text-white bg-gradient-to-r from-[#0077B6] to-[#00BAD8] shadow-lg shadow-blue-200"
                    : "text-gray-700 hover:bg-gradient-to-br hover:from-[#CAF0F8]/50 hover:to-[#E0F2FE]/50"
                } ${sidebarOpen ? "px-4 py-3 justify-start" : "px-3 py-3 justify-center"}`}
              >
                <TrendingUp className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="whitespace-nowrap font-medium">Sales Reports</span>}
              </button>
            </nav>
          </div>

          {/* Logout */}
          <div className={`border-t border-gray-100 transition-all duration-300 ${
            sidebarOpen ? "p-4" : "p-2"
          }`}>
            <button
              onClick={logout}
              className={`w-full flex items-center gap-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 ${
                sidebarOpen ? "px-4 py-3 justify-start" : "px-3 py-3 justify-center"
              }`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="whitespace-nowrap font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-18"}`}>
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/50 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all hover:scale-105"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#03045E] to-[#0077B6] bg-clip-text text-transparent hidden sm:block">Admin Panel</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2.5 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-xl transition-all hover:scale-105">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-br from-[#00BAD8] to-[#0077B6] rounded-full ring-2 ring-white"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Juan Dela Cruz</p>
                <p className="text-xs text-gray-500">Shop Owner</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#00BAD8] to-[#0077B6] rounded-full flex items-center justify-center text-white font-semibold shadow-lg ring-2 ring-white">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4 lg:p-8">
          {currentView === "dashboard" && <DashboardView stats={{ totalOrders, processingOrders, completedOrders }} orders={orders} />}
          {currentView === "orders" && (
            <OrdersView
              orders={orders}
              onAcceptOrder={handleAcceptOrder}
              onViewDetails={setSelectedOrder}
              onUpdateStatus={handleUpdateStatus}
            />
          )}
          {currentView === "shop-management" && <ShopManagementView />}
          {currentView === "paper-pricing" && <PaperPricingView />}
          {currentView === "transactions" && <TransactionsView orders={orders} />}
          {currentView === "sales-reports" && <SalesReportsView orders={orders} />}
        </main>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)}
          onAcceptOrder={handleAcceptOrder}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}

// Dashboard View Component
function DashboardView({ stats, orders }: { stats: { totalOrders: number; processingOrders: number; completedOrders: number }; orders: Order[] }) {
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const todaySales = 1450; // Mock today's sales
  
  // Mock data for mini line chart
  const miniChartData = [
    { day: "Mon", amount: 850 },
    { day: "Tue", amount: 920 },
    { day: "Wed", amount: 1150 },
    { day: "Thu", amount: 980 },
    { day: "Fri", amount: 1450 },
  ];

  // Mock data for weekly sales chart
  const weeklySalesData = [
    { day: "Mon", sales: 2500 },
    { day: "Tue", sales: 3200 },
    { day: "Wed", sales: 2800 },
    { day: "Thu", sales: 4100 },
    { day: "Fri", sales: 3900 },
    { day: "Sat", sales: 4500 },
    { day: "Sun", sales: 3300 },
  ];

  // Calculate progress percentages for circular progress
  const totalOrdersCount = orders.length;
  const processingPercentage = (stats.processingOrders / totalOrdersCount) * 100 || 0;
  const pendingPercentage = (pendingOrders / totalOrdersCount) * 100 || 0;
  const completedPercentage = (stats.completedOrders / totalOrdersCount) * 100 || 0;

  // Mock recent activity data
  const recentActivities = [
    { id: 1, text: "New order received from Maria Santos", time: "5 mins ago", icon: "order" },
    { id: 2, text: "Order ORD-002 marked as processing", time: "15 mins ago", icon: "processing" },
    { id: 3, text: "Payment confirmed for ORD-003", time: "1 hour ago", icon: "payment" },
    { id: 4, text: "Order ORD-004 completed", time: "2 hours ago", icon: "completed" },
    { id: 5, text: "New customer registration", time: "3 hours ago", icon: "user" },
  ];

  // Get customer initials for avatars
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Generate random avatar colors
  const avatarColors = [
    "bg-gradient-to-br from-blue-400 to-blue-600",
    "bg-gradient-to-br from-purple-400 to-purple-600",
    "bg-gradient-to-br from-pink-400 to-pink-600",
    "bg-gradient-to-br from-green-400 to-green-600",
    "bg-gradient-to-br from-yellow-400 to-yellow-600",
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* Main Content Area */}
      <div className="xl:col-span-9 space-y-6">
        {/* Welcome Banner with Gradient */}
        <div className="relative bg-gradient-to-br from-[#0077B6] via-[#00BAD8] to-[#0096C7] rounded-2xl p-8 overflow-hidden shadow-xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome back, QuickPrint! 👋</h2>
              <p className="text-white/90 text-lg">Here's what's happening with your print shop today.</p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Printer className="w-14 h-14 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards with Enhanced Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Orders Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                <Package className="w-7 h-7 text-[#0077B6]" />
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                +12%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-[#03045E] mb-1">{stats.totalOrders}</h3>
            <p className="text-sm text-gray-500 font-medium">Total Orders</p>
          </div>

          {/* Processing Orders Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl">
                <Clock className="w-7 h-7 text-yellow-600" />
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                Active
              </span>
            </div>
            <h3 className="text-3xl font-bold text-[#03045E] mb-1">{stats.processingOrders}</h3>
            <p className="text-sm text-gray-500 font-medium">Processing Orders</p>
          </div>

          {/* Pending Orders Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl">
                <AlertCircle className="w-7 h-7 text-orange-600" />
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                {pendingOrders}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-[#03045E] mb-1">{pendingOrders}</h3>
            <p className="text-sm text-gray-500 font-medium">Pending Orders</p>
          </div>

          {/* Today Sales Card with Mini Chart */}
          <div className="bg-gradient-to-br from-[#00BAD8] to-[#0077B6] rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-white bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                +8%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">₱{todaySales}</h3>
            <p className="text-sm text-white/90 font-medium mb-3">Today's Sales</p>
            {/* Mini Line Chart */}
            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={miniChartData}>
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="white"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sales This Week - Large Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[#03045E]">Sales This Week</h3>
              <span className="text-sm text-gray-500">Last 7 days</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={weeklySalesData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00BAD8" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00BAD8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#9ca3af" 
                  style={{ fontSize: '12px' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  style={{ fontSize: '12px' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value: any) => [`₱${value}`, 'Sales']}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#00BAD8"
                  strokeWidth={3}
                  dot={{ fill: '#00BAD8', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7 }}
                  fill="url(#salesGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Orders Status - Circular Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-[#03045E] mb-6">Orders Status</h3>
            <div className="space-y-6">
              {/* Processing */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Processing</span>
                  <span className="text-sm font-semibold text-[#0077B6]">{stats.processingOrders}</span>
                </div>
                <div className="relative">
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#0077B6] to-[#00BAD8] rounded-full transition-all duration-500"
                      style={{ width: `${processingPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Pending */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Pending</span>
                  <span className="text-sm font-semibold text-yellow-600">{pendingOrders}</span>
                </div>
                <div className="relative">
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
                      style={{ width: `${pendingPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Completed */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Completed</span>
                  <span className="text-sm font-semibold text-green-600">{stats.completedOrders}</span>
                </div>
                <div className="relative">
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${completedPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Total Orders</span>
                  <span className="text-2xl font-bold text-[#03045E]">{totalOrdersCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table with Avatars */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#03045E]">Recent Orders</h3>
              <button className="text-sm text-[#0077B6] hover:text-[#00BAD8] font-medium transition-colors">
                View All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#CAF0F8]/50 to-[#CAF0F8]/30">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Customer</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Order ID</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">File Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Amount</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.slice(0, 5).map((order, index) => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-gradient-to-r hover:from-[#CAF0F8]/20 hover:to-transparent transition-all duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-semibold text-sm shadow-md`}>
                          {getInitials(order.customerName)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{order.customerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-[#0077B6]">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{order.fileName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">₱{order.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadgeModern status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Recent Activity */}
      <div className="xl:col-span-3 space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-[#03045E]">Recent Activity</h3>
            <Bell className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activity.icon === 'order' ? 'bg-blue-100' :
                  activity.icon === 'processing' ? 'bg-yellow-100' :
                  activity.icon === 'payment' ? 'bg-purple-100' :
                  activity.icon === 'completed' ? 'bg-green-100' :
                  'bg-gray-100'
                }`}>
                  {activity.icon === 'order' && <ShoppingCart className="w-4 h-4 text-blue-600" />}
                  {activity.icon === 'processing' && <Clock className="w-4 h-4 text-yellow-600" />}
                  {activity.icon === 'payment' && <DollarSign className="w-4 h-4 text-purple-600" />}
                  {activity.icon === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                  {activity.icon === 'user' && <Users className="w-4 h-4 text-gray-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 leading-relaxed">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-[#03045E] to-[#0077B6] rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">Today's Revenue</span>
              <span className="text-xl font-bold">₱{todaySales}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">Active Customers</span>
              <span className="text-xl font-bold">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">Avg. Order Time</span>
              <span className="text-xl font-bold">2.5h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modern Status Badge Component with Soft Colors
function StatusBadgeModern({ status }: { status: OrderStatus }) {
  const styles = {
    pending: "bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border border-orange-200",
    processing: "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200",
    ready: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200",
    completed: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200",
  };

  const icons = {
    pending: Clock,
    processing: TrendingUp,
    ready: Package,
    completed: CheckCircle2,
  };

  const Icon = icons[status];

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${styles[status]}`}>
      <Icon className="w-3.5 h-3.5" />
      <span className="capitalize">{status}</span>
    </span>
  );
}

// Orders View Component
function OrdersView({
  orders,
  onAcceptOrder,
  onViewDetails,
  onUpdateStatus,
}: {
  orders: Order[];
  onAcceptOrder: (id: string) => void;
  onViewDetails: (order: Order) => void;
  onUpdateStatus: (order: Order) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | OrderStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Show 5 orders per page

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterTab === "all" || order.status === filterTab;

    return matchesSearch && matchesFilter;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilter: "all" | OrderStatus) => {
    setFilterTab(newFilter);
    setCurrentPage(1);
  };

  // Calculate status counts
  const allCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const processingCount = orders.filter((o) => o.status === "processing").length;
  const readyCount = orders.filter((o) => o.status === "ready").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#03045E] mb-2">Order Management</h2>
        <p className="text-gray-600 mb-6">Manage and track all paid orders</p>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-2 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                filterTab === "all"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>All Orders</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filterTab === "all" ? "bg-white/20" : "bg-gray-200"
              }`}>
                {allCount}
              </span>
            </button>
            <button
              onClick={() => handleFilterChange("pending")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                filterTab === "pending"
                  ? "bg-yellow-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Pending</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filterTab === "pending" ? "bg-white/20" : "bg-gray-200"
              }`}>
                {pendingCount}
              </span>
            </button>
            <button
              onClick={() => handleFilterChange("processing")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                filterTab === "processing"
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Processing</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filterTab === "processing" ? "bg-white/20" : "bg-gray-200"
              }`}>
                {processingCount}
              </span>
            </button>
            <button
              onClick={() => handleFilterChange("ready")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                filterTab === "ready"
                  ? "bg-purple-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Ready for Pickup</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filterTab === "ready" ? "bg-white/20" : "bg-gray-200"
              }`}>
                {readyCount}
              </span>
            </button>
            <button
              onClick={() => handleFilterChange("completed")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                filterTab === "completed"
                  ? "bg-green-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Completed</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filterTab === "completed" ? "bg-white/20" : "bg-gray-200"
              }`}>
                {completedCount}
              </span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border-2 border-yellow-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-yellow-500 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl text-yellow-700">{pendingCount}</span>
            </div>
            <h3 className="text-yellow-800 font-semibold">Pending Orders</h3>
            <p className="text-sm text-yellow-600 mt-1">Awaiting acceptance</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border-2 border-blue-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-500 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl text-blue-700">{processingCount}</span>
            </div>
            <h3 className="text-blue-800 font-semibold">Processing Orders</h3>
            <p className="text-sm text-blue-600 mt-1">Currently printing</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border-2 border-purple-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-500 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl text-purple-700">{readyCount}</span>
            </div>
            <h3 className="text-purple-800 font-semibold">Ready Orders</h3>
            <p className="text-sm text-purple-600 mt-1">Ready for pickup</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border-2 border-green-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-500 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl text-green-700">{completedCount}</span>
            </div>
            <h3 className="text-green-800 font-semibold">Completed Orders</h3>
            <p className="text-sm text-green-600 mt-1">Successfully delivered</p>
          </div>
        </div>

        {/* Search Bar Only */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by order ID, customer name, or file name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl text-foreground mb-2">No Orders Found</h3>
            <p className="text-muted-foreground">No paid orders match your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-hidden">
            <table className="min-w-full max-w-full w-full table-fixed">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700" style={{ width: "10%" }}>Order ID</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700" style={{ width: "12%" }}>Customer Name</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700" style={{ width: "13%" }}>File Name</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700" style={{ width: "18%" }}>Print Details</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700" style={{ width: "13%" }}>Pickup Time</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700" style={{ width: "10%" }}>Status</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700" style={{ width: "24%" }}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-primary whitespace-nowrap">{order.id}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis block">{order.customerName}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis block" title={order.fileName}>{order.fileName}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-1.5 items-center">
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium whitespace-nowrap">
                          <FileText className="w-3 h-3 flex-shrink-0" />
                          {order.printOptions.size}
                        </span>
                        <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${
                          order.printOptions.color === 'Color'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-200 text-gray-800'
                        }`}>
                          <Printer className="w-3 h-3 flex-shrink-0" />
                          {order.printOptions.color}
                        </span>
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium whitespace-nowrap">
                          ×{order.printOptions.copies}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {order.preferredPickupTime ? (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium text-primary whitespace-nowrap">{order.preferredPickupTime}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground whitespace-nowrap">Not specified</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewDetails(order)}
                          className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow whitespace-nowrap"
                        >
                          View Details
                        </button>

                        {order.status === "processing" && (
                          <button
                            onClick={() => onUpdateStatus(order)}
                            className="px-3 py-1.5 bg-purple-600 text-white text-xs font-medium rounded-lg hover:bg-purple-700 transition-all shadow-sm hover:shadow whitespace-nowrap"
                          >
                            Mark as Ready
                          </button>
                        )}

                        {order.status === "ready" && (
                          <button
                            onClick={() => onUpdateStatus(order)}
                            className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-all shadow-sm hover:shadow whitespace-nowrap"
                          >
                            Mark as Completed
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredOrders.length > 0 && (
          <div className="border-t border-border px-6 py-4 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Showing <span className="font-semibold text-primary">{startIndex + 1}-{Math.min(endIndex, filteredOrders.length)}</span> of{" "}
                <span className="font-semibold text-primary">{filteredOrders.length}</span> order{filteredOrders.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="font-medium">Previous</span>
              </button>

              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg">
                <span className="text-sm font-semibold text-primary">{currentPage}</span>
                <span className="text-sm text-gray-500">of</span>
                <span className="text-sm font-semibold text-primary">{totalPages}</span>
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow'
                }`}
              >
                <span className="font-medium">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Shop Management View
function ShopManagementView() {
  const [isEditing, setIsEditing] = useState(false);
  const [shopData, setShopData] = useState({
    name: "QuickPrint Calbayog",
    address: "Rosales Blvd, Calbayog City, Samar",
    phone: "+63 912 345 6789",
    email: "shop@quickprint.com",
    hours: {
      weekday: "8:00 AM - 6:00 PM",
      weekend: "9:00 AM - 5:00 PM",
    },
    verified: true,
    logoUrl: logo,
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setShopData({ ...shopData, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#03045E] mb-2">Shop Management</h2>
        <p className="text-gray-600">Manage your shop details, pricing, and operating hours</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN - Shop Profile */}
        <div className="space-y-6">
          {/* Shop Profile Card */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#03045E]">Shop Profile</h3>
              {shopData.verified && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg border border-green-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              )}
            </div>

            {/* Logo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0077B6] mb-3">Shop Logo</label>
              <div className="flex items-start gap-4">
                <div className="w-28 h-28 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden flex-shrink-0">
                  {shopData.logoUrl ? (
                    <img src={shopData.logoUrl} alt="Shop Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                    <Store className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div>
                  <label className="px-5 py-2.5 bg-[#03045E] text-white rounded-xl hover:bg-[#03045E]/90 transition-all cursor-pointer inline-flex items-center gap-2 shadow-md font-medium text-sm">
                    <Upload className="w-4 h-4" />
                    <span>Upload Logo</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload}
                      className="hidden" 
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: 500x500px, PNG or JPG
                  </p>
                </div>
              </div>
            </div>

            {/* Shop Location */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0077B6] mb-3">Shop Location</label>
              <div className="relative mb-3">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0077B6]" />
                <input
                  type="text"
                  value={shopData.address}
                  onChange={(e) => setShopData({ ...shopData, address: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-12 pr-4 py-3 bg-[#E3F5FF] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BAD8] disabled:opacity-70 text-gray-700"
                  placeholder="Enter shop address"
                />
              </div>
              <button className="w-full px-4 py-3 bg-[#E3F5FF] text-[#0077B6] border border-[#00BAD8]/30 rounded-xl hover:bg-[#CAF0F8] transition-all text-sm font-medium">
                Set Location on Map
              </button>
              
              {/* Map Preview */}
              <div className="mt-4 h-48 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 relative">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-red-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 font-medium">Rosales Blvd</p>
                    <p className="text-xs text-gray-500">Calbayog City, Samar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Shop Details Card */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#03045E]">Shop Details</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-5 py-2 bg-[#03045E] text-white rounded-xl hover:bg-[#03045E]/90 transition-all shadow-md font-medium text-sm"
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Shop Name</label>
                <input
                  type="text"
                  value={shopData.name}
                  onChange={(e) => setShopData({ ...shopData, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-[#E3F5FF] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BAD8] disabled:opacity-70 text-gray-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                <input
                  type="text"
                  value={shopData.address}
                  onChange={(e) => setShopData({ ...shopData, address: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-[#E3F5FF] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BAD8] disabled:opacity-70 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                <input
                  type="text"
                  value={shopData.phone}
                  onChange={(e) => setShopData({ ...shopData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-[#E3F5FF] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BAD8] disabled:opacity-70 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  value={shopData.email}
                  onChange={(e) => setShopData({ ...shopData, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-[#E3F5FF] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BAD8] disabled:opacity-70 text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-[#03045E] mb-6">Operating Hours</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Weekday Hours</label>
                <div className="px-4 py-3 bg-[#E3F5FF] rounded-xl text-gray-700 font-medium">
                  {shopData.hours.weekday}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Weekend Hours</label>
                <div className="px-4 py-3 bg-[#E3F5FF] rounded-xl text-gray-700 font-medium">
                  {shopData.hours.weekend}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Paper Pricing Management View
function PaperPricingView() {
  const [paperTypes, setPaperTypes] = useState([
    { id: 1, paperType: "Glossy", size: "A4", price: 15 },
    { id: 2, paperType: "Matte", size: "A4", price: 12 },
    { id: 3, paperType: "Glossy", size: "Letter", price: 16 },
    { id: 4, paperType: "Matte", size: "Letter", price: 13 },
    { id: 5, paperType: "Bond Paper", size: "Short", price: 5 },
    { id: 6, paperType: "Bond Paper", size: "Long", price: 7 },
    { id: 7, paperType: "Photo Paper", size: "4R", price: 25 },
    { id: 8, paperType: "Photo Paper", size: "A4", price: 35 },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const categories = ["All", "Glossy", "Matte", "Bond Paper", "Photo Paper"];

  const addPaperType = () => {
    const newId = Math.max(...paperTypes.map(p => p.id), 0) + 1;
    const newPaper = { id: newId, paperType: "New Paper Type", size: "A4", price: 0 };
    setPaperTypes([...paperTypes, newPaper]);
    setEditingId(newId);
  };

  const updatePaperType = (id: number, field: 'paperType' | 'size' | 'price', value: string | number) => {
    setPaperTypes(paperTypes.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const deletePaperType = (id: number) => {
    setPaperTypes(paperTypes.filter(item => item.id !== id));
    setOpenMenuId(null);
  };

  const toggleEdit = (id: number) => {
    setEditingId(editingId === id ? null : id);
    setOpenMenuId(null);
  };

  // Filter and search logic
  const filteredPaperTypes = paperTypes.filter(paper => {
    const matchesSearch = paper.paperType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.size.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "All" || paper.paperType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Group by category
  const groupedPapers = filteredPaperTypes.reduce((acc, paper) => {
    const category = paper.paperType;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(paper);
    return acc;
  }, {} as Record<string, typeof paperTypes>);

  // Calculate summary stats
  const totalPaperTypes = paperTypes.length;
  const averagePrice = paperTypes.length > 0
    ? paperTypes.reduce((sum, p) => sum + p.price, 0) / paperTypes.length
    : 0;
  
  // Find most used paper type (for demo, using Glossy)
  const categoryCount = paperTypes.reduce((acc, p) => {
    acc[p.paperType] = (acc[p.paperType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const mostUsedPaperType = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#03045E] mb-2">Paper Pricing Management</h2>
        <p className="text-gray-600">Manage paper types, sizes, and pricing for your print shop</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-[#CAF0F8] to-white rounded-2xl shadow-sm border border-[#00BAD8]/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Paper Types</h3>
            <FileText className="w-5 h-5 text-[#0077B6]" />
          </div>
          <p className="text-3xl font-bold text-[#03045E]">{totalPaperTypes}</p>
        </div>

        <div className="bg-gradient-to-br from-[#CAF0F8] to-white rounded-2xl shadow-sm border border-[#00BAD8]/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Average Price</h3>
            <DollarSign className="w-5 h-5 text-[#0077B6]" />
          </div>
          <p className="text-3xl font-bold text-[#03045E]">₱{averagePrice.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-br from-[#CAF0F8] to-white rounded-2xl shadow-sm border border-[#00BAD8]/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Most Used Paper</h3>
            <TrendingUp className="w-5 h-5 text-[#0077B6]" />
          </div>
          <p className="text-2xl font-bold text-[#03045E]">{mostUsedPaperType}</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by paper type or size..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BAD8] transition-all"
            />
          </div>

          {/* Add Paper Category Button */}
          <button
            onClick={addPaperType}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00BAD8] text-white rounded-lg hover:bg-[#0077B6] transition-colors shadow-sm whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Paper Category</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 mr-2">Filter:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedFilter === category
                  ? "bg-[#00BAD8] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped Categories */}
      {Object.keys(groupedPapers).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedPapers).map(([category, items]) => (
            <div key={category} className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-[#03045E] to-[#0077B6] px-6 py-4">
                <h3 className="text-xl font-bold text-white">{category}</h3>
                <p className="text-sm text-[#CAF0F8] mt-1">{items.length} size{items.length !== 1 ? 's' : ''} available</p>
              </div>

              {/* Category Items */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((paper) => (
                    <div
                      key={paper.id}
                      className="relative bg-gradient-to-br from-[#CAF0F8]/30 to-white border border-[#00BAD8]/20 rounded-xl p-5 hover:shadow-md hover:border-[#00BAD8]/40 transition-all group"
                    >
                      {editingId === paper.id ? (
                        // Edit Mode
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs font-medium text-gray-600 mb-1 block">Paper Type</label>
                            <input
                              type="text"
                              value={paper.paperType}
                              onChange={(e) => updatePaperType(paper.id, 'paperType', e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BAD8] text-sm"
                              placeholder="Paper type"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-600 mb-1 block">Size</label>
                            <input
                              type="text"
                              value={paper.size}
                              onChange={(e) => updatePaperType(paper.id, 'size', e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BAD8] text-sm"
                              placeholder="Size"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-600 mb-1 block">Price</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₱</span>
                              <input
                                type="number"
                                value={paper.price}
                                onChange={(e) => updatePaperType(paper.id, 'price', Number(e.target.value))}
                                className="w-full pl-8 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BAD8] text-sm"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => toggleEdit(paper.id)}
                              className="flex-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-[#03045E] mb-1">{paper.size}</h4>
                              <p className="text-sm text-gray-600">{paper.paperType}</p>
                            </div>
                            
                            {/* 3-Dot Menu */}
                            <div className="relative">
                              <button
                                onClick={() => setOpenMenuId(openMenuId === paper.id ? null : paper.id)}
                                className="p-1 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <MoreVertical className="w-5 h-5 text-gray-600" />
                              </button>
                              
                              {openMenuId === paper.id && (
                                <div className="absolute right-0 top-8 bg-white border border-border rounded-lg shadow-lg z-10 w-32 overflow-hidden">
                                  <button
                                    onClick={() => toggleEdit(paper.id)}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => deletePaperType(paper.id)}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Price - Emphasized */}
                          <div className="bg-white border-2 border-[#00BAD8]/30 rounded-lg p-3 mt-3">
                            <p className="text-xs text-gray-500 mb-1">Price per sheet</p>
                            <p className="text-2xl font-bold text-[#03045E]">₱{paper.price.toFixed(2)}</p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-border p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Paper Types Found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || selectedFilter !== "All"
              ? "Try adjusting your search or filter"
              : "Add your first paper type to get started"}
          </p>
          {!searchQuery && selectedFilter === "All" && (
            <button
              onClick={addPaperType}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00BAD8] text-white rounded-lg hover:bg-[#0077B6] transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Paper Category</span>
            </button>
          )}
        </div>
      )}
    </>
  );
}

// Sales Reports View
function SalesReportsView({ orders }: { orders: Order[] }) {
  const [timeFilter, setTimeFilter] = useState<"daily" | "weekly" | "monthly">("daily");
  const [dateFilter, setDateFilter] = useState<"today" | "week" | "month" | "custom">("week");

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const averageOrderValue = totalRevenue / orders.length || 0;
  const completedRevenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, order) => sum + order.amount, 0);

  // Calculate revenue growth (mock data for demo)
  const previousRevenue = 3200; // Previous period revenue
  const revenueGrowth = ((totalRevenue - previousRevenue) / previousRevenue) * 100;
  const isGrowthPositive = revenueGrowth > 0;

  // Calculate order growth
  const previousOrders = 7;
  const orderGrowth = ((orders.length - previousOrders) / previousOrders) * 100;
  const isOrderGrowthPositive = orderGrowth > 0;

  // Calculate avg order value growth
  const previousAvgOrderValue = 420;
  const avgOrderGrowth = ((averageOrderValue - previousAvgOrderValue) / previousAvgOrderValue) * 100;
  const isAvgOrderGrowthPositive = avgOrderGrowth > 0;

  // Generate mock data for revenue chart (based on existing orders)
  const generateRevenueData = () => {
    if (timeFilter === "daily") {
      return [
        { date: "Mar 19", revenue: 320, orders: 1 },
        { date: "Mar 20", revenue: 680, orders: 1 },
        { date: "Mar 21", revenue: 730, orders: 2 },
        { date: "Mar 22", revenue: 420, orders: 1 },
        { date: "Mar 23", revenue: 890, orders: 2 },
        { date: "Mar 24", revenue: 560, orders: 1 },
        { date: "Mar 25", revenue: 780, orders: 2 },
      ];
    } else if (timeFilter === "weekly") {
      return [
        { date: "Week 1", revenue: 2450, orders: 8 },
        { date: "Week 2", revenue: 3200, orders: 11 },
        { date: "Week 3", revenue: 2890, orders: 9 },
        { date: "Week 4", revenue: 3650, orders: 13 },
      ];
    } else {
      return [
        { date: "Jan", revenue: 8500, orders: 28 },
        { date: "Feb", revenue: 9200, orders: 32 },
        { date: "Mar", revenue: 10800, orders: 38 },
      ];
    }
  };

  const revenueData = generateRevenueData();

  // Top selling paper types (mock data)
  const topPaperTypes = [
    { name: "A4 Glossy", count: 45, revenue: 675 },
    { name: "Letter Matte", count: 38, revenue: 494 },
    { name: "A4 Bond", count: 32, revenue: 160 },
    { name: "Photo 4R", count: 28, revenue: 700 },
    { name: "Legal Bond", count: 22, revenue: 154 },
  ];

  // Generate order status data
  const statusCounts = {
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    ready: orders.filter((o) => o.status === "ready").length,
    completed: orders.filter((o) => o.status === "completed").length,
  };

  const totalOrdersCount = orders.length;

  return (
    <>
      {/* Header with Date Filters */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#03045E] mb-2">Sales Reports</h2>
          <p className="text-gray-600">Track your revenue, orders, and business insights</p>
        </div>

        {/* Date Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <CalendarIcon className="w-5 h-5 text-gray-500" />
          <button
            onClick={() => setDateFilter("today")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              dateFilter === "today"
                ? "bg-[#00BAD8] text-white shadow-sm"
                : "bg-white border border-border text-gray-700 hover:bg-gray-50"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setDateFilter("week")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              dateFilter === "week"
                ? "bg-[#00BAD8] text-white shadow-sm"
                : "bg-white border border-border text-gray-700 hover:bg-gray-50"
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setDateFilter("month")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              dateFilter === "month"
                ? "bg-[#00BAD8] text-white shadow-sm"
                : "bg-white border border-border text-gray-700 hover:bg-gray-50"
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setDateFilter("custom")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              dateFilter === "custom"
                ? "bg-[#00BAD8] text-white shadow-sm"
                : "bg-white border border-border text-gray-700 hover:bg-gray-50"
            }`}
          >
            Custom Range
          </button>
        </div>
      </div>

      {/* Summary Cards with Trend Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-[#CAF0F8] to-white rounded-2xl shadow-sm border border-[#00BAD8]/20 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-[#00BAD8] p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${isGrowthPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isGrowthPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {Math.abs(revenueGrowth).toFixed(1)}%
            </div>
          </div>
          <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
          <h3 className="text-3xl font-bold text-[#03045E]">₱{totalRevenue.toLocaleString()}</h3>
          <p className="text-xs text-gray-500 mt-2">vs last period</p>
        </div>

        {/* Revenue Growth */}
        <div className="bg-gradient-to-br from-[#CAF0F8] to-white rounded-2xl shadow-sm border border-[#00BAD8]/20 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-3 rounded-xl ${isGrowthPositive ? 'bg-green-100' : 'bg-red-100'}`}>
              {isGrowthPositive ? (
                <TrendingUp className="w-6 h-6 text-green-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-600" />
              )}
            </div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${isGrowthPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isGrowthPositive ? 'Increase' : 'Decrease'}
            </div>
          </div>
          <p className="text-sm font-medium text-gray-600 mb-1">Revenue Growth</p>
          <h3 className={`text-3xl font-bold ${isGrowthPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isGrowthPositive ? '+' : ''}{revenueGrowth.toFixed(1)}%
          </h3>
          <p className="text-xs text-gray-500 mt-2">compared to last period</p>
        </div>

        {/* Total Orders */}
        <div className="bg-gradient-to-br from-[#CAF0F8] to-white rounded-2xl shadow-sm border border-[#00BAD8]/20 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-[#0077B6] p-3 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${isOrderGrowthPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isOrderGrowthPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {Math.abs(orderGrowth).toFixed(1)}%
            </div>
          </div>
          <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
          <h3 className="text-3xl font-bold text-[#03045E]">{orders.length}</h3>
          <p className="text-xs text-gray-500 mt-2">orders received</p>
        </div>

        {/* Average Order Value */}
        <div className="bg-gradient-to-br from-[#CAF0F8] to-white rounded-2xl shadow-sm border border-[#00BAD8]/20 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-[#03045E] p-3 rounded-xl">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${isAvgOrderGrowthPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isAvgOrderGrowthPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {Math.abs(avgOrderGrowth).toFixed(1)}%
            </div>
          </div>
          <p className="text-sm font-medium text-gray-600 mb-1">Avg Order Value</p>
          <h3 className="text-3xl font-bold text-[#03045E]">₱{averageOrderValue.toFixed(0)}</h3>
          <p className="text-xs text-gray-500 mt-2">per order</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#03045E]">Revenue Over Time</h3>
            <p className="text-sm text-gray-500 mt-1">Track your revenue trends</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeFilter("daily")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                timeFilter === "daily"
                  ? "bg-[#00BAD8] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeFilter("weekly")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                timeFilter === "weekly"
                  ? "bg-[#00BAD8] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeFilter("monthly")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                timeFilter === "monthly"
                  ? "bg-[#00BAD8] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={revenueData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(0, 186, 216)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="rgb(0, 186, 216)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              style={{ fontSize: '12px', fontWeight: 500 }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px', fontWeight: 500 }}
              tickFormatter={(value) => `₱${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '2px solid #00BAD8',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              formatter={(value: number) => [`₱${value.toLocaleString()}`, 'Revenue']}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="rgb(0, 186, 216)"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              dot={{ fill: 'rgb(0, 186, 216)', r: 5, strokeWidth: 2, stroke: 'white' }}
              activeDot={{ r: 7, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Secondary Analytics - Split Layout */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* LEFT: Top Selling Paper Types */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
          <h3 className="text-xl font-bold text-[#03045E] mb-6">Top Selling Paper Types</h3>
          <div className="space-y-4">
            {topPaperTypes.map((paper, index) => {
              const maxCount = topPaperTypes[0].count;
              const percentage = (paper.count / maxCount) * 100;
              
              return (
                <div key={paper.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white ${
                        index === 0 ? 'bg-[#00BAD8]' :
                        index === 1 ? 'bg-[#0077B6]' :
                        index === 2 ? 'bg-[#03045E]' :
                        'bg-gray-400'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{paper.name}</p>
                        <p className="text-xs text-gray-500">{paper.count} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-[#03045E]">₱{paper.revenue}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        index === 0 ? 'bg-[#00BAD8]' :
                        index === 1 ? 'bg-[#0077B6]' :
                        index === 2 ? 'bg-[#03045E]' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Order Status Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
          <h3 className="text-xl font-bold text-[#03045E] mb-6">Order Status Distribution</h3>
          <div className="space-y-5">
            {[
              { status: 'processing', label: 'Processing', color: 'bg-blue-500', count: statusCounts.processing },
              { status: 'ready', label: 'Ready for Pickup', color: 'bg-purple-500', count: statusCounts.ready },
              { status: 'completed', label: 'Completed', color: 'bg-green-500', count: statusCounts.completed },
            ].map((item) => {
              const percentage = totalOrdersCount > 0 ? (item.count / totalOrdersCount) * 100 : 0;

              return (
                <div key={item.status} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium text-gray-900">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{item.count} orders</span>
                      <span className="text-sm font-bold text-[#03045E] min-w-[45px] text-right">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-gradient-to-br from-[#03045E] to-[#0077B6] rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-300" />
          <h3 className="text-xl font-bold text-white">Key Insights</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-white/90 text-sm">
              <span className="font-semibold text-yellow-300">Revenue increased by {Math.abs(revenueGrowth).toFixed(1)}%</span> this period compared to last period
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-white/90 text-sm">
              <span className="font-semibold text-yellow-300">A4 Glossy</span> is your most popular paper type with 45 orders
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-white/90 text-sm">
              <span className="font-semibold text-yellow-300">Peak sales</span> occurred on Mar 23 with ₱890 revenue
            </p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
        <h3 className="text-xl font-bold text-[#03045E] mb-6">Recent Transactions</h3>
        <div className="space-y-1">
          {orders.slice(0, 5).map((order) => (
            <div 
              key={order.id} 
              className="flex items-center justify-between py-4 px-4 rounded-lg hover:bg-gradient-to-r hover:from-[#CAF0F8]/30 hover:to-transparent transition-all"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00BAD8] to-[#0077B6] flex items-center justify-center text-white font-semibold">
                  {order.customerName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{order.customerName}</p>
                  <p className="text-xs text-gray-500">Order ID: {order.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-base font-bold text-[#03045E]">₱{order.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <div className="min-w-[100px]">
                  <StatusBadge status={order.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Transactions View
function TransactionsView({ orders }: { orders: Order[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "processing" | "ready" | "completed">("all");

  // All orders are prepaid, so we use all orders
  const allOrders = orders;
  
  // Apply filters
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.transactionRef?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalRevenue = allOrders.reduce((sum, order) => sum + order.amount, 0);
  const totalPaidOrders = allOrders.length; // All orders are paid
  const processingOrders = allOrders.filter(o => o.status === "processing").length;

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#03045E] mb-2">Transactions</h2>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <p className="text-sm font-medium text-blue-900">All orders are prepaid via GCash</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-[#E3F5FF] to-[#CAF0F8] p-4 rounded-2xl">
              <DollarSign className="w-7 h-7 text-[#0077B6]" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-[#03045E]">₱{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Total Paid Orders */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-2xl">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Total Paid Orders</p>
              <p className="text-3xl font-bold text-[#03045E]">{totalPaidOrders}</p>
            </div>
          </div>
        </div>

        {/* Orders in Processing */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-2xl">
              <Clock className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Orders in Processing</p>
              <p className="text-3xl font-bold text-[#03045E]">{processingOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer, order ID, or GCash reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BAD8] text-gray-700"
            />
          </div>

          {/* Filter by Status */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                filterStatus === "all"
                  ? "bg-gradient-to-r from-[#0077B6] to-[#00BAD8] text-white shadow-md"
                  : "bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] text-[#0077B6] hover:from-[#E0F2FE] hover:to-[#CAF0F8]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("processing")}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                filterStatus === "processing"
                  ? "bg-gradient-to-r from-[#0077B6] to-[#00BAD8] text-white shadow-md"
                  : "bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] text-[#0077B6] hover:from-[#E0F2FE] hover:to-[#CAF0F8]"
              }`}
            >
              Processing
            </button>
            <button
              onClick={() => setFilterStatus("ready")}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                filterStatus === "ready"
                  ? "bg-gradient-to-r from-[#0077B6] to-[#00BAD8] text-white shadow-md"
                  : "bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] text-[#0077B6] hover:from-[#E0F2FE] hover:to-[#CAF0F8]"
              }`}
            >
              Ready
            </button>
            <button
              onClick={() => setFilterStatus("completed")}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                filterStatus === "completed"
                  ? "bg-gradient-to-r from-[#0077B6] to-[#00BAD8] text-white shadow-md"
                  : "bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] text-[#0077B6] hover:from-[#E0F2FE] hover:to-[#CAF0F8]"
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#E3F5FF] to-[#CAF0F8]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#03045E] whitespace-nowrap">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#03045E] whitespace-nowrap">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#03045E] whitespace-nowrap">File Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#03045E] whitespace-nowrap">GCash Reference Number</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#03045E] whitespace-nowrap">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#03045E] whitespace-nowrap">Date Paid</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#03045E] whitespace-nowrap">Order Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gradient-to-r hover:from-[#F8FCFF] hover:to-[#F0F9FF] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-[#0077B6]">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="font-medium text-gray-900">{order.customerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700 block truncate max-w-[200px]" title={order.fileName}>
                        {order.fileName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-md flex-shrink-0">
                          <DollarSign className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-mono text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                          {order.transactionRef || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-[#03045E]">₱{order.amount.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{order.date}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PaymentStatusBadge status={order.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium mb-1">No orders found</p>
                        <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                      </div>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="text-sm text-[#0077B6] hover:underline font-medium"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      {filteredOrders.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-[#0077B6] to-[#00BAD8] rounded-2xl shadow-xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm opacity-90 mb-1">Total Orders</p>
              <p className="text-4xl font-bold">{filteredOrders.length}</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm opacity-90 mb-1">Total Amount</p>
              <p className="text-4xl font-bold">
                ₱{filteredOrders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm opacity-90 mb-1">Average Order</p>
              <p className="text-4xl font-bold">
                ₱{(filteredOrders.reduce((sum, order) => sum + order.amount, 0) / filteredOrders.length).toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Payment Status Badge Component for Online Payments
function PaymentStatusBadge({ status }: { status: OrderStatus }) {
  const styles = {
    pending: "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 border border-yellow-200",
    processing: "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200",
    ready: "bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 border border-purple-200",
    completed: "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200",
  };

  const labels = {
    pending: "Pending",
    processing: "Processing",
    ready: "Ready",
    completed: "Completed",
  };

  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

// Order Details Modal
function OrderDetailsModal({ 
  order, 
  onClose,
  onAcceptOrder,
  onUpdateStatus
}: { 
  order: Order; 
  onClose: () => void;
  onAcceptOrder: (id: string) => void;
  onUpdateStatus: (order: Order) => void;
}) {
  const handleAccept = () => {
    onAcceptOrder(order.id);
    onClose();
  };

  const handleStatusUpdate = () => {
    onUpdateStatus(order);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-xl text-primary">Order Details</h3>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Customer Note/Instruction */}
          {order.customerNote && (
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Customer Instructions</h4>
                  <p className="text-sm text-blue-800">{order.customerNote}</p>
                </div>
              </div>
            </div>
          )}

          {/* File Preview */}
          <div>
            <h4 className="text-sm text-muted-foreground mb-2">File Preview</h4>
            <div className="bg-muted rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm">{order.filePreview}</p>
                <p className="text-xs text-muted-foreground mt-1">{order.fileName}</p>
              </div>
            </div>
          </div>

          {/* Print Settings */}
          <div>
            <h4 className="text-sm text-muted-foreground mb-3">Print Settings</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Size</p>
                <p className="text-sm">{order.printOptions.size}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Color</p>
                <p className="text-sm">{order.printOptions.color}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Copies</p>
                <p className="text-sm">{order.printOptions.copies}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Services</p>
                <p className="text-sm">{order.printOptions.services.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div>
            <h4 className="text-sm text-muted-foreground mb-3">Order Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Order ID</span>
                <span className="text-sm">{order.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Customer</span>
                <span className="text-sm">{order.customerName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="text-sm">{order.date}</span>
              </div>
              {order.preferredPickupTime && (
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Preferred Pickup Time</span>
                  <span className="text-sm font-medium text-primary">{order.preferredPickupTime}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Status</span>
                <StatusBadge status={order.status} />
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Payment Status</span>
                <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  PAID
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm">Total Amount</span>
                <span className="text-lg text-primary">₱{order.amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-border bg-gray-50 sticky bottom-0 flex items-center justify-end gap-3">
          {order.status === "pending" && (
            <>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white border border-border text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Accept & Start Processing
              </button>
            </>
          )}
          
          {order.status === "processing" && (
            <>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white border border-border text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleStatusUpdate}
                className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
              >
                Mark as Ready for Pickup
              </button>
            </>
          )}
          
          {order.status === "ready" && (
            <>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white border border-border text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleStatusUpdate}
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
              >
                Mark as Completed
              </button>
            </>
          )}
          
          {order.status === "completed" && (
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: OrderStatus }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    ready: "bg-purple-100 text-purple-700",
    completed: "bg-green-100 text-green-700",
  };

  const icons = {
    pending: Clock,
    processing: TrendingUp,
    ready: Package,
    completed: CheckCircle2,
  };

  const Icon = icons[status];

  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${styles[status]}`}>
      <Icon className="w-3 h-3" />
      <span className="capitalize">{status}</span>
    </span>
  );
}