import {useContext, useEffect, useState} from "react";
import { Button } from "@/components/ui/button"
import { EyeIcon ,EyeOff} from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TodoButton from "@/components/TodoButton.tsx";
import {ThemeContext} from "@/contexts/ColorContext.ts";
import DarkModeToggle from "@/components/DarkModeToggle.tsx";

export function AccessForm() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { textColor, bgColor} = useContext(ThemeContext)

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState("password");

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      return;
    }

    setOpen(value);
  }

  const handleSubmit = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setShowPassword(true);
    setType("text");

    setTimeout(() => {
      setShowPassword(false);
      setType("password");
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <form>
        <DialogContent
            className="sm:max-w-[425px]"
            style={{backgroundColor:bgColor, color: textColor}}
            showCloseButton={false}>
          <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
          <DialogHeader>
            <DialogTitle>Sign Up / Login</DialogTitle>
            <DialogDescription>
              Please log in to your account, or sign up if you don’t have one.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="Your Email"
                     onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" placeholder="Username"
                     onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'row', position: 'relative'}}>
                <Input id="password" name="password" placeholder="Password" type={type}
                       onChange={(e) => setPassword(e.target.value)}/>
                <Button type="button" size="sm" onClick={handleToggle} className="absolute right-0 top-0.5"
                        style={{
                          backgroundColor: "transparent",
                          border: 'none',
                          outline: 'none',
                          color: textColor
                        }}>
                  {showPassword ? <EyeOff /> : <EyeIcon />}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <TodoButton buttonText="Submit" onClick={handleSubmit}/>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
