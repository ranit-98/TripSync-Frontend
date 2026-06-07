export const listOfQueryKeys = {
  app: {
    hello: "app-hello",
  },
  auth: {
    register: "auth-register",
    login: "auth-login",
    refresh: "auth-refresh",
    logout: "auth-logout",
    me: "auth-me",
  },
  users: {
    me: "users-me",
    updateMe: "users-update-me",
    avatarUpload: "users-avatar-upload",
    changePassword: "users-change-password",
  },
  trips: {
    list: "trips-list",
    details: "trips-details",
    create: "trips-create",
    update: "trips-update",
    archive: "trips-archive",
    cover: "trips-cover",
    members: "trips-members",
    invite: "trips-invite",
    invites: "trips-invites",
  },
  itinerary: {
    details: "itinerary-details",
    days: "itinerary-days",
    activities: "itinerary-activities",
    reorder: "itinerary-reorder",
  },
  expenses: {
    list: "expenses-list",
    details: "expenses-details",
    settlements: "expenses-settlements",
    reminders: "expenses-reminders",
  },
  map: {
    locations: "map-locations",
    optimizeRoute: "map-optimize-route",
  },
  chat: {
    messages: "chat-messages",
    attachments: "chat-attachments",
  },
  gallery: {
    albums: "gallery-albums",
    album: "gallery-album",
    photos: "gallery-photos",
  },
  files: {
    folders: "files-folders",
    documents: "files-documents",
    download: "files-download",
  },
  notifications: {
    list: "notifications-list",
    read: "notifications-read",
    readAll: "notifications-read-all",
  },
  uploads: {
    sign: "uploads-sign",
  },
} as const;
