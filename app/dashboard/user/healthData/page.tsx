"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import api from "@/lib/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { LoaderCircleIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateTimePicker } from "@/components/ui/date-picker";

interface HealthData {
  goals: string;
  metrics: string;
}

const UserHealthData: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [healthData, setHealthData] = useState<HealthData>({ goals: "", metrics: "" });
  const [selectedDates, setSelectedDates] = useState<{ start: Date | undefined, end: Date | undefined }>({ start: undefined, end: undefined });

  useEffect(() => {
    if (!session) return;
    const fetchHealthData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/users/${session?.user?.id}/healthData`);
        if (res?.data?.success) {
          setHealthData(res?.data?.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHealthData();
  }, [session]);

  const updateHealthData = async () => {
    try {
      setLoading(true);
      const res = await api.patch(`/api/users/${session?.user?.id}/healthData`, healthData);
      if (res?.data?.success) {
        toast.success("Health data updated successfully!");
      }
    } catch (error) {
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

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Manage Your Health Data</h2>
      <Card>
        <CardHeader>
          <CardTitle>Health Metrics & Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="goals">Goals</Label>
            <Input
              id="goals"
              value={healthData?.goals}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHealthData({ ...healthData, goals: e?.target?.value })}
              placeholder="Update your health goals"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metrics">Metrics</Label>
            <Input
              id="metrics"
              value={healthData?.metrics}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHealthData({ ...healthData, metrics: e?.target?.value })}
              placeholder="Update your health metrics"
            />
          </div>
          <div className="space-y-2">
            <Label>Set Date Range</Label>
            <DateTimePicker
              date={selectedDates?.start}
              setDate={(date: Date | undefined) => setSelectedDates({ ...selectedDates, start: date })}
            />
            <DateTimePicker
              date={selectedDates?.end}
              setDate={(date: Date | undefined) => setSelectedDates({ ...selectedDates, end: date })}
            />
          </div>
          <Button className="w-full" onClick={updateHealthData}>
            {loading ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "Update Health Data"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserHealthData;