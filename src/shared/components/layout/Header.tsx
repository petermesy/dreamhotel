import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState, setTab } from "../../../store";
import { Calendar, Lock, Menu, X } from "lucide-react";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = useSelector((state: RootState) => state.ui.currentTab);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const baseItems = [
    { id: "HOME", label: "Home", path: "/" },
    { id: "ROOMS", label: "Rooms & Rates", path: "/rooms" },
    { id: "CONFERENCE", label: "Conference Hall", path: "/conference" },
    { id: "GALLERY" as const, label: "Gallery", path: "/gallery" },
    { id: "ABOUT", label: "About Us", path: "/about" },
    { id: "CONTACT", label: "Contact Us", path: "/contact" },
  ] as const;

  const navigationItems = React.useMemo(() => {
    if (isAuthenticated && user?.role === "USER") {
      return [
        ...baseItems,
        { id: "MY_BOOKINGS" as const, label: "My Bookings", path: "/my-bookings" }
      ];
    }
    return baseItems;
  }, [isAuthenticated, user]);

  React.useEffect(() => {
    const pathToTab: Record<string, typeof currentTab> = {
      "/": "HOME",
      "/rooms": "ROOMS",
      "/conference": "CONFERENCE",
      "/gallery": "GALLERY",
      "/about": "ABOUT",
      "/contact": "CONTACT",
      "/book-now": "BOOK_NOW",
      "/my-bookings": "MY_BOOKINGS",
      "/admin": "ADMIN",
    };

    dispatch(setTab(pathToTab[location.pathname] ?? "HOME"));
  }, [dispatch, location.pathname]);

  const handleNavigate = (tab: typeof currentTab, path: string) => {
    dispatch(setTab(tab));
    navigate(path);
  };

  return (
    <header className="w-full flex flex-col bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm animate-fade-in">
      {/* Main Navigation Row */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo / Brand Name */}
        <button 
          onClick={() => handleNavigate("HOME", "/")}
          className="flex flex-col items-start cursor-pointer group text-left focus:outline-none"
        >
          <span className="text-xl sm:text-2xl font-serif font-medium tracking-tight text-slate-950 group-hover:text-indigo-600 transition-colors">
            DREAM HOTEL
          </span>
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase -mt-0.5">
            Boutique Hotel
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id, item.path)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                currentTab === item.id
                  ? "bg-indigo-50 text-indigo-900 border border-indigo-200/50 font-semibold"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons & Authentication Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavigate("BOOK_NOW", "/book-now")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all shadow-sm flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
              <button
                onClick={() => {
                  handleNavigate(user?.role === "USER" ? "MY_BOOKINGS" : "ADMIN", user?.role === "USER" ? "/my-bookings" : "/admin");
                }}
                className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-indigo-700 hover:text-indigo-900 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {user?.role === "USER" ? "My Bookings" : `Portal (${user?.role})`}
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavigate("ADMIN", "/admin")}
              className="text-slate-500 hover:text-indigo-600 text-sm font-semibold flex items-center gap-1.5 px-3.5 py-2 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4 text-slate-400" />
              <span>Login / Register</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => handleNavigate("BOOK_NOW", "/book-now")}
            className="bg-indigo-600 text-white text-xs font-bold px-3 py-2 rounded flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-950 focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 py-4 px-4 flex flex-col gap-2 transition-all shadow-inner animate-slide-down">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                handleNavigate(item.id, item.path);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                currentTab === item.id
                  ? "bg-indigo-50 text-indigo-900 border-l-4 border-indigo-500"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-px bg-slate-100 my-2"></div>
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleNavigate(user?.role === "USER" ? "MY_BOOKINGS" : "ADMIN", user?.role === "USER" ? "/my-bookings" : "/admin");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm font-semibold text-indigo-700 bg-indigo-50 rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              {user?.role === "USER" ? "My Bookings" : `Dashboard Portal (${user?.role})`}
            </button>
          ) : (
            <button
              onClick={() => {
                handleNavigate("ADMIN", "/admin");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              Guest Login / Register
            </button>
          )}
        </div>
      )}
    </header>
  );
}
