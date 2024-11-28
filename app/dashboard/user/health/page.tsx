"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import axios, { isAxiosError } from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoaderCircleIcon } from "lucide-react";
import { DateTimePicker } from "@/components/ui/date-picker";

interface HealthData {
  goals: any;
  metrics: any;
}

const HealthDashboard: React.FC = () => {
  const { data: session } = useSession();
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${session?.user?.id}/healthData`);
        if (res.data?.success) {
          setHealthData(res.data?.data);
        }
      } catch (error: any) {
        if (isAxiosError(error)) {
          console.error(error.response?.data?.message ?? "Error fetching data");
        } else {
          console.error("Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchHealthData();
    }
  }, [session]);

  const updateHealthData = async () => {
    try {
      setUpdating(true);
      const res = await axios.patch(`/api/users/${session?.user?.id}/healthData`, healthData);
      if (res.data?.success) {
        toast.success("Health data updated successfully!");
        setHealthData(res.data?.data);
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Error updating data");
      } else {
        console.error("Error updating data");
      }
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Health Dashboard</h2>
      <Card>
        <CardHeader>
          <CardTitle>Your Health Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <LoaderCircleIcon className="animate-spin h-8 w-8" />
            </div>
          ) : (
            healthData && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="goals">Goals</Label>
                  <Input
                    id="goals"
                    value={healthData?.goals || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHealthData({ ...healthData, goals: e.target.value })}
                    placeholder="Your health goals"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metrics">Metrics</Label>
                  <Input
                    id="metrics"
                    value={healthData?.metrics || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHealthData({ ...healthData, metrics: e.target.value })}
                    placeholder="Your health metrics"
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={updateHealthData}
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <LoaderCircleIcon className="animate-spin w-4 h-4 mr-2" />
                      Updating...
                    </>
                  ) : (
                    "Update Health Data"
                  )}
                </Button>
              </>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthDashboard;