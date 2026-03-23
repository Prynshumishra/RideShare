import logo from "../assets/logo.svg"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage  } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Search, PlusCircle, LogOut, User } from "lucide-react";
import LoginSignupDialog from "./LoginSignupDialog";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import axios from "axios";
const apiUri = import.meta.env.VITE_REACT_API_URI


const Header = () => {
  const {user, dispatch} = useContext(AuthContext)
  const navigate = useNavigate();
  const navLinks = [
    { to: "/search", label: "Search rides", icon: Search },
    { to: "/offer-seat", label: "Publish", icon: PlusCircle },
  ];

  const handleLogout = async () => {
    try{
      await axios.post(`${apiUri}/auth/logout`, {}, {withCredentials: true});
      dispatch({ type: 'LOGOUT' });
      navigate("/");
    }catch(err){
      console.log(err)
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="page-container flex h-16 items-center gap-3">
        <NavLink to="/" className="inline-flex items-center gap-2">
          <img src={logo} width={34} alt="RideShare" />
          <span className="font-display text-lg font-bold text-primary sm:text-xl">RideShare</span>
        </NavLink>

        <nav className="ml-auto hidden items-center gap-2 sm:flex">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <NavLink
            to="/search"
            aria-label="Search rides"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:hidden"
          >
            <Search className="h-4 w-4" />
          </NavLink>
          <NavLink
            to="/offer-seat"
            aria-label="Publish ride"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:hidden"
          >
            <PlusCircle className="h-4 w-4" />
          </NavLink>

          {!user ? (
            <LoginSignupDialog />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={user.user.profilePicture} />
                  <AvatarFallback className="select-none text-sm font-bold text-primary">
                    {user.user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex cursor-pointer items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header