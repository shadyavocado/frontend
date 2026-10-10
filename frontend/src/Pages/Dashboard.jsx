import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Dashboard() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard">

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>

                <div className="logo">
                    <div className="logo-icon">D</div>
                    <span>Dashboard</span>
                </div>

                <nav className="sidebar-nav">

                    <button className="nav-item active">
                        <span>🏠</span>
                        Dashboard
                    </button>

                    <button className="nav-item">
                        <span>👤</span>
                        Profile
                    </button>

                    <button className="nav-item">
                        <span>📊</span>
                        Analytics
                    </button>

                    <button className="nav-item">
                        <span>⚙️</span>
                        Settings
                    </button>

                </nav>

                <button className="logout-btn" onClick={handleLogout}>
                    <span>🚪</span>
                    Logout
                </button>

            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="main-content">

                {/* Top Navbar */}
                <header className="topbar">

                    <button
                        className="menu-btn"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        ☰
                    </button>

                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome back! Here's what's happening today.</p>
                    </div>

                    <div className="user-area">
                        <div className="notification">
                            🔔
                            <span className="notification-dot"></span>
                        </div>

                        <div className="user-avatar">
                            U
                        </div>

                        <div className="user-info">
                            <strong>User</strong>
                            <span>Admin</span>
                        </div>
                    </div>

                </header>

                {/* Dashboard Content */}
                <section className="dashboard-content">

                    {/* Stats */}
                    <div className="stats-grid">

                        <div className="stat-card">
                            <div className="stat-icon blue">
                                👥
                            </div>

                            <div>
                                <p>Total Users</p>
                                <h2>1,250</h2>
                                <span className="growth">+12.5%</span>
                                <small> from last month</small>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon green">
                                📈
                            </div>

                            <div>
                                <p>Revenue</p>
                                <h2>$24,500</h2>
                                <span className="growth">+8.2%</span>
                                <small> from last month</small>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon purple">
                                🛒
                            </div>

                            <div>
                                <p>Total Orders</p>
                                <h2>856</h2>
                                <span className="growth">+5.4%</span>
                                <small> from last month</small>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon orange">
                                ⭐
                            </div>

                            <div>
                                <p>Customers</p>
                                <h2>4,320</h2>
                                <span className="growth">+10.1%</span>
                                <small> from last month</small>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Grid */}
                    <div className="dashboard-grid">

                        {/* Overview */}
                        <div className="dashboard-card overview-card">

                            <div className="card-header">
                                <div>
                                    <h3>Overview</h3>
                                    <p>Monthly performance</p>
                                </div>

                                <select>
                                    <option>Last 7 days</option>
                                    <option>Last 30 days</option>
                                    <option>Last 6 months</option>
                                </select>
                            </div>

                            <div className="chart">

                                <div className="chart-y">
                                    <span>100</span>
                                    <span>75</span>
                                    <span>50</span>
                                    <span>25</span>
                                    <span>0</span>
                                </div>

                                <div className="chart-area">

                                    <div className="chart-lines">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>

                                    <div className="bars">
                                        <div style={{ height: "45%" }}></div>
                                        <div style={{ height: "65%" }}></div>
                                        <div style={{ height: "52%" }}></div>
                                        <div style={{ height: "78%" }}></div>
                                        <div style={{ height: "60%" }}></div>
                                        <div style={{ height: "88%" }}></div>
                                        <div style={{ height: "72%" }}></div>
                                    </div>

                                    <div className="chart-x">
                                        <span>Mon</span>
                                        <span>Tue</span>
                                        <span>Wed</span>
                                        <span>Thu</span>
                                        <span>Fri</span>
                                        <span>Sat</span>
                                        <span>Sun</span>
                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* Recent Activity */}
                        <div className="dashboard-card activity-card">

                            <div className="card-header">
                                <div>
                                    <h3>Recent Activity</h3>
                                    <p>Latest updates</p>
                                </div>

                                <button className="view-btn">
                                    View All
                                </button>
                            </div>

                            <div className="activity-list">

                                <div className="activity-item">
                                    <div className="activity-icon blue">
                                        👤
                                    </div>

                                    <div>
                                        <strong>New user registered</strong>
                                        <p>John Doe created an account</p>
                                        <small>5 minutes ago</small>
                                    </div>
                                </div>

                                <div className="activity-item">
                                    <div className="activity-icon green">
                                        💰
                                    </div>

                                    <div>
                                        <strong>Payment received</strong>
                                        <p>Payment of $250 received</p>
                                        <small>25 minutes ago</small>
                                    </div>
                                </div>

                                <div className="activity-item">
                                    <div className="activity-icon purple">
                                        🛒
                                    </div>

                                    <div>
                                        <strong>New order placed</strong>
                                        <p>Order #10245 was placed</p>
                                        <small>1 hour ago</small>
                                    </div>
                                </div>

                                <div className="activity-item">
                                    <div className="activity-icon orange">
                                        ⭐
                                    </div>

                                    <div>
                                        <strong>New review</strong>
                                        <p>Customer left a 5-star review</p>
                                        <small>2 hours ago</small>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;