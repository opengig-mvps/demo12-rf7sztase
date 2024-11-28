"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/date-picker";
import { LoaderCircleIcon } from 'lucide-react';

const AccessibilityPage: React.FC = () => {
  const { data: session } = useSession();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="flex-1 p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-4">Accessibility & Responsiveness</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Accessibility Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="setting1">Setting 1</Label>
              <Input {...register("setting1")} placeholder="Enter setting 1" />
              {errors?.setting1 && (
                <p className="text-red-500 text-sm">{String(errors?.setting1?.message)}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="setting2">Setting 2</Label>
              <Textarea
                {...register("setting2")}
                placeholder="Enter setting 2"
              />
              {errors?.setting2 && (
                <p className="text-red-500 text-sm">{String(errors?.setting2?.message)}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Date and Time</Label>
              <DateTimePicker
                date={new Date()}
                setDate={(date: any) => console.log(date)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : "Save Settings"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AccessibilityPage;