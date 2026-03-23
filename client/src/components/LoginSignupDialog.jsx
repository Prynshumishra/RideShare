import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { useContext, useState } from "react"
import { AuthContext } from "@/context/AuthContext"
import axios from "axios"

const apiUri = import.meta.env.VITE_REACT_API_URI

const LoginSignupDialog = () => {
  const { loading, error, dispatch } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    const payload = {
      email: loginData.email.trim(),
      password: loginData.password
    }
    try{
      const res = await axios.post(`${apiUri}/auth/login`, payload, {withCredentials: true})
      dispatch({type:"LOGIN_SUCCESS", payload: res.data})
      setLoginData({ email: "", password: "" })
    }catch(err){
      dispatch({type: "LOGIN_FAILED", payload: err.response?.data || { message: "Unable to login" }})
    }
  };


  const handleSignup = async (event) => {
    event.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    const payload = {
      name: signupData.name.trim(),
      email: signupData.email.trim(),
      password: signupData.password
    }
    try{
      const res = await axios.post(`${apiUri}/auth/register`, payload, {withCredentials: true})
      dispatch({type:"LOGIN_SUCCESS", payload: res.data})
      setSignupData({ name: "", email: "", password: "" })
    }catch(err){
      dispatch({type: "LOGIN_FAILED", payload: err.response?.data || { message: "Unable to sign up" }})
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Log in</Button>
      </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-2">
            <DialogTitle>Welcome to RideShare</DialogTitle>
            <DialogDescription>
              Access your account or create one to start publishing and joining rides.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="login">
            <TabsList className="my-4 grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>

            {error && <p className="mb-2 rounded-lg border border-destructive/25 bg-destructive/10 px-3 py-2 text-sm text-destructive" aria-live="polite">{error?.message}</p>}

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    autoComplete="email"
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    autoComplete="current-password"
                    type="password"
                    minLength={8}
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                </div>
                <Button disabled={loading} type="submit" className="mt-2 w-full">
                  {loading ? "Logging in..." : "Log in"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    required
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newemail">Email</Label>
                  <Input
                    id="newemail"
                    autoComplete="email"
                    type="email"
                    required
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newpassword">Password</Label>
                  <Input
                    id="newpassword"
                    autoComplete="new-password"
                    type="password"
                    minLength={8}
                    required
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  />
                </div>
                <Button disabled={loading} type="submit" className="mt-2 w-full">
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
    </Dialog>
  )
}

export default LoginSignupDialog