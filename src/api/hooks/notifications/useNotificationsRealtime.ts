"use client";

import { baseUrl } from "@/api/endpoints";
import { listOfQueryKeys } from "@/lib/functions/listOfQueryKeys";
import { useAuthStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socketUrl = baseUrl || "http://localhost:4000";
const notificationEvents = ["notification", "notification:created", "notification:removed", "notification:new", "notifications:created", "notifications:new"];
const invitationEvents = ["trip:invite-created", "trip:invitation", "trip:invited", "invite:created", "invite:new"];

/** Keeps the notification cache in sync when the API emits a user notification. */
export const useNotificationsRealtime = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userId = useAuthStore((state) => state.user?.id);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    const socket = io(socketUrl, { transports: ["websocket", "polling"], withCredentials: true });
    const refreshNotifications = () => {
      queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.notifications.list] });
      queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.trips.pendingInvites] });
    };

    socket.on("connect", () => {
      // Servers that authenticate the socket can ignore this; it supports user-room based gateways too.
      socket.emit("notifications:join", { userId });
      socket.emit("notification:join", { userId });
    });
    notificationEvents.forEach((event) => socket.on(event, refreshNotifications));
    invitationEvents.forEach((event) => socket.on(event, refreshNotifications));

    return () => {
      socket.emit("notifications:leave", { userId });
      socket.emit("notification:leave", { userId });
      notificationEvents.forEach((event) => socket.off(event, refreshNotifications));
      invitationEvents.forEach((event) => socket.off(event, refreshNotifications));
      socket.disconnect();
    };
  }, [isAuthenticated, queryClient, userId]);
};
