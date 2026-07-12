const trimTrailingSlash = (value = "") => value.replace(/\/+$/, "");
const trimSlashes = (value = "") => value.replace(/^\/+|\/+$/g, "");

export const baseUrl = trimTrailingSlash(process.env.NEXT_PUBLIC_BASE_URL ?? process.env.NEXT_APP_BASE_URL ?? "");
export const frontUrl = trimTrailingSlash(
  process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ?? process.env.NEXT_APP_FRONTEND_BASE_URL ?? ""
);
export const baseUrlApi = baseUrl ? `${baseUrl}/api/` : "/api/";
export const baseUrlMedia = trimTrailingSlash(
  process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? process.env.NEXT_APP_MEDIA_BASE_URL ?? ""
);
export const clientSideUrl = trimTrailingSlash(
  process.env.NEXT_PUBLIC_CLIENT_SIDE_BASE_URL ?? process.env.NEXT_APP_CLIENT_SIDE_BASE_URL ?? ""
);
export const cmsSideUrl = trimTrailingSlash(
  process.env.NEXT_PUBLIC_CMS_SIDE_BASE_URL ?? process.env.NEXT_APP_CMS_SIDE_BASE_URL ?? ""
);

export const mediaUrl = (url: string) => {
  const cleanUrl = trimSlashes(url);

  return baseUrlMedia ? `${baseUrlMedia}/${cleanUrl}` : cleanUrl;
};

export type TAPIVersions = "v1";

export const endpoints = {
  dashboard: {
    overview: (version: TAPIVersions, period: "month" | "quarter" | "half-year" | "year") => `${version}/dashboard?period=${period}`,
  },
  app: {
    hello: (version: TAPIVersions) => {
      return `${version}`;
    },
  },
  auth: {
    register: (version: TAPIVersions) => {
      return `${version}/auth/register`;
    },
    login: (version: TAPIVersions) => {
      return `${version}/auth/login`;
    },
    refresh: (version: TAPIVersions) => {
      return `${version}/auth/refresh`;
    },
    logout: (version: TAPIVersions) => {
      return `${version}/auth/logout`;
    },
    me: (version: TAPIVersions) => {
      return `${version}/auth/me`;
    },
  },
  users: {
    search: (version: TAPIVersions, query: string) => {
      return `${version}/users/search?q=${encodeURIComponent(query)}`;
    },
    me: (version: TAPIVersions) => {
      return `${version}/users/me`;
    },
    travelStats: (version: TAPIVersions) => {
      return `${version}/users/me/travel-stats`;
    },
    avatarUpload: (version: TAPIVersions) => {
      return `${version}/users/me/avatar`;
    },
    changePassword: (version: TAPIVersions) => {
      return `${version}/users/me/password`;
    },
  },
  trips: {
    list: (version: TAPIVersions, { page = 1, limit = 20 }: { page?: number; limit?: number } = {}) => {
      return `${version}/trips?page=${page}&limit=${limit}`;
    },
    create: (version: TAPIVersions) => {
      return `${version}/trips`;
    },
    details: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}`;
    },
    update: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}`;
    },
    archive: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}`;
    },
    uploadCover: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/cover`;
    },
    members: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/members`;
    },
    invite: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/invites`;
    },
    pendingInvites: (version: TAPIVersions) => {
      return `${version}/invites`;
    },
    updateMember: (version: TAPIVersions, tripId: string, memberId: string) => {
      return `${version}/trips/${tripId}/members/${memberId}`;
    },
    removeMember: (version: TAPIVersions, tripId: string, memberId: string) => {
      return `${version}/trips/${tripId}/members/${memberId}`;
    },
    acceptInvite: (version: TAPIVersions, inviteId: string) => {
      return `${version}/invites/${inviteId}/accept`;
    },
    declineInvite: (version: TAPIVersions, inviteId: string) => {
      return `${version}/invites/${inviteId}/decline`;
    },
  },
  itinerary: {
    get: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/itinerary`;
    },
    createDay: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/days`;
    },
    updateDay: (version: TAPIVersions, tripId: string, dayId: string) => {
      return `${version}/trips/${tripId}/days/${dayId}`;
    },
    deleteDay: (version: TAPIVersions, tripId: string, dayId: string) => {
      return `${version}/trips/${tripId}/days/${dayId}`;
    },
    createActivity: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/activities`;
    },
    reorderActivities: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/activities/reorder`;
    },
    updateActivity: (version: TAPIVersions, tripId: string, activityId: string) => {
      return `${version}/trips/${tripId}/activities/${activityId}`;
    },
    deleteActivity: (version: TAPIVersions, tripId: string, activityId: string) => {
      return `${version}/trips/${tripId}/activities/${activityId}`;
    },
  },
  expenses: {
    list: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/expenses`;
    },
    create: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/expenses`;
    },
    details: (version: TAPIVersions, tripId: string, expenseId: string) => {
      return `${version}/trips/${tripId}/expenses/${expenseId}`;
    },
    update: (version: TAPIVersions, tripId: string, expenseId: string) => {
      return `${version}/trips/${tripId}/expenses/${expenseId}`;
    },
    delete: (version: TAPIVersions, tripId: string, expenseId: string) => {
      return `${version}/trips/${tripId}/expenses/${expenseId}`;
    },
    settlements: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/settlements`;
    },
    markSettlementPaid: (version: TAPIVersions, tripId: string, settlementId: string) => {
      return `${version}/trips/${tripId}/settlements/${settlementId}/declare-paid`;
    },
    confirmSettlementPaid: (version: TAPIVersions, tripId: string, settlementId: string) =>
      `${version}/trips/${tripId}/settlements/${settlementId}/confirm-paid`,
    sendSettlementReminders: (version: TAPIVersions, tripId: string, settlementId: string) => `${version}/trips/${tripId}/settlements/${settlementId}/reminder`,
    createRazorpayOrder: (version: TAPIVersions, tripId: string, settlementId: string) =>
      `${version}/trips/${tripId}/settlements/${settlementId}/razorpay/order`,
    verifyRazorpayPayment: (version: TAPIVersions, tripId: string, settlementId: string) =>
      `${version}/trips/${tripId}/settlements/${settlementId}/razorpay/verify`,
  },
  map: {
    locations: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/locations`;
    },
    createLocation: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/locations`;
    },
    updateLocation: (version: TAPIVersions, tripId: string, locationId: string) => {
      return `${version}/trips/${tripId}/locations/${locationId}`;
    },
    deleteLocation: (version: TAPIVersions, tripId: string, locationId: string) => {
      return `${version}/trips/${tripId}/locations/${locationId}`;
    },
    optimizeRoute: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/routes/optimize`;
    },
  },
  chat: {
    history: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/messages`;
    },
    send: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/messages`;
    },
    attach: (version: TAPIVersions, tripId: string, messageId: string) => {
      return `${version}/trips/${tripId}/messages/${messageId}/attachments`;
    },
    delete: (version: TAPIVersions, tripId: string, messageId: string) => {
      return `${version}/trips/${tripId}/messages/${messageId}`;
    },
  },
  gallery: {
    albums: (version: TAPIVersions) => {
      return `${version}/albums`;
    },
    album: (version: TAPIVersions, tripId: string) => {
      return `${version}/albums/${tripId}`;
    },
    photos: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/photos`;
    },
    createPhoto: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/photos`;
    },
    updatePhoto: (version: TAPIVersions, tripId: string, photoId: string) => {
      return `${version}/trips/${tripId}/photos/${photoId}`;
    },
    deletePhoto: (version: TAPIVersions, tripId: string, photoId: string) => {
      return `${version}/trips/${tripId}/photos/${photoId}`;
    },
  },
  files: {
    folders: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/folders`;
    },
    createFolder: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/folders`;
    },
    updateFolder: (version: TAPIVersions, tripId: string, folderId: string) => {
      return `${version}/trips/${tripId}/folders/${folderId}`;
    },
    deleteFolder: (version: TAPIVersions, tripId: string, folderId: string) => {
      return `${version}/trips/${tripId}/folders/${folderId}`;
    },
    documents: (version: TAPIVersions, tripId: string, folderId: string) => {
      return `${version}/trips/${tripId}/folders/${folderId}/documents`;
    },
    createDocument: (version: TAPIVersions, tripId: string, folderId: string) => {
      return `${version}/trips/${tripId}/folders/${folderId}/documents`;
    },
    downloadDocument: (version: TAPIVersions, tripId: string, documentId: string) => {
      return `${version}/trips/${tripId}/documents/${documentId}/download`;
    },
    updateDocument: (version: TAPIVersions, tripId: string, documentId: string) => {
      return `${version}/trips/${tripId}/documents/${documentId}`;
    },
    deleteDocument: (version: TAPIVersions, tripId: string, documentId: string) => {
      return `${version}/trips/${tripId}/documents/${documentId}`;
    },
  },
  notifications: {
    list: (version: TAPIVersions) => {
      return `${version}/notifications`;
    },
    readAll: (version: TAPIVersions) => {
      return `${version}/notifications/read-all`;
    },
    read: (version: TAPIVersions, notificationId: string) => {
      return `${version}/notifications/${notificationId}/read`;
    },
    delete: (version: TAPIVersions, notificationId: string) => {
      return `${version}/notifications/${notificationId}`;
    },
  },
  uploads: {
    sign: (version: TAPIVersions, tripId: string) => {
      return `${version}/trips/${tripId}/uploads/sign`;
    },
  },
};

export const successNotificationEndPoints: string[] = [
  endpoints.auth.register("v1"),
  endpoints.auth.login("v1"),
  endpoints.auth.logout("v1"),
  endpoints.users.changePassword("v1"),
];
