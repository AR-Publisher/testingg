"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Banknote, CreditCard, DollarSign } from "lucide-react";

interface Payout {
  id: string;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED";
  createdAt: string;
}

type PaymentMethod = "paypal" | "stripe" | "bank" | "";

const PayoutsPage = () => {
  const [earnings, setEarnings] = useState<number>(0);
  const [pendingPayouts, setPendingPayouts] = useState<number>(0);
  const [completedPayouts, setCompletedPayouts] = useState<number>(0);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [stripeEmail, setStripeEmail] = useState("");
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    routingNumber: "",
    bankName: "",
    accountHolderName: "",
  });

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        const response = await axios.get(`/api/creator/payouts`);
        if (response.data) {
          setEarnings(response.data.totalEarnings || 0);
          setPendingPayouts(response.data.pendingPayouts || 0);
          setCompletedPayouts(response.data.completedPayouts || 0);
          setPayouts(response.data.payouts || []);
        }
      } catch (error) {
        toast.error("Failed to load payouts.");
      } finally {
        setLoading(false);
      }
    };
    fetchPayouts();
  }, []);

  const requestPayout = async () => {
    let payoutData;
    if (paymentMethod === "paypal") {
      if (!paypalEmail) return toast.error("Please enter your PayPal email.");
      payoutData = { method: paymentMethod, email: paypalEmail };
    } else if (paymentMethod === "stripe") {
      if (!stripeEmail) return toast.error("Please enter your Stripe email.");
      payoutData = { method: paymentMethod, email: stripeEmail };
    } else if (paymentMethod === "bank") {
      if (
        !bankDetails.accountNumber ||
        !bankDetails.routingNumber ||
        !bankDetails.bankName ||
        !bankDetails.accountHolderName
      ) {
        return toast.error("Please fill in all bank details.");
      }
      payoutData = { method: paymentMethod, details: bankDetails };
    } else {
      return toast.error("Please select a payment method.");
    }

    setRequesting(true);
    try {
      await axios.post("/api/creator/payouts/request", payoutData);
      toast.success("✅ Payout request submitted!");
    } catch (error) {
      toast.error("❌ Failed to request payout.");
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Earnings & Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Earnings", value: earnings, color: "green" },
              { label: "Pending Payouts", value: pendingPayouts, color: "yellow" },
              { label: "Completed Payouts", value: completedPayouts, color: "blue" },
            ].map(({ label, value, color }) => (
              <div key={label} className={`p-4 bg-${color}-100 rounded-lg text-center`}>
                <h2 className="text-lg font-semibold">{label}</h2>
                {loading ? (
                  <Loader2 className="animate-spin mx-auto my-2 text-gray-500" />
                ) : (
                  <p className={`text-4xl font-bold text-${color}-600`}>${value.toFixed(2)}</p>
                )}
              </div>
            ))}
          </div>

          {/* Payment Method Selection */}
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-2">Select Payment Method:</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { method: "paypal", icon: CreditCard, label: "PayPal" },
                { method: "stripe", icon: Banknote, label: "Stripe" },
                { method: "bank", icon: DollarSign, label: "Bank Transfer" },
              ].map(({ method, icon: Icon, label }) => (
                <button
                  key={method}
                  className={`border p-3 rounded-lg flex flex-col items-center justify-center ${
                    paymentMethod === method ? "border-black shadow-lg" : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod(method as PaymentMethod)}
                >
                  <Icon className="w-6 h-6 text-gray-600" />
                  <span className="text-sm mt-1 capitalize">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          {paymentMethod && (
            <div className="mt-4">
              {paymentMethod === "paypal" && (
                <Input
                  placeholder="PayPal Email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                />
              )}
              {paymentMethod === "stripe" && (
                <Input
                  placeholder="Stripe Email"
                  value={stripeEmail}
                  onChange={(e) => setStripeEmail(e.target.value)}
                />
              )}
              {paymentMethod === "bank" &&
                Object.entries(bankDetails).map(([key, value]) => (
                  <Input
                    key={key}
                    placeholder={key.replace(/([A-Z])/g, " $1")}
                    value={value}
                    onChange={(e) =>
                      setBankDetails((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                  />
                ))}
            </div>
          )}

          <Button
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
            onClick={requestPayout}
            disabled={requesting || !paymentMethod}
          >
            {requesting ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : "Request Payout"}
          </Button>
        </CardContent>
      </Card>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Tax Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Ensure your tax details are up-to-date. You can download your tax reports and
              earnings summary for compliance purposes.
            </p>
            <Button className="mt-4">Download Tax Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
    
  );
};

export default PayoutsPage;
