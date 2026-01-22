"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AuthPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Check credentials
    if (username === "Ayush" && password === "Ayush123") {
      router.push("/main"); // redirect
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Login/SignUp */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Join CodeIt</h1>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="mb-6 bg-gray-100 rounded-lg p-1 flex justify-center gap-4">
              <TabsTrigger value="login" className="px-6 py-2 rounded-lg">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="px-6 py-2 rounded-lg">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <Label htmlFor="loginUsername">Username</Label>
                  <Input
                    id="loginUsername"
                    type="text"
                    placeholder="Enter username"
                    className="mt-1"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="loginPassword">Password</Label>
                  <Input
                    id="loginPassword"
                    type="password"
                    placeholder="Enter password"
                    className="mt-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button className="w-full mt-4" type="submit">
                  Login
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Don't have an account? <span className="font-medium text-blue-600">Sign Up</span>
              </p>
            </TabsContent>

            {/* Sign Up Form */}
            <TabsContent value="signup">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="signupName">Full Name</Label>
                  <Input id="signupName" type="text" placeholder="Your Name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="signupEmail">Email</Label>
                  <Input id="signupEmail" type="email" placeholder="you@example.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input id="signupPassword" type="password" placeholder="Enter a password" className="mt-1" />
                </div>
                <Button className="w-full mt-4">Sign Up</Button>
              </form>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Already have an account? <span className="font-medium text-blue-600">Login</span>
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block md:w-1/2 relative">
       
        <div className="absolute inset-0 bg-green-500 rounded-l-2xl opacity-80"></div>
      </div>
    </div>
  );
}
