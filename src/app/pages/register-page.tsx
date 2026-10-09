import { Link } from "react-router";
import { Store, Mail, Lock, User, Phone, MapPin, Upload, CheckCircle, UserCircle, IdCard } from "lucide-react";
import { useState } from "react";
import logo from "figma:asset/992e51a9268ff5106d57083d372c6962b2244f1b.png";

type UserRole = "customer" | "printShop";

export function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [idFileName, setIdFileName] = useState<string>("");
  const [userRole, setUserRole] = useState<UserRole>("customer");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleIdFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-secondary" />
          </div>
          <h2 className="text-3xl text-primary mb-4">Registration Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            {userRole === "customer" 
              ? "Your registration has been successfully submitted and is now waiting for verification. We will review your ID and notify you once your account is approved."
              : "Your registration has been successfully submitted and is now waiting for Super Admin approval."
            }
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Status:</strong> Pending Approval
            </p>
            <p className="text-xs text-yellow-700 mt-2">
              {userRole === "customer"
                ? "Your valid ID will be verified to ensure account authenticity. You will receive an email notification once approved."
                : "Your business documents will be reviewed. You will receive an email notification once your account has been approved by our Super Admin."
              }
            </p>
          </div>
          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-all"
            >
              Back to Home
            </Link>
            <Link
              to="/login"
              className="block w-full text-primary hover:underline"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary p-12 items-center justify-center relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center text-white">
          <img src={logo} alt="E-Printing System" className="w-80 h-auto mx-auto mb-8" />
          <h1 className="text-5xl mb-6">
            {userRole === "customer" ? "Print Made Easy!" : "Grow Your Business!"}
          </h1>
          <p className="text-xl text-white/90 max-w-md mx-auto mb-8">
            {userRole === "customer"
              ? "Order printing services from verified print shops across Calbayog City. Fast, reliable, and convenient."
              : "Join our network of trusted print shops and expand your customer base across Calbayog City."
            }
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-sm mx-auto">
            <h3 className="text-2xl mb-4">Benefits:</h3>
            {userRole === "customer" ? (
              <ul className="text-left space-y-2 text-white/90">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Browse multiple print shops
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Compare prices and services
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Track your orders in real-time
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Secure and verified transactions
                </li>
              </ul>
            ) : (
              <ul className="text-left space-y-2 text-white/90">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Reach more customers online
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Manage orders efficiently
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Track sales and performance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Secure payment processing
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <img src={logo} alt="E-Printing System" className="w-32 h-auto mx-auto" />
          </div>

          <div className="mb-8">
            <h2 className="text-4xl text-primary mb-2">Create Account</h2>
            <p className="text-muted-foreground">Choose your account type and register</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block mb-3 text-foreground">I want to register as:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserRole("customer")}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    userRole === "customer"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-white text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <UserCircle className="w-8 h-8 mx-auto mb-2" />
                  <span className="block text-sm">Customer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserRole("printShop")}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    userRole === "printShop"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-white text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <Store className="w-8 h-8 mx-auto mb-2" />
                  <span className="block text-sm">Print Shop Owner</span>
                </button>
              </div>
            </div>

            {/* Conditional Fields for Print Shop */}
            {userRole === "printShop" && (
              <div>
                <label htmlFor="shopName" className="block mb-2 text-foreground">
                  Print Shop Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Store className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="shopName"
                    placeholder="ABC Print Shop"
                    className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    required
                  />
                </div>
              </div>
            )}

            {/* Owner Name / Full Name */}
            <div>
              <label htmlFor="ownerName" className="block mb-2 text-foreground">
                {userRole === "printShop" ? "Owner Name" : "Full Name"}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="ownerName"
                  placeholder="Juan Dela Cruz"
                  className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-foreground">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block mb-2 text-foreground">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+63 912 345 6789"
                  className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Address - Show for Print Shop */}
            {userRole === "printShop" && (
              <div>
                <label htmlFor="address" className="block mb-2 text-foreground">
                  Shop Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <textarea
                    id="address"
                    placeholder="123 Main Street, Calbayog City"
                    rows={2}
                    className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    required
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-2 text-foreground">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-foreground">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Upload Valid ID - For Customers */}
            {userRole === "customer" && (
              <div className="pt-4 border-t border-border">
                <label className="block mb-2 text-foreground">
                  Upload Valid ID
                </label>
                <p className="text-xs text-muted-foreground mb-3">
                  Please upload a clear photo of your valid government-issued ID (Driver's License, Passport, National ID, etc.) to verify your account
                </p>
                <div className="relative">
                  <input
                    type="file"
                    id="idUpload"
                    accept="image/*,.pdf"
                    onChange={handleIdFileChange}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="idUpload"
                    className="flex items-center justify-center gap-3 w-full p-4 bg-input-background border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                  >
                    <IdCard className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {idFileName || "Click to upload valid ID"}
                    </span>
                  </label>
                </div>
                {idFileName && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>{idFileName}</span>
                  </div>
                )}
                <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    <strong>Note:</strong> Your ID will be used solely for account verification to prevent dummy accounts and ensure platform security. We respect your privacy.
                  </p>
                </div>
              </div>
            )}

            {/* Upload Section - Only for Print Shop */}
            {userRole === "printShop" && (
              <div className="pt-4 border-t border-border">
                <label className="block mb-2 text-foreground">
                  Upload Proof of Legitimacy
                </label>
                <p className="text-xs text-muted-foreground mb-3">
                  Please upload your business permit, DTI registration, or business card
                </p>
                <div className="relative">
                  <input
                    type="file"
                    id="proofUpload"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="proofUpload"
                    className="flex items-center justify-center gap-3 w-full p-4 bg-input-background border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                  >
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {fileName || "Click to upload file"}
                    </span>
                  </label>
                </div>
                {fileName && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>{fileName}</span>
                  </div>
                )}
              </div>
            )}

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                required
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>

            {/* Login Link */}
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign In
                </Link>
              </p>
              <Link to="/" className="block text-sm text-primary hover:underline">
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}