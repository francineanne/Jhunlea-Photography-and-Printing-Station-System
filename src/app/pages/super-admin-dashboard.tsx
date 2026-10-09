import { Link } from "react-router";
import {
  LayoutDashboard,
  Store,
  Users,
  FileText,
  Settings,
  LogOut,
  TrendingUp,
  ShoppingBag,
  CheckCircle,
  Clock,
  Search,
  Bell,
  Menu,
  Shield,
  Activity,
  Eye,
  X,
  Download,
  DollarSign,
  Package,
  UserCheck,
  AlertCircle,
  Calendar,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Lightbulb,
  UserPlus,
  Plus,
  BarChart3,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import logo from "figma:asset/992e51a9268ff5106d57083d372c6962b2244f1b.png";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from "recharts";
import { useAuth } from "../contexts/auth-context";

type AdminStatus = "pending" | "approved" | "disabled" | "rejected";

interface Admin {
  id: string;
  shopName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  status: AdminStatus;
  dateRegistered: string;
  proofDocument: string;
}

type UserStatus = "pending" | "active" | "rejected" | "inactive";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  joinDate: string;
  status: UserStatus;
  orders: number;
  validIdDocument: string;
  lastActivity: string;
  dateRejected?: string;
  rejectionReason?: string;
}

export function SuperAdminDashboard() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [adminFilter, setAdminFilter] = useState<"all" | AdminStatus>("all");
  const [userFilter, setUserFilter] = useState<"all" | UserStatus>("all");
  const [revenueFilter, setRevenueFilter] = useState<"monthly" | "weekly">("monthly");
  const [dateRangeFilter, setDateRangeFilter] = useState("last-30-days");
  const [confirmAction, setConfirmAction] = useState<{ type: 'approve' | 'reject', userId: string } | null>(null);

  // Mock data
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: "1",
      shopName: "ABC Print Shop",
      ownerName: "Juan Dela Cruz",
      email: "juan@abcprint.com",
      phone: "+63 912 345 6789",
      address: "123 Main St, Calbayog City",
      status: "pending",
      dateRegistered: "2026-03-18",
      proofDocument: "business-permit.pdf",
    },
    {
      id: "2",
      shopName: "Quick Print Center",
      ownerName: "Maria Santos",
      email: "maria@quickprint.com",
      phone: "+63 912 345 6790",
      address: "456 Oak Ave, Calbayog City",
      status: "approved",
      dateRegistered: "2026-03-15",
      proofDocument: "dti-registration.pdf",
    },
    {
      id: "3",
      shopName: "Print Express",
      ownerName: "Jose Reyes",
      email: "jose@printexpress.com",
      phone: "+63 912 345 6791",
      address: "789 Pine Rd, Calbayog City",
      status: "approved",
      dateRegistered: "2026-03-10",
      proofDocument: "business-card.jpg",
    },
    {
      id: "4",
      shopName: "FastPrint Solutions",
      ownerName: "Ana Garcia",
      email: "ana@fastprint.com",
      phone: "+63 912 345 6792",
      address: "321 Elm St, Calbayog City",
      status: "pending",
      dateRegistered: "2026-03-20",
      proofDocument: "business-permit.pdf",
    },
    {
      id: "5",
      shopName: "Budget Printing",
      ownerName: "Carlos Mendoza",
      email: "carlos@budgetprint.com",
      phone: "+63 912 345 6793",
      address: "555 Maple Dr, Calbayog City",
      status: "rejected",
      dateRegistered: "2026-03-17",
      proofDocument: "invalid-document.jpg",
    },
    {
      id: "6",
      shopName: "CopyMaster",
      ownerName: "Linda Fernandez",
      email: "linda@copymaster.com",
      phone: "+63 912 345 6794",
      address: "888 Cedar Ln, Calbayog City",
      status: "disabled",
      dateRegistered: "2026-02-28",
      proofDocument: "business-permit.pdf",
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Pedro Lopez", email: "pedro@email.com", phone: "+63 912 345 6785", businessName: "Pedro's Enterprises", joinDate: "2026-01-15", status: "active", orders: 12, validIdDocument: "id-card.jpg", lastActivity: "2026-03-21 08:30:00" },
    { id: "2", name: "Rosa Cruz", email: "rosa@email.com", phone: "+63 912 345 6786", joinDate: "2026-02-01", status: "active", orders: 8, validIdDocument: "passport.jpg", lastActivity: "2026-03-21 06:15:00" },
    { id: "3", name: "Carlos Ramos", email: "carlos@email.com", phone: "+63 912 345 6787", businessName: "Ramos Trading", joinDate: "2026-02-10", status: "inactive", orders: 3, validIdDocument: "driver-license.jpg", lastActivity: "2026-03-10 14:20:00" },
    { id: "4", name: "Lisa Torres", email: "lisa@email.com", phone: "+63 912 345 6788", businessName: "Torres Co.", joinDate: "2026-03-05", status: "active", orders: 15, validIdDocument: "id-card.jpg", lastActivity: "2026-03-20 18:45:00" },
    { id: "5", name: "Miguel Santos", email: "miguel@email.com", phone: "+63 912 345 6789", businessName: "Santos Retail", joinDate: "2026-03-20", status: "pending", orders: 0, validIdDocument: "passport.jpg", lastActivity: "2026-03-20 10:00:00" },
    { id: "6", name: "Elena Reyes", email: "elena@email.com", phone: "+63 912 345 6790", joinDate: "2026-03-21", status: "pending", orders: 0, validIdDocument: "driver-license.jpg", lastActivity: "2026-03-21 09:30:00" },
    { id: "7", name: "Ricardo Gomez", email: "ricardo@email.com", phone: "+63 912 345 6791", businessName: "Gomez Supplies", joinDate: "2026-03-19", status: "rejected", orders: 0, validIdDocument: "id-card-blurry.jpg", lastActivity: "2026-03-19 16:20:00", dateRejected: "2026-03-20", rejectionReason: "Invalid ID document - image too blurry" },
    { id: "8", name: "Sofia Martinez", email: "sofia@email.com", phone: "+63 912 345 6792", joinDate: "2026-02-20", status: "active", orders: 7, validIdDocument: "passport.jpg", lastActivity: "2026-03-18 11:30:00" },
    { id: "9", name: "Antonio Reyes", email: "antonio@email.com", phone: "+63 912 345 6793", businessName: "Reyes Market", joinDate: "2026-01-10", status: "inactive", orders: 1, validIdDocument: "id-card.jpg", lastActivity: "2026-02-28 09:15:00" },
    { id: "10", name: "Diana Santos", email: "diana@email.com", phone: "+63 912 345 6794", businessName: "Diana's Store", joinDate: "2026-03-15", status: "rejected", orders: 0, validIdDocument: "fake-id.jpg", lastActivity: "2026-03-15 14:00:00", dateRejected: "2026-03-16", rejectionReason: "Suspected fake document" },
  ]);

  const handleApprove = (id: string) => {
    setAdmins(admins.map(admin =>
      admin.id === id ? { ...admin, status: "approved" as AdminStatus } : admin
    ));
    setSelectedAdmin(null);
  };

  const handleReject = (id: string) => {
    setAdmins(admins.map(admin =>
      admin.id === id ? { ...admin, status: "rejected" as AdminStatus } : admin
    ));
    setSelectedAdmin(null);
  };

  const handleDisable = (id: string) => {
    setAdmins(admins.map(admin =>
      admin.id === id ? { ...admin, status: "disabled" as AdminStatus } : admin
    ));
  };

  const handleApproveUser = (id: string) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: "active" as UserStatus } : user
    ));
    setSelectedUser(null);
    setConfirmAction(null);
  };

  const handleRejectUser = (id: string) => {
    const now = new Date("2026-03-22");
    const dateRejected = now.toISOString().split('T')[0];
    setUsers(users.map(user =>
      user.id === id ? { 
        ...user, 
        status: "rejected" as UserStatus,
        dateRejected: dateRejected,
        rejectionReason: "Invalid or unverifiable ID document"
      } : user
    ));
    setSelectedUser(null);
    setConfirmAction(null);
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers(users.map(user =>{
      if (user.id === id) {
        if (user.status === "active") {
          return { ...user, status: "inactive" as UserStatus };
        } else if (user.status === "inactive") {
          return { ...user, status: "active" as UserStatus };
        } else if (user.status === "approved") {
          return { ...user, status: "inactive" as UserStatus };
        }
      }
      return user;
    }));
  };

  const getUserStatusColor = (status: UserStatus) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "active": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      case "inactive": return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: AdminStatus) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "approved": return "bg-green-100 text-green-700";
      case "disabled": return "bg-red-100 text-red-700";
      case "rejected": return "bg-red-100 text-red-700";
    }
  };

  // Helper function to calculate time since last activity
  const getTimeSinceActivity = (lastActivity: string): string => {
    const now = new Date("2026-03-21 10:00:00"); // Current mock time
    const lastDate = new Date(lastActivity);
    const diffMs = now.getTime() - lastDate.getTime();
    
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'min' : 'mins'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-border">
            <img src={logo} alt="E-Printing System" className="h-10 w-auto" />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === "dashboard" ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveSection("admins")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === "admins" ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
              }`}
            >
              <Store className="w-5 h-5" />
              <span>Manage Print Shop</span>
            </button>
            <button
              onClick={() => setActiveSection("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === "users" ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>User Management</span>
            </button>
            <button
              onClick={() => setActiveSection("reports")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === "reports" ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Reports</span>
            </button>
            <button
              onClick={() => setActiveSection("logs")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === "logs" ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
              }`}
            >
              <Activity className="w-5 h-5" />
              <span>Activity Logs</span>
            </button>
            <button
              onClick={() => setActiveSection("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === "settings" ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-foreground"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl text-primary">Super Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-64"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <Bell className="w-6 h-6 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-foreground">Super Admin</p>
                <p className="text-xs text-muted-foreground">admin@eprinting.com</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white">
                SA
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <>
              {/* Header with Quick Actions */}
              <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-[#03045E] mb-2">System Overview</h2>
                  <p className="text-gray-600">Monitor platform activity and manage users</p>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-3 flex-wrap">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-[#00BAD8] text-[#03045E] rounded-lg hover:bg-[#CAF0F8]/30 transition-all shadow-sm font-medium">
                    <Plus className="w-4 h-4" />
                    <span>Add Shop</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-[#00BAD8] text-[#03045E] rounded-lg hover:bg-[#CAF0F8]/30 transition-all shadow-sm font-medium">
                    <UserPlus className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-[#00BAD8] text-white rounded-lg hover:bg-[#0077B6] transition-all shadow-sm font-medium">
                    <BarChart3 className="w-4 h-4" />
                    <span>View Reports</span>
                  </button>
                </div>
              </div>

              {/* Stats Grid with Sparklines */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Total Print Shops */}
                <div className="bg-gradient-to-br from-[#CAF0F8] to-white rounded-2xl shadow-sm border border-[#00BAD8]/20 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-[#00BAD8] p-3 rounded-xl">
                      <Store className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                      <ArrowUp className="w-4 h-4" />
                      12%
                    </div>
                  </div>
                  <h3 className="text-4xl font-bold text-[#03045E] mb-1">{admins.length}</h3>
                  <p className="text-sm font-medium text-gray-600 mb-3">Total Print Shops</p>
                  
                  {/* Mini Sparkline */}
                  <div className="flex items-end gap-1 h-8">
                    {[4, 6, 5, 8, 7, 9, 11, 10, 12, 15].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-[#00BAD8] rounded-t"
                        style={{ height: `${(height / 15) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Total Customers */}
                <div className="bg-gradient-to-br from-[#CAF0F8] to-white rounded-2xl shadow-sm border border-[#00BAD8]/20 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-[#0077B6] p-3 rounded-xl">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                      <ArrowUp className="w-4 h-4" />
                      8%
                    </div>
                  </div>
                  <h3 className="text-4xl font-bold text-[#03045E] mb-1">{users.length}</h3>
                  <p className="text-sm font-medium text-gray-600 mb-3">Total Customers</p>
                  
                  {/* Mini Sparkline */}
                  <div className="flex items-end gap-1 h-8">
                    {[8, 10, 9, 12, 14, 13, 16, 18, 17, 20].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-[#0077B6] rounded-t"
                        style={{ height: `${(height / 20) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Active Users */}
                <div className="bg-gradient-to-br from-[#CAF0F8] to-white rounded-2xl shadow-sm border border-[#00BAD8]/20 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-green-600 p-3 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                      <ArrowUp className="w-4 h-4" />
                      5%
                    </div>
                  </div>
                  <h3 className="text-4xl font-bold text-[#03045E] mb-1">{users.filter(u => u.status === "active").length}</h3>
                  <p className="text-sm font-medium text-gray-600 mb-3">Active Users</p>
                  
                  {/* Mini Sparkline */}
                  <div className="flex items-end gap-1 h-8">
                    {[12, 14, 13, 15, 16, 15, 17, 19, 18, 20].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-green-500 rounded-t"
                        style={{ height: `${(height / 20) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Pending Approvals */}
                <div className="bg-gradient-to-br from-[#CAF0F8] to-white rounded-2xl shadow-sm border border-[#00BAD8]/20 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-yellow-500 p-3 rounded-xl">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-yellow-600">
                      <AlertCircle className="w-4 h-4" />
                      Needs Action
                    </div>
                  </div>
                  <h3 className="text-4xl font-bold text-[#03045E] mb-1">{admins.filter(a => a.status === "pending").length + users.filter(u => u.status === "pending").length}</h3>
                  <p className="text-sm font-medium text-gray-600 mb-3">Pending Approvals</p>
                  
                  {/* Mini Sparkline */}
                  <div className="flex items-end gap-1 h-8">
                    {[3, 5, 4, 6, 5, 4, 3, 5, 6, 4].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-yellow-500 rounded-t"
                        style={{ height: `${(height / 6) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Analytics Section */}
              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* User Growth Chart */}
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#03045E]">User Growth</h3>
                      <p className="text-sm text-gray-500 mt-1">Track user registration trends</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-xs font-medium bg-[#00BAD8] text-white rounded-lg">
                        Daily
                      </button>
                      <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        Weekly
                      </button>
                      <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        Monthly
                      </button>
                    </div>
                  </div>
                  
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={[
                      { date: "Mon", users: 42 },
                      { date: "Tue", users: 58 },
                      { date: "Wed", users: 65 },
                      { date: "Thu", users: 72 },
                      { date: "Fri", users: 85 },
                      { date: "Sat", users: 91 },
                      { date: "Sun", users: 98 },
                    ]}>
                      <defs>
                        <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
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
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '2px solid #00BAD8',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="rgb(0, 186, 216)"
                        strokeWidth={3}
                        fill="url(#userGradient)"
                        dot={{ fill: 'rgb(0, 186, 216)', r: 5, strokeWidth: 2, stroke: 'white' }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Shop Registrations Bar Chart */}
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#03045E]">Shop Registrations</h3>
                      <p className="text-sm text-gray-500 mt-1">New shops per week</p>
                    </div>
                  </div>
                  
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={[
                      { week: "W1", shops: 3 },
                      { week: "W2", shops: 5 },
                      { week: "W3", shops: 4 },
                      { week: "W4", shops: 6 },
                      { week: "W5", shops: 5 },
                      { week: "W6", shops: 7 },
                      { week: "W7", shops: 6 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="week" 
                        stroke="#6b7280"
                        style={{ fontSize: '12px', fontWeight: 500 }}
                      />
                      <YAxis 
                        stroke="#6b7280"
                        style={{ fontSize: '12px', fontWeight: 500 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '2px solid #00BAD8',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                        }}
                      />
                      <Bar
                        dataKey="shops"
                        fill="rgb(0, 119, 182)"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Admin Control Panel - Pending Approvals */}
              <div className="bg-white rounded-2xl shadow-sm border border-border p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#03045E]">Pending Approvals</h3>
                      <p className="text-sm text-gray-500">Review and approve new registrations</p>
                    </div>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {admins.filter(a => a.status === "pending").length} Pending
                  </span>
                </div>

                <div className="space-y-3">
                  {admins.filter(a => a.status === "pending").slice(0, 3).map((admin) => (
                    <div key={admin.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-[#CAF0F8]/30 to-transparent rounded-xl border border-[#00BAD8]/20 hover:border-[#00BAD8]/40 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00BAD8] to-[#0077B6] flex items-center justify-center text-white font-bold text-lg">
                          {admin.shopName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-gray-900">{admin.shopName}</h4>
                          <p className="text-sm text-gray-600">{admin.ownerName}</p>
                          <p className="text-xs text-gray-500 mt-1">Registered: {admin.dateRegistered}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-sm font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          Approve
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-sm font-medium">
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {admins.filter(a => a.status === "pending").length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No pending approvals</p>
                  </div>
                )}
              </div>

              {/* Insights Section */}
              <div className="bg-gradient-to-br from-[#03045E] to-[#0077B6] rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-xl font-bold text-white">Key Insights</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span className="text-yellow-300 font-semibold text-sm">New Shops</span>
                    </div>
                    <p className="text-white/90 text-sm">
                      <span className="font-semibold text-white">2 new shops</span> registered today
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-300" />
                      <span className="text-green-300 font-semibold text-sm">Growth Rate</span>
                    </div>
                    <p className="text-white/90 text-sm">
                      User growth increased by <span className="font-semibold text-white">10%</span> this week
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-5 h-5 text-blue-300" />
                      <span className="text-blue-300 font-semibold text-sm">Peak Activity</span>
                    </div>
                    <p className="text-white/90 text-sm">
                      Highest activity at <span className="font-semibold text-white">3 PM</span> daily
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                <h3 className="text-xl font-bold text-[#03045E] mb-6">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: "New shop registration", detail: "ABC Print Shop", time: "5 minutes ago", icon: Store, type: "new", color: "blue" },
                    { action: "Pending approval", detail: "FastPrint Solutions", time: "15 minutes ago", icon: Clock, type: "pending", color: "yellow" },
                    { action: "Shop approved", detail: "Quick Print Center", time: "1 hour ago", icon: CheckCircle, type: "approved", color: "green" },
                    { action: "New user registered", detail: "Pedro Lopez", time: "2 hours ago", icon: Users, type: "new", color: "blue" },
                    { action: "Order completed", detail: "Order #1234", time: "3 hours ago", icon: Package, type: "approved", color: "green" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-[#CAF0F8]/30 hover:to-transparent transition-all">
                      <div className={`p-3 rounded-xl ${
                        activity.color === "blue" ? "bg-blue-100" :
                        activity.color === "yellow" ? "bg-yellow-100" :
                        "bg-green-100"
                      }`}>
                        <activity.icon className={`w-5 h-5 ${
                          activity.color === "blue" ? "text-blue-600" :
                          activity.color === "yellow" ? "text-yellow-600" :
                          "text-green-600"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.detail}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{activity.time}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          activity.color === "blue" ? "bg-blue-500" :
                          activity.color === "yellow" ? "bg-yellow-500" :
                          "bg-green-500"
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Manage Print Shop Section */}
          {activeSection === "admins" && (
            <div className="bg-white rounded-xl shadow-sm border border-border">
              <div className="p-6 border-b border-border">
                <h3 className="text-xl text-primary mb-4">Manage Print Shops</h3>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setAdminFilter("all")}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      adminFilter === "all"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Total Shops ({admins.length})
                  </button>
                  <button
                    onClick={() => setAdminFilter("approved")}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      adminFilter === "approved"
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Approved ({admins.filter(a => a.status === "approved").length})
                  </button>
                  <button
                    onClick={() => setAdminFilter("pending")}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      adminFilter === "pending"
                        ? "bg-yellow-600 text-white shadow-md"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Pending ({admins.filter(a => a.status === "pending").length})
                  </button>
                  <button
                    onClick={() => setAdminFilter("rejected")}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      adminFilter === "rejected"
                        ? "bg-red-600 text-white shadow-md"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Rejected ({admins.filter(a => a.status === "rejected").length})
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Shop Name</th>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Owner Name</th>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Status</th>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Date Registered</th>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {admins
                      .filter(admin => adminFilter === "all" || admin.status === adminFilter)
                      .map((admin) => (
                        <tr key={admin.id} className="hover:bg-muted/50">
                          <td className="px-6 py-4 text-sm">{admin.shopName}</td>
                          <td className="px-6 py-4 text-sm">{admin.ownerName}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-block text-xs px-3 py-1 rounded-full ${getStatusColor(admin.status)}`}>
                              {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">{admin.dateRegistered}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedAdmin(admin)}
                                className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              {admin.status === "pending" && (
                                <button
                                  onClick={() => handleApprove(admin.id)}
                                  className="text-green-600 hover:bg-green-50 px-3 py-1 rounded-lg text-xs transition-colors"
                                >
                                  Approve
                                </button>
                              )}
                              {admin.status === "approved" && (
                                <button
                                  onClick={() => handleDisable(admin.id)}
                                  className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg text-xs transition-colors"
                                >
                                  Disable
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* User Management Section */}
          {activeSection === "users" && (
            <div className="bg-white rounded-xl shadow-sm border border-border">
              <div className="p-6 border-b border-border">
                <h3 className="text-xl text-primary mb-4">User Management</h3>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setUserFilter("all")}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      userFilter === "all"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    All Users ({users.length})
                  </button>
                  <button
                    onClick={() => setUserFilter("pending")}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      userFilter === "pending"
                        ? "bg-yellow-600 text-white shadow-md"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Pending ({users.filter(u => u.status === "pending").length})
                  </button>
                  <button
                    onClick={() => setUserFilter("active")}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      userFilter === "active"
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Approved / Active ({users.filter(u => u.status === "active").length})
                  </button>
                  <button
                    onClick={() => setUserFilter("rejected")}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      userFilter === "rejected"
                        ? "bg-red-600 text-white shadow-md"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Rejected ({users.filter(u => u.status === "rejected").length})
                  </button>
                  <button
                    onClick={() => setUserFilter("inactive")}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      userFilter === "inactive"
                        ? "bg-gray-600 text-white shadow-md"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Inactive ({users.filter(u => u.status === "inactive").length})
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Name</th>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Email</th>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Status</th>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Last Activity</th>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Orders</th>
                      <th className="text-left px-6 py-3 text-sm text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users
                      .filter(user => userFilter === "all" || user.status === userFilter)
                      .map((user) => (
                        <tr key={user.id} className="hover:bg-muted/50">
                          <td className="px-6 py-4 text-sm">{user.name}</td>
                          <td className="px-6 py-4 text-sm">{user.email}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-block text-xs px-3 py-1 rounded-full ${getUserStatusColor(user.status)}`}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{getTimeSinceActivity(user.lastActivity)}</td>
                          <td className="px-6 py-4 text-sm">{user.orders}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedUser(user)}
                                className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              {user.status === "pending" && (
                                <>
                                  <button
                                    onClick={() => handleApproveUser(user.id)}
                                    className="text-green-600 hover:bg-green-50 px-3 py-1 rounded-lg text-xs transition-colors"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleRejectUser(user.id)}
                                    className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg text-xs transition-colors"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              {(user.status === "active" || user.status === "approved") && (
                                <button
                                  onClick={() => handleToggleUserStatus(user.id)}
                                  className="text-gray-600 hover:bg-gray-50 px-3 py-1 rounded-lg text-xs transition-colors"
                                >
                                  Mark as Inactive
                                </button>
                              )}
                              {user.status === "inactive" && (
                                <button
                                  onClick={() => handleToggleUserStatus(user.id)}
                                  className="text-green-600 hover:bg-green-50 px-3 py-1 rounded-lg text-xs transition-colors"
                                >
                                  Activate
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reports Section */}
          {activeSection === "reports" && (
            <div className="space-y-6">
              {/* Header with Date Filter */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-primary">Business Reports</h2>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <select
                    value={dateRangeFilter}
                    onChange={(e) => setDateRangeFilter(e.target.value)}
                    className="px-4 py-2 bg-input-background border border-border rounded-lg text-sm"
                  >
                    <option value="last-7-days">Last 7 Days</option>
                    <option value="last-30-days">Last 30 Days</option>
                    <option value="last-90-days">Last 90 Days</option>
                    <option value="this-year">This Year</option>
                  </select>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Monthly Revenue</p>
                  <p className="text-3xl text-primary mb-2">₱127,450</p>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">+12.5%</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-secondary/10 rounded-lg">
                      <Package className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                  <p className="text-3xl text-primary mb-2">1,230</p>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">+8.2%</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                  <p className="text-3xl text-primary mb-2">3,847</p>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">+15.3%</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-secondary/10 rounded-lg">
                      <Store className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Total Shops</p>
                  <p className="text-3xl text-primary mb-2">47</p>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">+3</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-orange-500/10 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Approvals</p>
                  <p className="text-3xl text-primary mb-2">12</p>
                  <p className="text-xs text-muted-foreground">8 shops, 4 users</p>
                </div>
              </div>

              {/* Revenue and Orders Row */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl text-primary">Revenue Trend</h3>
                    <select
                      value={revenueFilter}
                      onChange={(e) => setRevenueFilter(e.target.value as "monthly" | "weekly")}
                      className="px-3 py-1.5 bg-input-background border border-border rounded-lg text-sm"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={
                        revenueFilter === "monthly"
                          ? [
                              { name: "Jan", revenue: 45000 },
                              { name: "Feb", revenue: 52000 },
                              { name: "Mar", revenue: 48000 },
                              { name: "Apr", revenue: 61000 },
                              { name: "May", revenue: 55000 },
                              { name: "Jun", revenue: 67000 },
                              { name: "Jul", revenue: 72000 },
                              { name: "Aug", revenue: 68000 },
                              { name: "Sep", revenue: 78000 },
                              { name: "Oct", revenue: 75000 },
                              { name: "Nov", revenue: 85000 },
                              { name: "Dec", revenue: 92000 },
                            ]
                          : [
                              { name: "Week 1", revenue: 28000 },
                              { name: "Week 2", revenue: 32000 },
                              { name: "Week 3", revenue: 30000 },
                              { name: "Week 4", revenue: 37000 },
                            ]
                      }
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgb(144, 224, 239)" />
                      <XAxis dataKey="name" stroke="rgb(0, 119, 182)" />
                      <YAxis stroke="rgb(0, 119, 182)" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "rgb(255, 255, 255)", border: "1px solid rgb(144, 224, 239)", borderRadius: "8px" }}
                        formatter={(value) => [`₱${value.toLocaleString()}`, "Revenue"]}
                      />
                      <Line type="monotone" dataKey="revenue" stroke="rgb(34, 197, 94)" strokeWidth={3} dot={{ fill: "rgb(34, 197, 94)", r: 5 }} activeDot={{ r: 7 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Orders Overview Pie Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                  <h3 className="text-xl text-primary mb-6">Orders Overview</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Completed", value: 856, color: "rgb(34, 197, 94)" },
                          { name: "Pending", value: 234, color: "rgb(234, 179, 8)" },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: "Completed", value: 856, color: "rgb(34, 197, 94)" },
                          { name: "Pending", value: 234, color: "rgb(234, 179, 8)" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "rgb(255, 255, 255)", border: "1px solid rgb(144, 224, 239)", borderRadius: "8px" }}
                        formatter={(value) => [`${value} orders`, ""]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: "rgb(34, 197, 94)" }}></div>
                      <p className="text-xs text-muted-foreground">Completed</p>
                      <p className="text-sm text-primary">856</p>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: "rgb(234, 179, 8)" }}></div>
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="text-sm text-primary">234</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Performing Shops and User Growth */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Top Performing Shops */}
                <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                  <h3 className="text-xl text-primary mb-6">Top 5 Performing Shops</h3>
                  <div className="space-y-4">
                    {[
                      { shop: "ABC Print Shop", orders: 342, revenue: 45200 },
                      { shop: "Quick Print", orders: 298, revenue: 38900 },
                      { shop: "Print Express", orders: 276, revenue: 35100 },
                      { shop: "FastPrint Solutions", orders: 204, revenue: 28400 },
                      { shop: "Digital Print Hub", orders: 189, revenue: 25800 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-muted rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-primary mb-1 truncate">{item.shop}</p>
                          <p className="text-xs text-muted-foreground">{item.orders} orders</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-primary">₱{item.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User Growth Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl text-primary mb-6">User Growth</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { month: "Jan", customers: 245, shopOwners: 8, total: 253 },
                        { month: "Feb", customers: 298, shopOwners: 6, total: 304 },
                        { month: "Mar", customers: 321, shopOwners: 9, total: 330 },
                        { month: "Apr", customers: 387, shopOwners: 7, total: 394 },
                        { month: "May", customers: 412, shopOwners: 5, total: 417 },
                        { month: "Jun", customers: 456, shopOwners: 12, total: 468 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      barCategoryGap="25%"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        stroke="#6B7280"
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        axisLine={{ stroke: '#E5E7EB' }}
                      />
                      <YAxis 
                        stroke="#6B7280"
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        axisLine={{ stroke: '#E5E7EB' }}
                        label={{ 
                          value: 'Total Users', 
                          angle: -90, 
                          position: 'insideLeft', 
                          style: { fill: '#6B7280', fontWeight: 600, fontSize: 12 } 
                        }} 
                      />
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.98)", 
                          border: "1px solid #E5E7EB", 
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          padding: "12px"
                        }}
                        labelStyle={{ fontWeight: 600, color: '#03045E', marginBottom: 8, fontSize: 14 }}
                        itemStyle={{ fontSize: 13, padding: "4px 0" }}
                        formatter={(value, name, props) => {
                          if (name === "Customers") return [`${value} users`, name];
                          if (name === "Shop Owners") return [`${value} shops`, name];
                          return [value, name];
                        }}
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const customers = payload.find(p => p.dataKey === 'customers')?.value || 0;
                            const shopOwners = payload.find(p => p.dataKey === 'shopOwners')?.value || 0;
                            const total = Number(customers) + Number(shopOwners);
                            return (
                              <div style={{ 
                                backgroundColor: "rgba(255, 255, 255, 0.98)", 
                                border: "1px solid #E5E7EB", 
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                padding: "12px"
                              }}>
                                <p style={{ fontWeight: 600, color: '#03045E', marginBottom: 8, fontSize: 14 }}>{label}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                  <div style={{ width: '12px', height: '12px', backgroundColor: '#22C55E', borderRadius: '2px' }}></div>
                                  <span style={{ fontSize: 13, color: '#374151' }}>Customers: <strong>{customers}</strong></span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                  <div style={{ width: '12px', height: '12px', backgroundColor: '#EAB308', borderRadius: '2px' }}></div>
                                  <span style={{ fontSize: 13, color: '#374151' }}>Shop Owners: <strong>{shopOwners}</strong></span>
                                </div>
                                <div style={{ borderTop: '1px solid #E5E7EB', marginTop: '8px', paddingTop: '8px' }}>
                                  <span style={{ fontSize: 13, color: '#6B7280' }}>Total: <strong style={{ color: '#03045E' }}>{total}</strong></span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend 
                        wrapperStyle={{ 
                          paddingTop: '20px',
                          fontSize: '13px'
                        }}
                        iconType="square"
                        iconSize={12}
                      />
                      <Bar 
                        dataKey="customers" 
                        stackId="a"
                        fill="#22C55E" 
                        name="Customers"
                        maxBarSize={80}
                      />
                      <Bar 
                        dataKey="shopOwners" 
                        stackId="a"
                        fill="#EAB308" 
                        name="Shop Owners"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={80}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Shop Approval Status */}
              <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                <h3 className="text-xl text-primary mb-6">Shop Approval Status</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-green-500 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl text-green-700">32</span>
                    </div>
                    <p className="text-green-800 mb-1">Approved / Active</p>
                    <p className="text-sm text-green-600">68% of total shops</p>
                  </div>

                  <div className="p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-yellow-500 rounded-lg">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl text-yellow-700">8</span>
                    </div>
                    <p className="text-yellow-800 mb-1">Pending</p>
                    <p className="text-sm text-yellow-600">17% awaiting approval</p>
                  </div>

                  <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-red-500 rounded-lg">
                        <X className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl text-red-700">7</span>
                    </div>
                    <p className="text-red-800 mb-1">Rejected</p>
                    <p className="text-sm text-red-600">15% of applications</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activity Logs Section */}
          {activeSection === "logs" && (
            <div className="bg-white rounded-xl shadow-sm border border-border">
              <div className="p-6 border-b border-border">
                <h3 className="text-xl text-primary">System Activity Logs</h3>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { time: "2026-03-21 10:30:45", user: "Super Admin", action: "Approved print shop registration", details: "ABC Print Shop" },
                  { time: "2026-03-21 10:15:22", user: "Super Admin", action: "Blocked user account", details: "carlos@email.com" },
                  { time: "2026-03-21 09:45:10", user: "System", action: "Database backup completed", details: "Backup ID: BK-20260321" },
                  { time: "2026-03-21 09:30:05", user: "Super Admin", action: "Updated platform settings", details: "Modified commission rate" },
                  { time: "2026-03-21 08:20:33", user: "System", action: "New shop registration", details: "FastPrint Solutions" },
                  { time: "2026-03-20 18:45:12", user: "Super Admin", action: "Disabled print shop", details: "Old Print Shop" },
                  { time: "2026-03-20 16:30:00", user: "System", action: "Payment processed", details: "Order #1234" },
                  { time: "2026-03-20 14:15:45", user: "Super Admin", action: "Approved print shop", details: "Quick Print Center" },
                ].map((log, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-1">{log.action}</p>
                      <p className="text-xs text-muted-foreground">{log.details}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{log.user}</p>
                      <p className="text-xs text-muted-foreground">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl text-primary">Platform Settings</h2>
              
              {/* Roles and Permissions */}
              <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                <h3 className="text-xl text-primary mb-4">Roles and Permissions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <h4 className="mb-1">Super Admin</h4>
                      <p className="text-sm text-muted-foreground">Full system access and control</p>
                    </div>
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <h4 className="mb-1">Print Shop Admin</h4>
                      <p className="text-sm text-muted-foreground">Manage own shop and orders</p>
                    </div>
                    <Store className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <h4 className="mb-1">Customer</h4>
                      <p className="text-sm text-muted-foreground">Place orders and track status</p>
                    </div>
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </div>

              {/* Platform Settings */}
              <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                <h3 className="text-xl text-primary mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="mb-1">Commission Rate</h4>
                      <p className="text-sm text-muted-foreground">Platform fee per transaction</p>
                    </div>
                    <input
                      type="text"
                      defaultValue="5%"
                      className="w-24 px-3 py-2 bg-input-background border border-border rounded-lg text-right"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="mb-1">Auto-Approval</h4>
                      <p className="text-sm text-muted-foreground">Automatically approve new shops</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-full h-full bg-gray-300 peer-checked:bg-primary rounded-full peer transition-colors cursor-pointer"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="mb-1">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Send email updates to users</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-full h-full bg-gray-300 peer-checked:bg-primary rounded-full peer transition-colors cursor-pointer"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Admin Details Modal */}
      {selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-xl text-primary">Print Shop Details</h3>
              <button
                onClick={() => setSelectedAdmin(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Shop Name</label>
                  <p className="text-foreground">{selectedAdmin.shopName}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Owner Name</label>
                  <p className="text-foreground">{selectedAdmin.ownerName}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="text-foreground">{selectedAdmin.email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <p className="text-foreground">{selectedAdmin.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-muted-foreground">Address</label>
                  <p className="text-foreground">{selectedAdmin.address}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Date Registered</label>
                  <p className="text-foreground">{selectedAdmin.dateRegistered}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Status</label>
                  <span className={`inline-block text-xs px-3 py-1 rounded-full ${getStatusColor(selectedAdmin.status)}`}>
                    {selectedAdmin.status.charAt(0).toUpperCase() + selectedAdmin.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <label className="text-sm text-muted-foreground mb-2 block">Proof of Legitimacy</label>
                <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center">
                  <FileText className="w-16 h-16 text-primary mb-3" />
                  <p className="text-sm text-foreground mb-4">{selectedAdmin.proofDocument}</p>
                  <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    <Download className="w-4 h-4" />
                    Download Document
                  </button>
                </div>
              </div>

              {selectedAdmin.status === "pending" && (
                <div className="pt-4 border-t border-border flex gap-3">
                  <button
                    onClick={() => handleApprove(selectedAdmin.id)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve Shop
                  </button>
                  <button
                    onClick={() => handleReject(selectedAdmin.id)}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-xl text-primary">User Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Name</label>
                  <p className="text-foreground">{selectedUser.name}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="text-foreground">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <p className="text-foreground">{selectedUser.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Join Date</label>
                  <p className="text-foreground">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Orders</label>
                  <p className="text-foreground">{selectedUser.orders}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Status</label>
                  <span className={`inline-block text-xs px-3 py-1 rounded-full ${getUserStatusColor(selectedUser.status)}`}>
                    {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Last Activity</label>
                  <p className="text-foreground">{getTimeSinceActivity(selectedUser.lastActivity)}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <label className="text-sm text-muted-foreground mb-2 block">Valid ID Document</label>
                <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center">
                  <FileText className="w-16 h-16 text-primary mb-3" />
                  <p className="text-sm text-foreground mb-4">{selectedUser.validIdDocument}</p>
                  <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    <Download className="w-4 h-4" />
                    Download Document
                  </button>
                </div>
              </div>

              {selectedUser.status === "pending" && (
                <div className="pt-4 border-t border-border flex gap-3">
                  <button
                    onClick={() => handleApproveUser(selectedUser.id)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve User
                  </button>
                  <button
                    onClick={() => handleRejectUser(selectedUser.id)}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}