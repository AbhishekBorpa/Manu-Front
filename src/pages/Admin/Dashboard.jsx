import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Package,
  Folder,
  ShoppingCart,
  MessageSquare,
  Mail,
  Settings,
  LogOut,
  MoreVertical,
  Menu,
  Search,
  Bell,
  ChevronDown,
  IndianRupee,
  Plus,
  X,
  Edit2,
  Trash2,
  ShieldCheck,
  CheckCircle,
  XCircle,
  ExternalLink,
  FileText,
  Eye
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ID");
  const [realStats, setRealStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [partnerProfiles, setPartnerProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    category: "",
    price: "",
    description: "",
    status: "Active",
    role: "user"
  });
  const [adminProfile, setAdminProfile] = useState({
    id: "",
    name: "Admin",
    email: "admin@example.com",
    role: "admin"
  });

  const handleVerification = async (id, status) => {
    if (window.confirm(`Are you sure you want to mark this seller as ${status}?`)) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${ (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api")}/admin/partner-profiles/${id}/verify`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({ status })
        });
        const data = await res.json();
        if (data.success) {
          setPartnerProfiles(partnerProfiles.map(p => p._id === id ? data.profile : p));
        } else {
          alert(data.msg || "Failed to update status.");
        }
      } catch (err) {
        console.error("Verification error:", err);
      }
    }
  };

  const handleDelete = async (id, endpoint) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${ (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api")}/${endpoint}/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          window.location.reload();
        } else {
          alert(data.msg || "Failed to delete item.");
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      name: item.name || item.author || "",
      email: item.email || "",
      category: item.category || "",
      price: item.price || "",
      description: item.description || item.desc || item.message || item.review || "",
      status: item.status || "Active",
      role: item.role || "user"
    });
    setImageFile(null);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const headers = { "Authorization": `Bearer ${token}` };

        // Admin Profile from local storage
        const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (savedUser.id || savedUser._id) {
          setAdminProfile({
            id: savedUser.id || savedUser._id,
            name: savedUser.name || "Admin",
            email: savedUser.email || "admin@example.com",
            role: savedUser.role || "admin"
          });
        }

        // Stats
        const statsRes = await fetch( (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/admin/stats", { headers });
        const statsData = await statsRes.json();
        if (statsData.success) setRealStats(statsData.stats);

        // Users
        const usersRes = await fetch( (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/admin/users", { headers });
        const usersData = await usersRes.json();
        if (usersData.success) setUsers(usersData.users);

        // Services
        const servicesRes = await fetch( (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/admin/services", { headers });
        const servicesData = await servicesRes.json();
        if (servicesData.success) setServices(servicesData.services);

        // Orders
        const ordersRes = await fetch( (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/admin/orders", { headers });
        const ordersData = await ordersRes.json();
        if (ordersData.success) setOrders(ordersData.orders);

        // Testimonials
        const testimonialsRes = await fetch( (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/admin/testimonials", { headers });
        const testimonialsData = await testimonialsRes.json();
        if (testimonialsData.success) setTestimonials(testimonialsData.testimonials);

        // Subscribers
        const subsRes = await fetch( (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/admin/subscribers", { headers });
        const subsData = await subsRes.json();
        if (subsData.success) setSubscribers(subsData.subscribers);

        // Leads
        const leadsRes = await fetch( (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/leads", { headers });
        const leadsData = await leadsRes.json();
        if (leadsData.success) setLeads(leadsData.leads);

        // Products
        const productsRes = await fetch( (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/products");
        const productsData = await productsRes.json();
        if (productsData.success) setProducts(productsData.products);

        // Categories
        const catRes = await fetch( (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/categories");
        const catData = await catRes.json();
        if (catData.success) setCategories(catData.categories);

        // Partner Profiles (Sellers Verifications)
        const partnersRes = await fetch( (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/admin/partner-profiles", { headers });
        const partnersData = await partnersRes.json();
        if (partnersData.success) setPartnerProfiles(partnersData.profiles);

      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    {
      name: "Users",
      icon: <Users size={16} />,
    },
    {
      name: "Leads",
      icon: <Briefcase size={16} />,
    },
    {
      name: "Services",
      icon: <Briefcase size={16} />,
    },
    {
      name: "Products",
      icon: <Package size={16} />,
    },
    {
      name: "Categories",
      icon: <Folder size={16} />,
    },
    {
      name: "Orders",
      icon: <ShoppingCart size={16} />,
    },
    {
      name: "Testimonials",
      icon: <MessageSquare size={16} />,
    },
    {
      name: "Subscribers",
      icon: <Mail size={16} />,
    },
    {
      name: "Profile",
      icon: <Settings size={16} />,
    },
    {
      name: "Verifications",
      icon: <ShieldCheck size={16} />,
    },
  ];

  const stats = [
    {
      title: "Total Users",
      value: realStats?.totalUsers || "1,245",
      growth: "12.5%",
      icon: <Users size={15} />,
      bg: "from-green-500 to-green-700",
    },
    {
      title: "Total Products",
      value: realStats?.totalProducts || "320",
      growth: "8.2%",
      icon: <Package size={15} />,
      bg: "from-purple-500 to-violet-700",
    },
    {
      title: "Total Revenue",
      value: realStats ? `₹${(realStats.totalRevenue / 100000).toFixed(1)}L` : "₹1,25,430",
      growth: "22.4%",
      icon: <IndianRupee size={15} />,
      bg: "from-blue-500 to-cyan-700",
    },
    {
      title: "Total Leads",
      value: realStats?.totalLeads || "890",
      growth: "18.7%",
      icon: <Users size={15} />,
      bg: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#020817] text-white">

      {/* SIDEBAR */}
      <aside
        className={`${
          sidebarOpen ? "w-[210px]" : "w-0"
        } h-screen bg-black border-r border-white/10 flex flex-col overflow-hidden transition-all duration-300`}
      >

        {/* LOGO */}
        <div className="h-[58px] flex items-center px-4 border-b border-white/10 flex-shrink-0">
          <h1 className="text-[16px] font-extrabold tracking-wide text-green-500 whitespace-nowrap">
            ULTRACLAD
          </h1>
        </div>

        {/* MENU */}
        <div className="flex-1 px-2 pt-3 overflow-hidden">

          <div className="space-y-1">

            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (item.name === "Logout") {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.href = "/sign-in";
                  } else {
                    setActiveMenu(item.name);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 h-[40px] rounded-xl transition-all duration-300 whitespace-nowrap ${
                  activeMenu === item.name
                    ? "bg-green-600 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}

                <span className="text-[13px] font-medium">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* PROFILE */}
        <div className="p-2 pb-3 flex-shrink-0">

          <div 
            onClick={() => setActiveMenu("Profile")}
            className="bg-[#0b1220] border border-white/10 rounded-xl px-3 py-3 flex items-center justify-between cursor-pointer hover:border-green-500/50 transition-colors"
          >

            <div className="flex items-center gap-2">

              <img
                src="https://i.pravatar.cc/100"
                alt="admin"
                className="w-9 h-9 rounded-full object-cover border border-green-500"
              />

              <div>
                <h3 className="text-white text-[12px] font-semibold leading-none whitespace-nowrap">
                  {adminProfile.name}
                </h3>

                <p className="text-gray-400 text-[10px] mt-1 whitespace-nowrap uppercase">
                  {adminProfile.role}
                </p>
              </div>
            </div>

            <button className="text-gray-400 hover:text-white">
              <Settings size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <header className="h-[58px] bg-black border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0">

          {/* LEFT */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white"
          >
            <Menu size={20} />
          </button>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            <button className="text-gray-300 hover:text-white">
              <Search size={17} />
            </button>

            <div className="relative">
              <button className="text-gray-300 hover:text-white">
                <Bell size={17} />
              </button>

              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 text-white text-[8px] font-semibold flex items-center justify-center">
                3
              </span>
            </div>

            <div 
              onClick={() => setActiveMenu("Profile")}
              className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded-xl transition-colors"
            >

              <img
                src="https://i.pravatar.cc/100"
                alt="admin"
                className="w-8 h-8 rounded-full object-cover border border-green-500"
              />

              <div className="leading-tight">
                <h3 className="text-white text-[12px] font-semibold">
                  {adminProfile.name}
                </h3>

                <p className="text-gray-400 text-[10px] uppercase">
                  {adminProfile.role}
                </p>
              </div>

              <ChevronDown
                size={14}
                className="text-gray-400"
              />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 p-4 overflow-hidden flex flex-col">

          {/* DASHBOARD PAGE */}
          {activeMenu === "Dashboard" && (
            <>
              {/* TITLE */}
              <div className="mb-3 flex-shrink-0">

                <h1 className="text-[24px] font-bold leading-none">
                  Dashboard
                </h1>

                <p className="text-gray-400 mt-1 text-[11px]">
                  Welcome back, Admin 👋
                </p>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-4 gap-3 flex-shrink-0">

                {stats.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#081120] border border-white/10 rounded-xl px-3 py-3 h-[88px]"
                  >

                    <div className="flex items-start justify-between">

                      <div>

                        <p className="text-gray-400 text-[10px]">
                          {item.title}
                        </p>

                        <h2 className="text-[17px] font-bold mt-2">
                          {item.value}
                        </h2>

                        <p className="text-green-400 mt-2 text-[9px] font-medium">
                          ↑ {item.growth}
                        </p>
                      </div>

                      <div
                        className={`w-[36px] h-[36px] rounded-full bg-gradient-to-br ${item.bg} flex items-center justify-center`}
                      >
                        {item.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* GRAPH + TABLE */}
              <div className="grid grid-cols-3 gap-3 mt-3 flex-1 overflow-hidden">

                {/* GRAPH */}
                <div className="col-span-2 bg-[#081120] border border-white/10 rounded-xl p-4 overflow-hidden">

                  <div className="flex items-center justify-between mb-4">

                    <h2 className="text-[16px] font-semibold">
                      Overview
                    </h2>

                    <button className="bg-[#0b1220] border border-white/10 px-3 h-[30px] rounded-lg text-[10px]">
                      This Month
                    </button>
                  </div>

                  <div className="mt-2 relative h-[320px]">

                    <div className="absolute inset-0 flex flex-col justify-between opacity-10">

                      {[1, 2, 3, 4, 5].map((item) => (
                        <div
                          key={item}
                          className="border-t border-white"
                        />
                      ))}
                    </div>

                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[8px] text-gray-500">

                      <span>100K</span>
                      <span>75K</span>
                      <span>50K</span>
                      <span>25K</span>
                      <span>0</span>
                    </div>

                    <div className="ml-5 h-full">

                      <svg
                        viewBox="0 0 800 300"
                        className="w-full h-full"
                      >

                        <defs>
                          <linearGradient
                            id="greenGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#00ff88"
                              stopOpacity="0.35"
                            />

                            <stop
                              offset="100%"
                              stopColor="#00ff88"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>

                        <path
                          d="
                          M 20 240
                          C 80 180, 120 70, 180 140
                          S 300 180, 360 140
                          S 500 60, 560 120
                          S 680 40, 760 35
                          L 760 300
                          L 20 300 Z
                          "
                          fill="url(#greenGradient)"
                        />

                        <path
                          d="
                          M 20 240
                          C 80 180, 120 70, 180 140
                          S 300 180, 360 140
                          S 500 60, 560 120
                          S 680 40, 760 35
                          "
                          fill="none"
                          stroke="#00ff88"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />

                        {[
                          [20, 240],
                          [80, 180],
                          [140, 90],
                          [220, 160],
                          [320, 140],
                          [400, 135],
                          [500, 75],
                          [570, 120],
                          [630, 150],
                          [720, 45],
                          [760, 35],
                        ].map((dot, i) => (
                          <circle
                            key={i}
                            cx={dot[0]}
                            cy={dot[1]}
                            r="4"
                            fill="#00ff88"
                          />
                        ))}
                      </svg>
                    </div>

                    <div className="ml-5 mt-1 flex justify-between text-[8px] text-gray-500">

                      <span>01 May</span>
                      <span>05 May</span>
                      <span>10 May</span>
                      <span>15 May</span>
                      <span>20 May</span>
                      <span>25 May</span>
                      <span>30 May</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT TABLE */}
                <div className="bg-[#081120] border border-white/10 rounded-xl p-4 overflow-hidden flex flex-col">

                  <div className="flex items-center justify-between mb-4">

                    <h2 className="text-[16px] font-semibold">
                      Recent Leads
                    </h2>

                    <button className="text-green-400 text-[10px]">
                      View All
                    </button>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-white/10 flex-1">

                    <div className="grid grid-cols-3 bg-white/5 h-[38px] items-center px-3 text-[10px] font-semibold text-gray-300">

                      <span>ID</span>
                      <span>Name</span>
                      <span>Status</span>
                    </div>

                    <div>

                      {[
                        ["#LD101", "Neha Sharma", "New"],
                        ["#LD102", "Rahul Verma", "Active"],
                        ["#LD103", "Ankit Singh", "Pending"],
                        ["#LD104", "Pooja Yadav", "Active"],
                        ["#LD105", "Vikram Joshi", "New"],
                      ].map((lead, i) => (

                        <div
                          key={i}
                          className="grid grid-cols-3 items-center px-3 h-[58px] border-t border-white/5 text-[10px]"
                        >

                          <span className="font-medium">
                            {lead[0]}
                          </span>

                          <span className="text-gray-300">
                            {lead[1]}
                          </span>

                          <span className="text-green-400">
                            {lead[2]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* OTHER PAGES */}
          {activeMenu !== "Dashboard" && activeMenu !== "Profile" && activeMenu !== "Verifications" && (
            <div className="flex flex-col gap-3 flex-1 overflow-hidden">
              {/* MAIN CONTENT */}
              <div className="flex flex-col gap-3 flex-1 overflow-hidden">
                {/* TOP BAR */}
                <div className="bg-[#081120] border border-white/10 rounded-xl p-4 flex items-start justify-between flex-shrink-0">
                  <div>
                    <h2 className="text-[24px] font-bold leading-none">{activeMenu}</h2>
                    <p className="text-gray-400 mt-2 text-[11px]">Manage your {activeMenu.toLowerCase()} data efficiently.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={`Search ${activeMenu.toLowerCase()}...`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-[220px] h-[38px] bg-[#0b1220] border border-white/10 rounded-lg pl-4 pr-10 text-[11px] text-white outline-none focus:border-green-500"
                      />
                      <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="h-[38px] px-3 bg-[#0b1220] border border-white/10 rounded-lg text-[11px] text-white outline-none focus:border-green-500"
                    >
                      <option>ID</option>
                      <option>Name</option>
                      <option>Category</option>
                      <option>Status</option>
                    </select>
                    <button 
                      onClick={() => setIsAddModalOpen(true)}
                      className="h-[38px] px-4 rounded-lg bg-green-600 hover:bg-green-500 transition-all duration-300 flex items-center gap-2 text-[11px] font-medium"
                    >
                      <Plus size={14} />
                      Add
                    </button>
                  </div>
                </div>

                {/* TABLE AREA */}
                <div className="bg-[#081120] border border-white/10 rounded-2xl p-6 flex-1 overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[18px] font-bold">Manage {activeMenu}</h2>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <span>Total:</span>
                      <span className="text-green-500">
                        {activeMenu === "Users" ? users.length :
                         activeMenu === "Leads" ? leads.length :
                         activeMenu === "Products" ? products.length :
                         activeMenu === "Categories" ? categories.length :
                         activeMenu === "Services" ? services.length :
                         activeMenu === "Orders" ? orders.length :
                         activeMenu === "Testimonials" ? testimonials.length :
                         activeMenu === "Subscribers" ? subscribers.length : 0}
                      </span>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-white/10 flex-1 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-5 bg-white/5 h-[40px] items-center px-4 text-[11px] font-semibold text-gray-300 sticky top-0 z-10">
                      <span>ID</span>
                      <span>{activeMenu === "Categories" ? "Name" : activeMenu === "Users" ? "Full Name" : activeMenu === "Orders" ? "Order ID" : activeMenu === "Subscribers" ? "Email" : "Title/Name"}</span>
                      <span>{activeMenu === "Leads" || activeMenu === "Users" ? "Email" : activeMenu === "Orders" ? "Total Amount" : activeMenu === "Testimonials" ? "Author" : "Category/Detail"}</span>
                      <span>Status</span>
                      <span className="text-right">Actions</span>
                    </div>

                    <div>
                      {activeMenu === "Users" && (users.length > 0 ? users.map((user) => (
                        <div key={user._id} className="grid grid-cols-5 items-center px-4 h-[62px] border-t border-white/5 text-[10px]">
                          <span className="font-medium text-white">#{user._id.slice(-6).toUpperCase()}</span>
                          <span className="text-gray-300">{user.name}</span>
                          <span className="text-gray-400 truncate pr-4">{user.email}</span>
                          <span>
                            <span className={`px-3 py-1 rounded-md text-[9px] ${
                              user.role === "admin" ? "bg-purple-500/10 text-purple-400" : "bg-blue-500/10 text-blue-400"
                            }`}>
                              {user.role}
                            </span>
                          </span>
                          <div className="flex items-center justify-end gap-3 text-gray-400">
                            <button onClick={() => handleEditClick(user)} className="hover:text-blue-400 transition-colors"><Edit2 size={14} /></button>
                            <button onClick={() => handleDelete(user._id, "admin/users")} className="hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      )) : <p className="p-10 text-center text-slate-500 text-xs">No users found.</p>)}

                      {activeMenu === "Services" && (services.length > 0 ? services.map((service) => (
                        <div key={service._id} className="grid grid-cols-5 items-center px-4 h-[62px] border-t border-white/5 text-[10px]">
                          <span className="font-medium text-white">#{service._id.slice(-6).toUpperCase()}</span>
                          <span className="text-gray-300">{service.title}</span>
                          <span className="text-gray-400">{service.category}</span>
                          <span className="px-3 py-1 rounded-md bg-green-500/10 text-green-400 text-[9px] w-fit">Active</span>
                          <div className="flex items-center justify-end gap-3 text-gray-400">
                            <button onClick={() => handleEditClick(service)} className="hover:text-blue-400 transition-colors"><Edit2 size={14} /></button>
                            <button onClick={() => handleDelete(service._id, "manufacturing")} className="hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      )) : <p className="p-10 text-center text-slate-500 text-xs">No services found.</p>)}

                      {activeMenu === "Orders" && (orders.length > 0 ? orders.map((order) => (
                        <div key={order._id} className="grid grid-cols-5 items-center px-4 h-[62px] border-t border-white/5 text-[10px]">
                          <span className="font-medium text-white">#{order.orderId}</span>
                          <span className="text-gray-300">{order.customer?.name || "Customer"}</span>
                          <span className="text-gray-400">₹{order.totalAmount}</span>
                          <span>
                            <span className={`px-3 py-1 rounded-md text-[9px] ${
                              order.status === "Delivered" ? "bg-green-500/10 text-green-400" : "bg-orange-500/10 text-orange-400"
                            }`}>
                              {order.status}
                            </span>
                          </span>
                          <div className="flex items-center justify-end gap-3 text-gray-400">
                            <button onClick={() => handleEditClick(order)} className="hover:text-blue-400 transition-colors"><Edit2 size={14} /></button>
                            <button onClick={() => handleDelete(order._id, "orders")} className="hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      )) : <p className="p-10 text-center text-slate-500 text-xs">No orders found.</p>)}

                      {activeMenu === "Testimonials" && (testimonials.length > 0 ? testimonials.map((test) => (
                        <div key={test._id} className="grid grid-cols-5 items-center px-4 h-[62px] border-t border-white/5 text-[10px]">
                          <span className="font-medium text-white">#{test._id.slice(-6).toUpperCase()}</span>
                          <span className="text-gray-300 truncate pr-4">{test.message || test.review}</span>
                          <span className="text-gray-400">{test.name || test.author}</span>
                          <span className="px-3 py-1 rounded-md bg-green-500/10 text-green-400 text-[9px] w-fit">Published</span>
                          <div className="flex items-center justify-end gap-3 text-gray-400">
                            <button onClick={() => handleEditClick(test)} className="hover:text-blue-400 transition-colors"><Edit2 size={14} /></button>
                            <button onClick={() => handleDelete(test._id, "testimonials")} className="hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      )) : <p className="p-10 text-center text-slate-500 text-xs">No testimonials found.</p>)}

                      {activeMenu === "Subscribers" && (subscribers.length > 0 ? subscribers.map((sub) => (
                        <div key={sub._id} className="grid grid-cols-5 items-center px-4 h-[62px] border-t border-white/5 text-[10px]">
                          <span className="font-medium text-white">#{sub._id.slice(-6).toUpperCase()}</span>
                          <span className="text-gray-300">{sub.email}</span>
                          <span className="text-gray-400">{new Date(sub.createdAt).toLocaleDateString()}</span>
                          <span className="px-3 py-1 rounded-md bg-green-500/10 text-green-400 text-[9px] w-fit">{sub.status}</span>
                          <div className="flex items-center justify-end gap-3 text-gray-400">
                            <button onClick={() => handleEditClick(sub)} className="hover:text-blue-400 transition-colors"><Edit2 size={14} /></button>
                            <button onClick={() => handleDelete(sub._id, "subscribers")} className="hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      )) : <p className="p-10 text-center text-slate-500 text-xs">No subscribers found.</p>)}

                      {activeMenu === "Leads" && (leads.length > 0 ? leads.map((lead) => (
                        <div key={lead._id} className="grid grid-cols-5 items-center px-4 h-[62px] border-t border-white/5 text-[10px]">
                          <span className="font-medium text-white">#{lead._id.slice(-6).toUpperCase()}</span>
                          <span className="text-gray-300">{lead.name}</span>
                          <span className="text-gray-400 truncate pr-4">{lead.email}</span>
                          <span>
                            <span className={`px-3 py-1 rounded-md text-[9px] ${
                              lead.status === "New" ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"
                            }`}>
                              {lead.status}
                            </span>
                          </span>
                          <div className="flex items-center justify-end gap-3 text-gray-400">
                            <button onClick={() => handleEditClick(lead)} className="hover:text-blue-400 transition-colors"><Edit2 size={14} /></button>
                            <button onClick={() => handleDelete(lead._id, "leads")} className="hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      )) : <p className="p-10 text-center text-slate-500 text-xs">No leads found.</p>)}

                      {activeMenu === "Products" && (products.length > 0 ? products.map((product) => (
                        <div key={product._id} className="grid grid-cols-5 items-center px-4 h-[62px] border-t border-white/5 text-[10px]">
                          <span className="font-medium text-white">#{product._id.slice(-6).toUpperCase()}</span>
                          <span className="text-gray-300">{product.title}</span>
                          <span className="text-gray-400">{product.category || 'Industrial'}</span>
                          <span className="px-3 py-1 rounded-md bg-green-500/10 text-green-400 text-[9px] w-fit">Active</span>
                          <div className="flex items-center justify-end gap-3 text-gray-400">
                            <button onClick={() => handleEditClick(product)} className="hover:text-blue-400 transition-colors"><Edit2 size={14} /></button>
                            <button onClick={() => handleDelete(product._id, "products")} className="hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      )) : <p className="p-10 text-center text-slate-500 text-xs">No products found.</p>)}

                      {activeMenu === "Categories" && (categories.length > 0 ? categories.map((cat) => (
                        <div key={cat._id} className="grid grid-cols-5 items-center px-4 h-[62px] border-t border-white/5 text-[10px]">
                          <span className="font-medium text-white">#{cat._id.slice(-6).toUpperCase()}</span>
                          <span className="text-gray-300">{cat.name}</span>
                          <span className="text-gray-400">{cat.industry || 'Global'}</span>
                          <span className="px-3 py-1 rounded-md bg-green-500/10 text-green-400 text-[9px] w-fit">Enabled</span>
                          <div className="flex items-center justify-end gap-3 text-gray-400">
                            <button onClick={() => handleEditClick(cat)} className="hover:text-blue-400 transition-colors"><Edit2 size={14} /></button>
                            <button onClick={() => handleDelete(cat._id, "categories")} className="hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      )) : <p className="p-10 text-center text-slate-500 text-xs">No categories found.</p>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* VERIFICATIONS PAGE */}
          {activeMenu === "Verifications" && (
            <div className="flex flex-col gap-3 flex-1 overflow-hidden">
              <div className="bg-[#081120] border border-white/10 rounded-xl p-4 flex items-start justify-between flex-shrink-0">
                <div>
                  <h2 className="text-[24px] font-bold leading-none">KYC & Verifications</h2>
                  <p className="text-gray-400 mt-2 text-[11px]">Review legal documents and approve partner requests.</p>
                </div>
              </div>

              <div className="bg-[#081120] border border-white/10 rounded-xl overflow-hidden flex flex-col flex-1">
                <div className="grid grid-cols-7 px-4 h-[45px] items-center text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-white/10">
                  <span>Company / ID</span>
                  <span>GST Number</span>
                  <span>Documents</span>
                  <span>Status</span>
                  <span>Submitted</span>
                  <span className="text-center">Details</span>
                  <span className="text-right">Actions</span>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {partnerProfiles.length > 0 ? partnerProfiles.map((profile) => (
                    <div key={profile._id} className="grid grid-cols-7 items-center px-4 py-4 border-t border-white/5 text-[10px]">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-white truncate pr-2">{profile.companyName}</span>
                        <span className="text-gray-500 font-mono">#{profile._id.slice(-6).toUpperCase()}</span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-gray-300 font-bold">{profile.gstNumber || 'N/A'}</span>
                        <span className="text-gray-500 text-[8px] truncate pr-2">Reg: {profile.businessRegistrationNumber || 'N/A'}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {profile.gstDoc ? (
                          <a href={profile.gstDoc} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 p-1.5 bg-blue-500/10 text-blue-400 rounded-md hover:bg-blue-500 hover:text-white transition-all">
                             <FileText size={12} /> GST
                          </a>
                        ) : <span className="text-gray-600">-</span>}
                        {profile.businessRegDoc ? (
                          <a href={profile.businessRegDoc} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 p-1.5 bg-purple-500/10 text-purple-400 rounded-md hover:bg-purple-500 hover:text-white transition-all">
                             <FileText size={12} /> Reg
                          </a>
                        ) : <span className="text-gray-600">-</span>}
                      </div>

                      <span>
                        <span className={`px-3 py-1 rounded-md text-[9px] font-bold ${
                          profile.verificationStatus === "Verified" ? "bg-green-500/10 text-green-400" : 
                          profile.verificationStatus === "Rejected" ? "bg-red-500/10 text-red-400" : 
                          "bg-orange-500/10 text-orange-400"
                        }`}>
                          {profile.verificationStatus}
                        </span>
                      </span>

                      <span className="text-gray-400">
                        {profile.kycSubmittedAt ? new Date(profile.kycSubmittedAt).toLocaleDateString() : 'N/A'}
                      </span>

                      <div className="flex justify-center">
                        <button 
                          onClick={() => navigate(`/admin/partner/${profile._id}`)}
                          className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Eye size={16} />
                        </button>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        {profile.verificationStatus === "Pending" ? (
                          <>
                            <button 
                              onClick={() => handleVerification(profile._id, 'Verified')}
                              className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-500 transition-all text-[9px] font-bold flex items-center gap-1"
                            >
                              <CheckCircle size={12} /> Approve
                            </button>
                            <button 
                              onClick={() => handleVerification(profile._id, 'Rejected')}
                              className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-500 transition-all text-[9px] font-bold flex items-center gap-1"
                            >
                              <XCircle size={12} /> Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-600 italic">No actions</span>
                        )}
                      </div>
                    </div>
                  )) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-500 py-20">
                      <ShieldCheck size={40} className="opacity-20" />
                      <p className="text-xs">No verification requests found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* PROFILE PAGE */}

          {activeMenu === "Profile" && (
            <div className="flex flex-col gap-6 flex-1 overflow-hidden p-4">
              <div className="bg-[#081120] border border-white/10 rounded-2xl p-8 max-w-2xl w-full mx-auto animate-in fade-in zoom-in duration-300">
                <div className="flex items-center gap-6 border-b border-white/10 pb-8 mb-8">
                  <div className="relative">
                    <img 
                      src="https://i.pravatar.cc/150" 
                      alt="admin profile" 
                      className="w-24 h-24 rounded-full border-4 border-green-500 object-cover shadow-lg shadow-green-500/20"
                    />
                    <div className="absolute bottom-0 right-0 bg-green-500 p-1.5 rounded-full border-2 border-[#081120] cursor-pointer hover:bg-green-400 transition-colors">
                      <Edit2 size={12} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{adminProfile.name}</h2>
                    <p className="text-green-500 font-medium text-sm mt-1 uppercase tracking-widest">{adminProfile.role}</p>
                    <p className="text-gray-400 text-sm mt-1">{adminProfile.email}</p>
                  </div>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        value={adminProfile.name}
                        onChange={(e) => setAdminProfile({...adminProfile, name: e.target.value})}
                        className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        value={adminProfile.email}
                        onChange={(e) => setAdminProfile({...adminProfile, email: e.target.value})}
                        className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Role</label>
                    <input 
                      type="text" 
                      value={adminProfile.role}
                      disabled
                      className="w-full bg-[#0b1220]/50 border border-white/5 rounded-xl h-[45px] px-4 text-sm text-gray-500 outline-none cursor-not-allowed"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3">
                    <button type="button" className="px-6 h-[45px] rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      onClick={async () => {
                        try {
                          const token = localStorage.getItem("token");
                          if (!adminProfile.id) return alert("No User ID found.");
                          const res = await fetch(`${ (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api")}/admin/users/${adminProfile.id}`, {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify({ name: adminProfile.name, email: adminProfile.email })
                          });
                          const data = await res.json();
                          if (data.success) {
                            alert("Profile updated successfully!");
                            localStorage.setItem("user", JSON.stringify(data.user));
                          } else {
                            alert(data.msg || "Failed to update profile.");
                          }
                        } catch (err) {
                          console.error("Profile update error:", err);
                        }
                      }}
                      className="px-6 h-[45px] rounded-xl text-sm font-medium bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/20 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ADD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#081120] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-white">Add New {activeMenu.slice(0, -1)}</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const token = localStorage.getItem("token");
                  const endpoint = activeMenu === "Products" ? "products" : 
                                  activeMenu === "Categories" ? "categories" :
                                  activeMenu === "Services" ? "manufacturing" :
                                  activeMenu === "Users" ? "admin/users" : "";
                  
                  if (!endpoint) return;

                  let fetchOptions = {
                    method: "POST",
                    headers: {
                      "Authorization": `Bearer ${token}`
                    }
                  };

                  if (["Products", "Categories", "Services"].includes(activeMenu)) {
                    const formDataObj = new FormData();
                    Object.keys(formData).forEach(key => {
                      if (formData[key]) formDataObj.append(key, formData[key]);
                    });
                    if (imageFile) {
                      formDataObj.append("image", imageFile);
                    }
                    fetchOptions.body = formDataObj;
                  } else {
                    fetchOptions.headers["Content-Type"] = "application/json";
                    fetchOptions.body = JSON.stringify(formData);
                  }

                  const res = await fetch(`${ (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api")}/${endpoint}`, fetchOptions);

                  const data = await res.json();
                  if (data.success) {
                    setIsAddModalOpen(false);
                    setFormData({ title: "", name: "", email: "", category: "", price: "", description: "", status: "Active", role: "user" });
                    setImageFile(null);
                    window.location.reload();
                  } else {
                    alert(data.msg || "Error adding item");
                  }
                } catch (err) {
                  console.error("Add Error:", err);
                }
              }}
              className="p-6 space-y-4"
            >
              {(activeMenu === "Products" || activeMenu === "Services") && (
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
                </div>
              )}
              {activeMenu === "Users" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Full Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
                  </div>
                </div>
              )}
              {/* Image Upload */}
              {["Products", "Categories", "Services"].includes(activeMenu) && (
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Image</label>
                  <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-400 transition-all cursor-pointer" />
                </div>
              )}
              <button type="submit" className="w-full h-[45px] mt-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-all shadow-lg shadow-green-600/20">
                Save {activeMenu.slice(0, -1)}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;