"use client";
import React, { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircleIcon } from "lucide-react";
import api from "@/lib/api";

type Payment = {
  id: number;
  amount: number;
  userId: number;
  appointmentId: number;
  paymentDate: string;
  paymentStatus: string;
  billingDetails: string;
};

const PaymentsPage: React.FC = () => {
  const { data: session } = useSession();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/payments/byUser/${session?.user?.id}`);
        setPayments(res?.data?.data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [session]);

  const initiatePayment = async (appointmentId: number) => {
    try {
      setLoading(true);
      const payload = {
        amount: 100,
        userId: session?.user?.id,
        appointmentId,
        billingDetails: "Billing details here",
      };

      const response = await api.post("/api/payments", payload);

      if (response?.data?.success) {
        toast.success("Payment processed successfully!");
        router.refresh(); // Refresh the page to fetch updated payments
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Payments</h2>
      <div className="space-y-4">
        {loading ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          payments?.map((payment: Payment) => (
            <Card key={payment?.id}>
              <CardHeader>
                <CardTitle>Payment #{payment?.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Label>Amount:</Label> ${payment?.amount}
                </div>
                <div>
                  <Label>Payment Date:</Label> {new Date(payment?.paymentDate).toLocaleDateString()}
                </div>
                <div>
                  <Label>Status:</Label> {payment?.paymentStatus}
                </div>
                <div>
                  <Label>Billing Details:</Label> {payment?.billingDetails}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <Button className="mt-6" onClick={() => initiatePayment(1)} disabled={loading}>
        {loading ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          "Initiate Payment"
        )}
      </Button>
    </div>
  );
};

export default PaymentsPage;