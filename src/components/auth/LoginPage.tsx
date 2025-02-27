import React, { useState } from "react";
import { Mail } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import VerificationCodeInput from "./VerificationCodeInput";

interface LoginPageProps {
  onSubmit?: (email: string) => void;
  isLoading?: boolean;
}

const LoginPage = ({
  onSubmit = () => {},
  isLoading = false,
}: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "verification">("email");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending verification code
    console.log(`Sending verification code to ${email}`);
    setStep("verification");
  };

  const handleVerificationSubmit = (code: string) => {
    // Check if code is valid (for demo, we accept 123456)
    if (code === "123456") {
      // Call the actual login handler
      onSubmit(email);
    } else {
      // In a real app, you would show an error message
      console.error("Invalid verification code");
      alert("Invalid verification code. For demo purposes, use 123456.");
    }
  };

  const handleGoogleLogin = () => {
    // In a real app, this would trigger the Google OAuth flow
    console.log("Google login clicked");
    // For demo purposes, we'll just simulate a successful login
    onSubmit("google-user@example.com");
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50">
      <div className="w-full max-w-md px-4">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              {step === "email"
                ? "Enter your email to sign in to your account"
                : "Enter the verification code sent to your email"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "email" ? (
              <div className="space-y-6">
                <form onSubmit={handleEmailSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        disabled={isLoading}
                      />
                    </div>
                    <Button type="submit" disabled={isLoading || !email}>
                      {isLoading ? "Sending..." : "Continue with Email"}
                    </Button>
                  </div>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
              </div>
            ) : (
              <VerificationCodeInput
                onSubmit={handleVerificationSubmit}
                onCancel={() => setStep("email")}
                email={email}
                isLoading={isLoading}
              />
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>
                By continuing, you agree to our{" "}
                <a
                  href="#"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
