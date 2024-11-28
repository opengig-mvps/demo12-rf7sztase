"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { LoaderCircleIcon, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";

const MessagingPage: React.FC = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [newDiscussion, setNewDiscussion] = useState<string>("");
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
  const [loadingDiscussions, setLoadingDiscussions] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (!session) return;
    const fetchMessages = async () => {
      try {
        setLoadingMessages(true);
        const res = await api.get(`/api/users/${session?.user?.id}/messages`);
        setMessages(res.data?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMessages(false);
      }
    };

    const fetchDiscussions = async () => {
      try {
        setLoadingDiscussions(true);
        const res = await api.get(`/api/users/${session?.user?.id}/group-discussions`);
        setDiscussions(res.data?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingDiscussions(false);
      }
    };

    fetchMessages();
    fetchDiscussions();
  }, [session]);

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      toast.error("Message content is required!");
      return;
    }
    try {
      setSending(true);
      const res = await api.post(`/api/users/${session?.user?.id}/messages`, {
        content: newMessage,
        attachments: {},
      });
      if (res.data?.success) {
        toast.success("Message sent successfully!");
        setMessages([...messages, res.data?.data]);
        setNewMessage("");
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setSending(false);
    }
  };

  const createDiscussion = async () => {
    if (!newDiscussion.trim()) {
      toast.error("Discussion content is required!");
      return;
    }
    try {
      setSending(true);
      const res = await api.post(`/api/users/${session?.user?.id}/group-discussions`, {
        content: newDiscussion,
        attachments: {},
      });
      if (res.data?.success) {
        toast.success("Group discussion created successfully!");
        setDiscussions([...discussions, res.data?.data]);
        setNewDiscussion("");
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {loadingMessages ? (
              <div className="flex justify-center items-center">
                <LoaderCircleIcon className="animate-spin" />
              </div>
            ) : (
              messages?.map((message: any) => (
                <div key={message?.id} className="p-4 border rounded-lg">
                  <p>{message?.content}</p>
                </div>
              ))
            )}
          </div>
          <div className="space-y-2">
            <Textarea
              value={newMessage}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <Button onClick={sendMessage} disabled={sending} className="w-full">
              {sending ? (
                <>
                  <LoaderCircleIcon className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Plus className="mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Group Discussions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {loadingDiscussions ? (
              <div className="flex justify-center items-center">
                <LoaderCircleIcon className="animate-spin" />
              </div>
            ) : (
              discussions?.map((discussion: any) => (
                <div key={discussion?.id} className="p-4 border rounded-lg">
                  <p>{discussion?.content}</p>
                </div>
              ))
            )}
          </div>
          <div className="space-y-2">
            <Textarea
              value={newDiscussion}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewDiscussion(e.target.value)}
              placeholder="Start a new discussion..."
            />
            <Button onClick={createDiscussion} disabled={sending} className="w-full">
              {sending ? (
                <>
                  <LoaderCircleIcon className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2" />
                  Start Discussion
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagingPage;