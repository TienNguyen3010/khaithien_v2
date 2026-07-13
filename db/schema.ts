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

/*
 * Strategy v2 data layer
 *
 * The architecture document targets PostgreSQL/Payload in the long term. The
 * deployed Sites edition mirrors the same bounded contexts on D1 so content
 * and lead data can migrate without changing the public information model.
 */
export const pageTranslations = sqliteTable(
  "page_translations",
  {
    id: text("id").primaryKey(),
    pageId: integer("page_id").notNull().references(() => pages.id, { onDelete: "cascade" }),
    locale: text("locale", { enum: ["vi", "en"] }).notNull(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    summary: text("summary"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
  },
  (table) => [
    uniqueIndex("page_translations_page_locale_uidx").on(table.pageId, table.locale),
    uniqueIndex("page_translations_locale_slug_uidx").on(table.locale, table.slug),
  ]
);

export const serviceTranslations = sqliteTable(
  "service_translations",
  {
    id: text("id").primaryKey(),
    serviceId: integer("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
    locale: text("locale", { enum: ["vi", "en"] }).notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    shortDescription: text("short_description"),
    problemStatement: text("problem_statement"),
    solutionSummary: text("solution_summary"),
    body: text("body", { mode: "json" }).$type<unknown>(),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
  },
  (table) => [
    uniqueIndex("service_translations_service_locale_uidx").on(table.serviceId, table.locale),
    uniqueIndex("service_translations_locale_slug_uidx").on(table.locale, table.slug),
  ]
);

export const serviceDeliverables = sqliteTable(
  "service_deliverables",
  {
    id: text("id").primaryKey(),
    serviceId: integer("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
    locale: text("locale", { enum: ["vi", "en"] }).notNull(),
    title: text("title").notNull(),
    description: text("description"),
    displayOrder: integer("display_order").notNull().default(0),
  },
  (table) => [index("service_deliverables_order_idx").on(table.serviceId, table.locale, table.displayOrder)]
);

export const industries = sqliteTable(
  "industries",
  {
    id: text("id").primaryKey(),
    code: text("code").notNull(),
    nameVi: text("name_vi").notNull(),
    nameEn: text("name_en"),
    slugVi: text("slug_vi").notNull(),
    slugEn: text("slug_en"),
    displayOrder: integer("display_order").notNull().default(0),
  },
  (table) => [uniqueIndex("industries_code_uidx").on(table.code), uniqueIndex("industries_slug_vi_uidx").on(table.slugVi)]
);

export const projectTranslations = sqliteTable(
  "project_translations",
  {
    id: text("id").primaryKey(),
    projectId: integer("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
    locale: text("locale", { enum: ["vi", "en"] }).notNull(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    overview: text("overview"),
    businessObjective: text("business_objective"),
    audience: text("audience"),
    challenge: text("challenge"),
    insight: text("insight"),
    bigIdea: text("big_idea"),
    solution: text("solution"),
    execution: text("execution"),
    resultSummary: text("result_summary"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
  },
  (table) => [
    uniqueIndex("project_translations_project_locale_uidx").on(table.projectId, table.locale),
    uniqueIndex("project_translations_locale_slug_uidx").on(table.locale, table.slug),
  ]
);

export const projectIndustries = sqliteTable(
  "project_industries",
  {
    projectId: integer("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
    industryId: text("industry_id").notNull().references(() => industries.id, { onDelete: "restrict" }),
  },
  (table) => [primaryKey({ columns: [table.projectId, table.industryId] }), index("project_industries_industry_idx").on(table.industryId)]
);

export const projectMetrics = sqliteTable(
  "project_metrics",
  {
    id: text("id").primaryKey(),
    projectId: integer("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
    metricName: text("metric_name").notNull(),
    metricValue: text("metric_value").notNull(),
    metricUnit: text("metric_unit"),
    isPublic: integer("is_public", { mode: "boolean" }).notNull().default(false),
    displayOrder: integer("display_order").notNull().default(0),
  },
  (table) => [index("project_metrics_public_order_idx").on(table.projectId, table.isPublic, table.displayOrder)]
);

export const articleCategories = sqliteTable(
  "article_categories",
  {
    id: text("id").primaryKey(),
    code: text("code").notNull(),
    nameVi: text("name_vi").notNull(),
    nameEn: text("name_en"),
    slugVi: text("slug_vi").notNull(),
    slugEn: text("slug_en"),
  },
  (table) => [uniqueIndex("article_categories_code_uidx").on(table.code), uniqueIndex("article_categories_slug_vi_uidx").on(table.slugVi)]
);

export const tags = sqliteTable(
  "tags",
  {
    id: text("id").primaryKey(),
    code: text("code").notNull(),
    nameVi: text("name_vi").notNull(),
    nameEn: text("name_en"),
  },
  (table) => [uniqueIndex("tags_code_uidx").on(table.code)]
);

export const articleTags = sqliteTable(
  "article_tags",
  {
    postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
    tagId: text("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.postId, table.tagId] }), index("article_tags_tag_idx").on(table.tagId)]
);

export const contacts = sqliteTable(
  "contacts",
  {
    id: text("id").primaryKey(),
    fullName: text("full_name").notNull(),
    companyName: text("company_name"),
    jobTitle: text("job_title"),
    email: text("email"),
    phone: text("phone"),
    preferredChannel: text("preferred_channel", { enum: ["phone", "email", "zalo"] }),
    locale: text("locale", { enum: ["vi", "en"] }).notNull().default("vi"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
    deletedAt: integer("deleted_at", { mode: "timestamp_ms" }),
  },
  (table) => [index("contacts_email_idx").on(table.email), index("contacts_phone_idx").on(table.phone)]
);

export const leads = sqliteTable(
  "leads",
  {
    id: text("id").primaryKey(),
    contactId: text("contact_id").notNull().references(() => contacts.id, { onDelete: "restrict" }),
    serviceId: integer("service_id").references(() => services.id, { onDelete: "set null" }),
    status: text("status", { enum: ["new", "reviewing", "contacted", "qualified", "proposal", "won", "lost", "nurturing", "spam"] }).notNull().default("new"),
    priority: text("priority", { enum: ["low", "normal", "high", "urgent"] }).notNull().default("normal"),
    subject: text("subject").notNull(),
    message: text("message").notNull(),
    source: text("source").notNull().default("website"),
    idempotencyKey: text("idempotency_key").notNull(),
    submittedAt: integer("submitted_at", { mode: "timestamp_ms" }).notNull().default(sql`(unixepoch() * 1000)`),
    firstResponseAt: integer("first_response_at", { mode: "timestamp_ms" }),
    qualifiedAt: integer("qualified_at", { mode: "timestamp_ms" }),
    closedAt: integer("closed_at", { mode: "timestamp_ms" }),
    closeReason: text("close_reason"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
    deletedAt: integer("deleted_at", { mode: "timestamp_ms" }),
  },
  (table) => [
    uniqueIndex("leads_idempotency_key_uidx").on(table.idempotencyKey),
    index("leads_queue_idx").on(table.status, table.priority, table.submittedAt),
    index("leads_contact_idx").on(table.contactId),
  ]
);

export const projectBriefs = sqliteTable(
  "project_briefs",
  {
    leadId: text("lead_id").primaryKey().references(() => leads.id, { onDelete: "cascade" }),
    projectType: text("project_type"),
    objective: text("objective"),
    expectedStartDate: text("expected_start_date"),
    expectedEndDate: text("expected_end_date"),
    locationText: text("location_text"),
    attendeeCount: integer("attendee_count"),
    budgetRange: text("budget_range"),
    budgetStatus: text("budget_status", { enum: ["known", "range", "undetermined", "confidential"] }).notNull().default("undetermined"),
    requirements: text("requirements"),
    preferredContactTime: text("preferred_contact_time"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  }
);

export const leadActivities = sqliteTable(
  "lead_activities",
  {
    id: text("id").primaryKey(),
    leadId: text("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
    activityType: text("activity_type", { enum: ["note", "status_change", "assignment", "email", "call", "meeting", "export", "submission"] }).notNull(),
    oldStatus: text("old_status"),
    newStatus: text("new_status"),
    content: text("content"),
    actorUserId: integer("actor_user_id").references(() => adminUsers.id, { onDelete: "set null" }),
    occurredAt: integer("occurred_at", { mode: "timestamp_ms" }).notNull().default(sql`(unixepoch() * 1000)`),
    metadata: text("metadata", { mode: "json" }).$type<unknown>(),
  },
  (table) => [index("lead_activities_timeline_idx").on(table.leadId, table.occurredAt)]
);

export const leadAttributions = sqliteTable(
  "lead_attributions",
  {
    id: text("id").primaryKey(),
    leadId: text("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
    touchType: text("touch_type", { enum: ["first", "last", "submission"] }).notNull().default("submission"),
    source: text("source"),
    medium: text("medium"),
    campaign: text("campaign"),
    term: text("term"),
    content: text("content"),
    landingPage: text("landing_page"),
    referrer: text("referrer"),
    capturedAt: integer("captured_at", { mode: "timestamp_ms" }).notNull().default(sql`(unixepoch() * 1000)`),
  },
  (table) => [index("lead_attributions_lead_idx").on(table.leadId, table.touchType)]
);

export const consents = sqliteTable(
  "consents",
  {
    id: text("id").primaryKey(),
    contactId: text("contact_id").notNull().references(() => contacts.id, { onDelete: "restrict" }),
    leadId: text("lead_id").references(() => leads.id, { onDelete: "cascade" }),
    consentType: text("consent_type", { enum: ["privacy", "marketing", "analytics"] }).notNull(),
    status: text("status", { enum: ["granted", "withdrawn"] }).notNull(),
    policyVersion: text("policy_version").notNull(),
    captureSource: text("capture_source").notNull(),
    capturedAt: integer("captured_at", { mode: "timestamp_ms" }).notNull().default(sql`(unixepoch() * 1000)`),
    withdrawnAt: integer("withdrawn_at", { mode: "timestamp_ms" }),
  },
  (table) => [index("consents_contact_type_idx").on(table.contactId, table.consentType)]
);

export const leadAttachments = sqliteTable(
  "lead_attachments",
  {
    leadId: text("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
    mediaId: integer("media_id").notNull().references(() => mediaAssets.id, { onDelete: "restrict" }),
    attachmentType: text("attachment_type").notNull().default("brief"),
    createdAt: createdAt(),
  },
  (table) => [primaryKey({ columns: [table.leadId, table.mediaId] })]
);

export const redirects = sqliteTable(
  "redirects",
  {
    id: text("id").primaryKey(),
    sourcePath: text("source_path").notNull(),
    destinationPath: text("destination_path").notNull(),
    statusCode: integer("status_code").notNull().default(301),
    locale: text("locale"),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [uniqueIndex("redirects_source_path_uidx").on(table.sourcePath)]
);

export const adminPermissions = sqliteTable(
  "admin_permissions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    key: text("key").notNull(),
    description: text("description"),
  },
  (table) => [uniqueIndex("admin_permissions_key_uidx").on(table.key)]
);

export const adminRolePermissions = sqliteTable(
  "admin_role_permissions",
  {
    roleId: integer("role_id").notNull().references(() => adminRoles.id, { onDelete: "cascade" }),
    permissionId: integer("permission_id").notNull().references(() => adminPermissions.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] }), index("admin_role_permissions_permission_idx").on(table.permissionId)]
);
