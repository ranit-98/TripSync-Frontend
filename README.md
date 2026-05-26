# TripSync

TripSync is a collaborative trip-planning app for creating trips, building shared itineraries, tracking expenses, chatting with members, storing trip documents, and collecting photo albums.

The current frontend is built with Next.js, TypeScript, MUI, React Hook Form, and Yup. Most screens are currently UI-first with mocked data and console-submit handlers, so this README describes the intended product flow and the backend/API shape needed to make it production-ready.

## Roles

TripSync has two trip-level member roles.

### Collaborator

Collaborators can do everything inside a trip:

- View trip details
- Edit trip details, dates, budget, style, cover photo
- Add, update, reorder, and delete itinerary activities
- Invite members
- Add expenses
- Update settlement status
- Send reminders
- Upload gallery photos
- Create document folders
- Upload documents
- Send chat messages
- View all shared content

### Viewer

Viewers can only view trip information:

- View trip details
- View itinerary
- View expenses and settlements
- View map
- View chat history
- View gallery
- View document folders and files

Viewers cannot create, edit, upload, delete, invite, settle, or send messages.

## Current App Flow

### Authentication

Route:

- `/`

Expected flow:

1. User logs in.
2. Backend returns access token, refresh token, and user profile.
3. User is redirected to `/dashboard`.

Recommended additions:

- Signup
- Forgot password
- Refresh token handling
- Auth guard for protected routes

### Dashboard

Route:

- `/dashboard`

Purpose:

- Gives a high-level overview of trips, upcoming plans, and recent itineraries.
- Clicking a trip opens its detail workspace.
- Notification icon opens `/notifications`.
- Sidebar `New Trip` opens `/trips/create`.

Primary actions:

- Open trip
- Search trips
- View notifications
- Start new trip

### Trip List

Route:

- `/trips`

Purpose:

- Shows all trips first before entering a trip detail page.
- This is the correct landing page for `My Trips`.

Primary actions:

- Open a trip workspace
- Create new trip
- Search/filter trips later

Trip detail routes:

- `/trips/:tripId/itinerary`
- `/trips/:tripId/expenses`
- `/trips/:tripId/map`
- `/trips/:tripId/chat`
- `/trips/:tripId/gallery`
- `/trips/:tripId/files`

Old compatibility routes currently redirect:

- `/trips/itinerary`
- `/trips/expenses`
- `/trips/map`
- `/trips/chat`

### Create Trip

Route:

- `/trips/create`

Current form uses React Hook Form + Yup.

Flow:

1. Step 1: trip title, destination, start date, end date, optional cover photo.
2. Step 2: currency, budget, trip styles.
3. Step 3: invite member email, member role, notes.
4. Submit currently logs `Create trip payload`.

Backend behavior:

- Create trip.
- Add creator as owner/collaborator.
- Optionally create invite record for entered email.
- Store uploaded cover image in object storage.

### Trip Workspace

Main component:

- `src/components/trips/TripWorkspacePage.tsx`

The file is now only the workspace shell. Tabs and modals live under:

- `src/components/trips/workspace/`
- `src/components/trips/workspace/tabs/`

Workspace tabs:

- Itinerary
- Expenses
- Map
- Chat
- Gallery
- Files

### Itinerary

Route:

- `/trips/:tripId/itinerary`

Purpose:

- Shows trip days and activities.
- Collaborators should be able to add/edit/delete activities.
- Viewers can only read.

Future behavior:

- Drag reorder activities.
- Expand/collapse days.
- Assign activities to members.
- Link activities to locations and expenses.

### Expenses

Route:

- `/trips/:tripId/expenses`

Purpose:

- Shows budget utilization, expense table, settlement summary, and spending insight.

Current add-expense modal:

- Description
- Category
- Amount
- Paid by
- Date
- Split with members
- Notes

Submit currently logs:

- `Add expense payload`

Permissions:

- Collaborator: add/edit/delete expense, mark settled, send reminders.
- Viewer: view only.

### Map

Route:

- `/trips/:tripId/map`

Purpose:

- Shows route/stops for the trip.

Future behavior:

- Persist map locations.
- Optimize route.
- Add/remove stops.
- Link map stops to itinerary activities.

Permissions:

- Collaborator: update route/stops.
- Viewer: view only.

### Chat

Route:

- `/trips/:tripId/chat`

Purpose:

- Group chat for trip members.

Permissions:

- Collaborator: send messages and attachments.
- Viewer: read chat only.

Suggested behavior:

- Use WebSocket or Socket.IO for realtime messages.
- Persist messages in database.
- Store attachments in object storage.

### Gallery

Routes:

- `/trips/:tripId/gallery`
- `/albums/:tripId`

Purpose:

- Direct trip-level gallery inside the workspace.
- Album section for browsing galleries by trip.

Current add-photo modal:

- Photo upload: optional
- Caption: optional

Submit currently logs:

- `Add photo payload`

Permissions:

- Collaborator: upload photos and captions.
- Viewer: view only.

### Files

Route:

- `/trips/:tripId/files`

Purpose:

- Store trip folders and documents such as bills, booking proofs, IDs, insurance, and other shared files.

Current folder modal:

- Folder name
- Short description

Current document modal:

- Document file
- Display name

The document list intentionally shows only:

- Document display name
- Document type
- Original file name

Permissions:

- Collaborator: create folders and upload documents.
- Viewer: view/download only.

### Albums

Routes:

- `/albums`
- `/albums/:tripId`

Purpose:

- Sidebar `Album` replaces `Explore`.
- `/albums` lists trip albums.
- Clicking a trip album opens that trip gallery.

Permissions:

- Collaborator: upload photos.
- Viewer: view only.

### Notifications

Route:

- `/notifications`

Purpose:

- Shows invites, itinerary updates, expense updates, files, and other activity.

Expected behavior:

- Mark all read.
- Accept/decline invites.
- Link notifications to their source trip/resource.

### Settings

Route:

- `/settings`

Purpose:

- Profile and app settings.

Expected behavior:

- Update profile
- Notification preferences
- Security settings

### Admin Dashboard

Route:

- `/admin/dashboard`

Purpose:

- Admin overview.

Suggested additions:

- User management
- Trip moderation
- Storage usage
- Platform metrics

## Suggested API Design

Use REST for standard CRUD and WebSocket for chat/live updates. The list below assumes `/api/v1`.

### Auth APIs

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/auth/register` | Create account |
| POST | `/auth/login` | Login |
| POST | `/auth/logout` | Logout |
| POST | `/auth/refresh` | Refresh access token |
| GET | `/auth/me` | Current user profile |
| PATCH | `/users/me` | Update profile |
| PATCH | `/users/me/password` | Change password |

### Trip APIs

| Method | Endpoint | Permission | Purpose |
| --- | --- | --- | --- |
| GET | `/trips` | Authenticated | List user trips |
| POST | `/trips` | Authenticated | Create trip |
| GET | `/trips/:tripId` | Member | Get trip details |
| PATCH | `/trips/:tripId` | Collaborator | Update trip |
| DELETE | `/trips/:tripId` | Owner/Admin | Delete/archive trip |
| POST | `/trips/:tripId/cover` | Collaborator | Upload cover photo |

### Member and Invite APIs

| Method | Endpoint | Permission | Purpose |
| --- | --- | --- | --- |
| GET | `/trips/:tripId/members` | Member | List members |
| POST | `/trips/:tripId/invites` | Collaborator | Invite member |
| PATCH | `/trips/:tripId/members/:memberId` | Owner/Admin | Change role |
| DELETE | `/trips/:tripId/members/:memberId` | Owner/Admin | Remove member |
| POST | `/invites/:inviteId/accept` | Invitee | Accept invite |
| POST | `/invites/:inviteId/decline` | Invitee | Decline invite |

### Itinerary APIs

| Method | Endpoint | Permission | Purpose |
| --- | --- | --- | --- |
| GET | `/trips/:tripId/itinerary` | Member | Get itinerary days and activities |
| POST | `/trips/:tripId/days` | Collaborator | Add itinerary day |
| PATCH | `/trips/:tripId/days/:dayId` | Collaborator | Update day |
| DELETE | `/trips/:tripId/days/:dayId` | Collaborator | Delete day |
| POST | `/trips/:tripId/activities` | Collaborator | Add activity |
| PATCH | `/trips/:tripId/activities/:activityId` | Collaborator | Update activity |
| DELETE | `/trips/:tripId/activities/:activityId` | Collaborator | Delete activity |
| PATCH | `/trips/:tripId/activities/reorder` | Collaborator | Reorder activities |

### Expense APIs

| Method | Endpoint | Permission | Purpose |
| --- | --- | --- | --- |
| GET | `/trips/:tripId/expenses` | Member | List expenses |
| POST | `/trips/:tripId/expenses` | Collaborator | Add expense |
| GET | `/trips/:tripId/expenses/:expenseId` | Member | Get expense |
| PATCH | `/trips/:tripId/expenses/:expenseId` | Collaborator | Update expense |
| DELETE | `/trips/:tripId/expenses/:expenseId` | Collaborator | Delete expense |
| GET | `/trips/:tripId/settlements` | Member | Settlement summary |
| POST | `/trips/:tripId/settlements/:settlementId/mark-paid` | Collaborator | Mark settled |
| POST | `/trips/:tripId/settlements/reminders` | Collaborator | Send reminders |

### Map APIs

| Method | Endpoint | Permission | Purpose |
| --- | --- | --- | --- |
| GET | `/trips/:tripId/locations` | Member | List map stops |
| POST | `/trips/:tripId/locations` | Collaborator | Add map stop |
| PATCH | `/trips/:tripId/locations/:locationId` | Collaborator | Update map stop |
| DELETE | `/trips/:tripId/locations/:locationId` | Collaborator | Delete map stop |
| POST | `/trips/:tripId/routes/optimize` | Collaborator | Optimize route |

### Chat APIs

| Method | Endpoint | Permission | Purpose |
| --- | --- | --- | --- |
| GET | `/trips/:tripId/messages` | Member | Chat history |
| POST | `/trips/:tripId/messages` | Collaborator | Send message |
| POST | `/trips/:tripId/messages/:messageId/attachments` | Collaborator | Upload attachment |
| DELETE | `/trips/:tripId/messages/:messageId` | Author/Admin | Delete message |

Realtime channel:

- `trip:{tripId}:messages`
- `trip:{tripId}:activity`
- `trip:{tripId}:presence`

### Gallery APIs

| Method | Endpoint | Permission | Purpose |
| --- | --- | --- | --- |
| GET | `/trips/:tripId/photos` | Member | List gallery photos |
| POST | `/trips/:tripId/photos` | Collaborator | Upload photo(s), optional caption |
| PATCH | `/trips/:tripId/photos/:photoId` | Collaborator | Update caption |
| DELETE | `/trips/:tripId/photos/:photoId` | Collaborator | Delete photo |
| GET | `/albums` | Authenticated | List trip albums |
| GET | `/albums/:tripId` | Member | Album detail |

### File APIs

| Method | Endpoint | Permission | Purpose |
| --- | --- | --- | --- |
| GET | `/trips/:tripId/folders` | Member | List folders |
| POST | `/trips/:tripId/folders` | Collaborator | Create folder |
| PATCH | `/trips/:tripId/folders/:folderId` | Collaborator | Rename/update folder |
| DELETE | `/trips/:tripId/folders/:folderId` | Collaborator | Delete folder |
| GET | `/trips/:tripId/folders/:folderId/documents` | Member | List documents |
| POST | `/trips/:tripId/folders/:folderId/documents` | Collaborator | Upload document with display name |
| GET | `/trips/:tripId/documents/:documentId/download` | Member | Download document |
| PATCH | `/trips/:tripId/documents/:documentId` | Collaborator | Rename document |
| DELETE | `/trips/:tripId/documents/:documentId` | Collaborator | Delete document |

### Notification APIs

| Method | Endpoint | Permission | Purpose |
| --- | --- | --- | --- |
| GET | `/notifications` | Authenticated | List notifications |
| PATCH | `/notifications/:notificationId/read` | Owner | Mark one read |
| PATCH | `/notifications/read-all` | Owner | Mark all read |
| DELETE | `/notifications/:notificationId` | Owner | Delete notification |

## Authorization Rules

Every trip-scoped API should verify:

1. User is authenticated.
2. User is a member of the trip.
3. User role allows the action.

Suggested middleware:

- `requireAuth`
- `requireTripMember`
- `requireTripRole(['collaborator'])`
- `requireTripOwnerOrAdmin`

Viewer-blocked actions:

- `POST`, `PATCH`, `DELETE` on trip resources
- Upload photo/document/cover
- Send chat messages
- Invite members
- Mark settlements
- Send reminders

## Database Recommendation

### Recommended: PostgreSQL + Object Storage

I recommend PostgreSQL as the primary database for TripSync.

Why:

- TripSync has strongly related data: users, trips, members, roles, itinerary days, activities, expenses, splits, settlements, folders, documents, photos, messages.
- Permissions depend on relational membership and role checks.
- Expenses and settlements benefit from transactions and consistency.
- SQL queries are useful for reports: total trip budget, balances, member expenses, unread counts, document counts.

Use object storage for binary files:

- S3
- Cloudflare R2
- GCP Cloud Storage
- Azure Blob Storage

Store only metadata in PostgreSQL:

- object key
- URL
- file name
- MIME type
- size
- uploaded by
- folder/photo relation

### Suggested PostgreSQL Tables

Core:

- `users`
- `trips`
- `trip_members`
- `trip_invites`

Itinerary:

- `trip_days`
- `activities`
- `activity_assignees`
- `locations`

Expenses:

- `expenses`
- `expense_splits`
- `settlements`

Chat:

- `messages`
- `message_attachments`

Files:

- `document_folders`
- `documents`

Gallery:

- `photos`

Notifications:

- `notifications`

Audit:

- `activity_logs`

### Minimal Relational Shape

```text
users
  id
  name
  email
  avatar_url
  password_hash
  created_at

trips
  id
  owner_id
  title
  destination
  start_date
  end_date
  currency
  budget
  cover_url
  status
  created_at

trip_members
  id
  trip_id
  user_id
  role            collaborator | viewer
  joined_at

trip_invites
  id
  trip_id
  email
  role
  status          pending | accepted | declined | expired
  invited_by

expenses
  id
  trip_id
  description
  category
  amount
  currency
  paid_by_user_id
  expense_date
  notes

expense_splits
  id
  expense_id
  user_id
  amount

document_folders
  id
  trip_id
  name
  description
  created_by

documents
  id
  folder_id
  trip_id
  display_name
  original_file_name
  object_key
  mime_type
  size
  uploaded_by

photos
  id
  trip_id
  caption
  object_key
  original_file_name
  mime_type
  size
  uploaded_by

messages
  id
  trip_id
  sender_id
  body
  created_at

notifications
  id
  user_id
  trip_id
  type
  title
  body
  resource_type
  resource_id
  read_at
  created_at
```

### When MongoDB Makes Sense

MongoDB can work if the backend is expected to remain MERN-first and you want faster iteration with flexible nested trip documents.

Good MongoDB fits:

- Activity feed documents
- Chat messages
- Notifications
- Draft trip creation payloads
- Flexible itinerary metadata

Tradeoffs:

- Expense settlement calculations become more careful.
- Role-based relational joins require extra application logic.
- Data consistency across splits, settlements, and members is easier in SQL.

### Hybrid Suggestion

Best practical setup:

- PostgreSQL for core business data and permissions.
- Object storage for files/photos.
- Redis for sessions, cache, realtime presence, and rate limiting.
- Optional MongoDB only for activity logs/chat if you strongly prefer document storage there.

For this app, I would start with PostgreSQL + Prisma or Drizzle, plus S3/R2 for uploads.

## Upload Strategy

Recommended upload flow:

1. Client requests a signed upload URL.
2. Backend verifies user is a collaborator.
3. Backend returns signed URL and object key.
4. Client uploads directly to object storage.
5. Client calls metadata API to create `photos` or `documents` row.

Example:

```text
POST /trips/:tripId/uploads/sign
body: { fileName, mimeType, target: "photo" | "document" }
```

Then:

```text
POST /trips/:tripId/photos
body: { objectKey, caption }

POST /trips/:tripId/folders/:folderId/documents
body: { objectKey, displayName }
```

## Frontend Permissions

The UI should hide or disable collaborator-only actions for viewers:

- New Trip can remain available globally.
- Inside trip workspace, viewers should not see:
  - Invite button
  - Add activity
  - Add expense
  - Mark settled
  - Send reminders
  - Chat composer
  - Add photos
  - New folder
  - Upload document
  - Edit/delete controls

Important: frontend hiding is not enough. Backend must enforce permissions on every mutation.

## Suggested Next Steps

1. Add authentication and protected routes.
2. Add backend API project or Next.js route handlers.
3. Implement PostgreSQL schema with Prisma/Drizzle migrations.
4. Add trip membership middleware.
5. Replace mocked JSON with API calls.
6. Add object storage upload flow.
7. Add realtime chat with Socket.IO or WebSocket.
8. Add role-aware UI rendering for collaborator/viewer.
9. Add tests for role permissions and API mutation guards.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
npm run type-check
```

## Project Structure

```text
src/
  app/                    App Router routes
  components/
    albums/               Album list, gallery, add-photo modal
    auth/                 Login form
    layout/               App sidebar
    notifications/        Notifications screen
    trips/                Trip list, create flow, workspace shell
      workspace/          Trip workspace hero, tabs, shared data
      workspace/tabs/     Itinerary, expenses, map, chat, gallery, files
  json/                   Mock data used by current UI
  styles/                 MUI styled wrappers
  theme/                  MUI theme
  ui/                     Shared form/input primitives
```
