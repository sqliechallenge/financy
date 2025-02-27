import React, { useState, useEffect } from "react";
import LoginPage from "./LoginPage";

interface AuthWrapperProps {
  children?: React.ReactNode;
  onLogin?: (email: string) => void;
  onLogout?: () => void;
  isAuthenticated?: boolean;
  isLoading?: boolean;
}

const AuthWrapper = ({
  children,
  onLogin = () => {},
  onLogout = () => {},
  isAuthenticated = false,
  isLoading = false,
}: AuthWrapperProps) => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    isLoading: boolean;
  }>({
    isAuthenticated,
    isLoading,
  });

  useEffect(() => {
    setAuthState({
      isAuthenticated,
      isLoading,
    });
  }, [isAuthenticated, isLoading]);

  const handleLogin = (email: string) => {
    // Set loading state while authentication is in progress
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    // Call the provided login handler
    onLogin(email);
  };

  const handleLogout = () => {
    // Call the provided logout handler
    onLogout();

    // Update local state
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
    });
  };

  // Show loading state if authentication is in progress
  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not authenticated, show login page
  if (!authState.isAuthenticated) {
    return <LoginPage onSubmit={handleLogin} isLoading={authState.isLoading} />;
  }

  // If authenticated, show children content
  return <div className="min-h-screen bg-gray-50">{children}</div>;
};

export default AuthWrapper;
