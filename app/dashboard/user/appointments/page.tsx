"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { isAxiosError } from "axios";
import api from "@/lib/api";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon, VideoIcon } from "lucide-react";

interface Appointment {
  id: string;
  slot: string;
  status: string;
  videoConferenceUrl?: string;
}

const AppointmentsPage: React.FC = () => {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!session) return;

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/users/${session.user?.id}/appointments`);
        if (res.data?.success) {
          setAppointments(res.data?.data);
        }
      } catch (error: any) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data?.message ?? "Something went wrong");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [session]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Your Medical Appointments</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <LoaderCircleIcon className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {appointments?.map((appointment) => (
            <Card key={appointment?.id} className="border rounded-lg">
              <CardHeader>
                <CardTitle>
                  Appointment on {new Date(appointment?.slot).toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>Status: {appointment?.status}</p>
                {appointment?.videoConferenceUrl && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(appointment?.videoConferenceUrl, "_blank")}
                  >
                    <VideoIcon className="mr-2" />
                    Join Video Conference
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;