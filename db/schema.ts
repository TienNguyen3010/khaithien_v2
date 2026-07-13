import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const createdAt = () =>
  integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`);

const updatedAt = () =>
  integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`)
    .$onUpdate(() => new Date());

/** Metadata for images and files. The actual bytes live in the MEDIA R2 bucket. */
export const mediaAssets = sqliteTable(
  "media_assets",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    storageKey: text("storage_key").notNull(),
    publicUrl: text("public_url"),
    fileName: text("file_name").notNull(),
    mimeType: text("mime_type").notNull(),
    kind: text("kind", {
      enum: ["image", "video", "document", "other"],
    })
      .notNull()
      .default("image"),
    altText: text("alt_text"),
    caption: text("caption"),
    width: integer("width"),
    height: integer("height"),
    sizeBytes: integer("size_bytes"),
    createdAt: createdAt(),
  },
  (table) => [
    uniqueIndex("media_assets_storage_key_uidx").on(table.storageKey),
    index("media_assets_kind_idx").on(table.kind),
  ]
);

/** Route-level SEO and publication state. */
export const pages = sqliteTable(
  "pages",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    status: text("status", { enum: ["draft", "review", "published", "archived"] })
      .notNull()
      .default("draft"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    uniqueIndex("pages_slug_uidx").on(table.slug),
    index("pages_status_idx").on(table.status),
  ]
);

/** Flexible, ordered content blocks for each page. */
export const pageSections = sqliteTable(
  "page_sections",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    pageId: integer("page_id")
      .notNull()
      .references(() => pages.id, { onDelete: "cascade" }),
    sectionKey: text("section_key").notNull(),
    sectionType: text("section_type").notNull(),
    heading: text("heading"),
    subheading: text("subheading"),
    content: text("content", { mode: "json" }).$type<unknown>(),
    mediaId: integer("media_id").references(() => mediaAssets.id, {
      onDelete: "set null",
    }),
    displayOrder: integer("display_order").notNull().default(0),
    isVisible: integer("is_visible", { mode: "boolean" })
      .notNull()
      .default(true),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    uniqueIndex("page_sections_page_key_uidx").on(
      table.pageId,
      table.sectionKey
    ),
    index("page_sections_page_order_idx").on(
      table.pageId,
      table.displayOrder
    ),
  ]
);

export const services = sqliteTable(
  "services",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    summary: text("summary"),
    description: text("description"),
    icon: text("icon"),
    coverMediaId: integer("cover_media_id").references(() => mediaAssets.id, {
      onDelete: "set null",
    }),
    displayOrder: integer("display_order").notNull().default(0),
    status: text("status", { enum: ["draft", "review", "published", "archived"] })
      .notNull()
      .default("draft"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    uniqueIndex("services_slug_uidx").on(table.slug),
    index("services_status_order_idx").on(table.status, table.displayOrder),
  ]
);

export const projects = sqliteTable(
  "projects",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    clientName: text("client_name"),
    summary: text("summary"),
    description: text("description"),
    location: text("location"),
    eventDate: integer("event_date", { mode: "timestamp_ms" }),
    coverMediaId: integer("cover_media_id").references(() => mediaAssets.id, {
      onDelete: "set null",
    }),
    isFeatured: integer("is_featured", { mode: "boolean" })
      .notNull()
      .default(false),
    status: text("status", { enum: ["draft", "review", "published", "archived"] })
      .notNull()
      .default("draft"),
    publishedAt: integer("published_at", { mode: "timestamp_ms" }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    uniqueIndex("projects_slug_uidx").on(table.slug),
    index("projects_status_date_idx").on(table.status, table.eventDate),
    index("projects_featured_idx").on(table.isFeatured),
  ]
);

export const projectServices = sqliteTable(
  "project_services",
  {
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    serviceId: integer("service_id")
      .notNull()
      .references(() => services.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.serviceId] }),
    index("project_services_service_idx").on(table.serviceId),
  ]
);

export const projectMedia = sqliteTable(
  "project_media",
  {
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    mediaId: integer("media_id")
      .notNull()
      .references(() => mediaAssets.id, { onDelete: "cascade" }),
    displayOrder: integer("display_order").notNull().default(0),
    caption: text("caption"),
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.mediaId] }),
    index("project_media_order_idx").on(table.projectId, table.displayOrder),
  ]
);

export const clients = sqliteTable(
  "clients",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    logoMediaId: integer("logo_media_id").references(() => mediaAssets.id, {
      onDelete: "set null",
    }),
    websiteUrl: text("website_url"),
    displayOrder: integer("display_order").notNull().default(0),
    isPublished: integer("is_published", { mode: "boolean" })
      .notNull()
      .default(true),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    uniqueIndex("clients_slug_uidx").on(table.slug),
    index("clients_published_order_idx").on(
      table.isPublished,
      table.displayOrder
    ),
  ]
);

export const testimonials = sqliteTable(
  "testimonials",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    clientId: integer("client_id").references(() => clients.id, {
      onDelete: "set null",
    }),
    quote: text("quote").notNull(),
    authorName: text("author_name").notNull(),
    authorRole: text("author_role"),
    displayOrder: integer("display_order").notNull().default(0),
    isPublished: integer("is_published", { mode: "boolean" })
      .notNull()
      .default(false),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    index("testimonials_published_order_idx").on(
      table.isPublished,
      table.displayOrder
    ),
  ]
);

export const posts = sqliteTable(
  "posts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    coverMediaId: integer("cover_media_id").references(() => mediaAssets.id, {
      onDelete: "set null",
    }),
    status: text("status", { enum: ["draft", "review", "published", "archived"] })
      .notNull()
      .default("draft"),
    publishedAt: integer("published_at", { mode: "timestamp_ms" }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    uniqueIndex("posts_slug_uidx").on(table.slug),
    index("posts_status_published_idx").on(table.status, table.publishedAt),
  ]
);

/** Leads submitted from the public contact form. */
export const contactSubmissions = sqliteTable(
  "contact_submissions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    company: text("company"),
    email: text("email"),
    phone: text("phone"),
    serviceId: integer("service_id").references(() => services.id, {
      onDelete: "set null",
    }),
    serviceInterest: text("service_interest"),
    plannedStart: text("planned_start"),
    budgetRange: text("budget_range"),
    message: text("message").notNull(),
    consent: integer("consent", { mode: "boolean" })
      .notNull()
      .default(false),
    source: text("source").notNull().default("website"),
    status: text("status", {
      enum: ["new", "contacted", "qualified", "closed", "spam"],
    })
      .notNull()
      .default("new"),
    respondedAt: integer("responded_at", { mode: "timestamp_ms" }),
    assignedTo: integer("assigned_to"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    index("contact_submissions_status_created_idx").on(
      table.status,
      table.createdAt
    ),
    index("contact_submissions_service_idx").on(table.serviceId),
    index("contact_submissions_assigned_idx").on(table.assignedTo),
  ]
);

/** Small global values such as contact details, social links and SEO defaults. */
export const siteSettings = sqliteTable(
  "site_settings",
  {
    key: text("key").primaryKey(),
    value: text("value", { mode: "json" }).$type<unknown>().notNull(),
    group: text("group").notNull().default("general"),
    description: text("description"),
    updatedAt: updatedAt(),
  },
  (table) => [index("site_settings_group_idx").on(table.group)]
);

/** Accounts for the future content-management area. Authentication stays external. */
export const adminUsers = sqliteTable(
  "admin_users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull(),
    displayName: text("display_name").notNull(),
    status: text("status", { enum: ["invited", "active", "suspended"] })
      .notNull()
      .default("invited"),
    lastLoginAt: integer("last_login_at", { mode: "timestamp_ms" }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    uniqueIndex("admin_users_email_uidx").on(table.email),
    index("admin_users_status_idx").on(table.status),
  ]
);

export const adminRoles = sqliteTable(
  "admin_roles",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    key: text("key").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: createdAt(),
  },
  (table) => [uniqueIndex("admin_roles_key_uidx").on(table.key)]
);

export const adminUserRoles = sqliteTable(
  "admin_user_roles",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    roleId: integer("role_id")
      .notNull()
      .references(() => adminRoles.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.roleId] }),
    index("admin_user_roles_role_idx").on(table.roleId),
  ]
);

/** Reviewable snapshots for page, service, project and post edits. */
export const contentRevisions = sqliteTable(
  "content_revisions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    entityType: text("entity_type", {
      enum: ["page", "page_section", "service", "project", "post", "setting"],
    }).notNull(),
    entityId: text("entity_id").notNull(),
    snapshot: text("snapshot", { mode: "json" }).$type<unknown>().notNull(),
    status: text("status", { enum: ["draft", "review", "approved", "rejected"] })
      .notNull()
      .default("draft"),
    authorId: integer("author_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    reviewerId: integer("reviewer_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    note: text("note"),
    createdAt: createdAt(),
  },
  (table) => [
    index("content_revisions_entity_idx").on(table.entityType, table.entityId),
    index("content_revisions_status_idx").on(table.status, table.createdAt),
  ]
);

export const activityLogs = sqliteTable(
  "activity_logs",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    adminUserId: integer("admin_user_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    action: text("action").notNull(),
    entityType: text("entity_type"),
    entityId: text("entity_id"),
    payload: text("payload", { mode: "json" }).$type<unknown>(),
    createdAt: createdAt(),
  },
  (table) => [
    index("activity_logs_user_created_idx").on(table.adminUserId, table.createdAt),
    index("activity_logs_entity_idx").on(table.entityType, table.entityId),
  ]
);
