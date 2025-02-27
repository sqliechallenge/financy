import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface VerificationCodeInputProps {
  onSubmit: (code: string) => void;
  onCancel: () => void;
  email: string;
  isLoading?: boolean;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  onSubmit,
  onCancel,
  email,
  isLoading = false,
}) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setCode(value);
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    onSubmit(code);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4 bg-muted/50">
        <p className="text-sm">
          We've sent a 6-digit verification code to <strong>{email}</strong>.
          Enter the code below to sign in.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="verification-code" className="text-sm font-medium">
            Verification Code
          </label>
          <Input
            id="verification-code"
            ref={inputRef}
            type="text"
            inputMode="numeric"
            placeholder="123456"
            value={code}
            onChange={handleChange}
            className="text-center text-xl tracking-widest"
            maxLength={6}
            disabled={isLoading}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="flex flex-col space-y-2">
          <Button type="submit" disabled={isLoading || code.length !== 6}>
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationCodeInput;
