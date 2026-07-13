CREATE TABLE `admin_permissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_permissions_key_uidx` ON `admin_permissions` (`key`);--> statement-breakpoint
CREATE TABLE `admin_role_permissions` (
	`role_id` integer NOT NULL,
	`permission_id` integer NOT NULL,
	PRIMARY KEY(`role_id`, `permission_id`),
	FOREIGN KEY (`role_id`) REFERENCES `admin_roles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`permission_id`) REFERENCES `admin_permissions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `admin_role_permissions_permission_idx` ON `admin_role_permissions` (`permission_id`);--> statement-breakpoint
CREATE TABLE `article_categories` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`name_vi` text NOT NULL,
	`name_en` text,
	`slug_vi` text NOT NULL,
	`slug_en` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `article_categories_code_uidx` ON `article_categories` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `article_categories_slug_vi_uidx` ON `article_categories` (`slug_vi`);--> statement-breakpoint
CREATE TABLE `article_tags` (
	`post_id` integer NOT NULL,
	`tag_id` text NOT NULL,
	PRIMARY KEY(`post_id`, `tag_id`),
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `article_tags_tag_idx` ON `article_tags` (`tag_id`);--> statement-breakpoint
CREATE TABLE `consents` (
	`id` text PRIMARY KEY NOT NULL,
	`contact_id` text NOT NULL,
	`lead_id` text,
	`consent_type` text NOT NULL,
	`status` text NOT NULL,
	`policy_version` text NOT NULL,
	`capture_source` text NOT NULL,
	`captured_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`withdrawn_at` integer,
	FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `consents_contact_type_idx` ON `consents` (`contact_id`,`consent_type`);--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`company_name` text,
	`job_title` text,
	`email` text,
	`phone` text,
	`preferred_channel` text,
	`locale` text DEFAULT 'vi' NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE INDEX `contacts_email_idx` ON `contacts` (`email`);--> statement-breakpoint
CREATE INDEX `contacts_phone_idx` ON `contacts` (`phone`);--> statement-breakpoint
CREATE TABLE `industries` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`name_vi` text NOT NULL,
	`name_en` text,
	`slug_vi` text NOT NULL,
	`slug_en` text,
	`display_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `industries_code_uidx` ON `industries` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `industries_slug_vi_uidx` ON `industries` (`slug_vi`);--> statement-breakpoint
CREATE TABLE `lead_activities` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text NOT NULL,
	`activity_type` text NOT NULL,
	`old_status` text,
	`new_status` text,
	`content` text,
	`actor_user_id` integer,
	`occurred_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`metadata` text,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`actor_user_id`) REFERENCES `admin_users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `lead_activities_timeline_idx` ON `lead_activities` (`lead_id`,`occurred_at`);--> statement-breakpoint
CREATE TABLE `lead_attachments` (
	`lead_id` text NOT NULL,
	`media_id` integer NOT NULL,
	`attachment_type` text DEFAULT 'brief' NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	PRIMARY KEY(`lead_id`, `media_id`),
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`media_id`) REFERENCES `media_assets`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `lead_attributions` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text NOT NULL,
	`touch_type` text DEFAULT 'submission' NOT NULL,
	`source` text,
	`medium` text,
	`campaign` text,
	`term` text,
	`content` text,
	`landing_page` text,
	`referrer` text,
	`captured_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `lead_attributions_lead_idx` ON `lead_attributions` (`lead_id`,`touch_type`);--> statement-breakpoint
CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`contact_id` text NOT NULL,
	`service_id` integer,
	`status` text DEFAULT 'new' NOT NULL,
	`priority` text DEFAULT 'normal' NOT NULL,
	`subject` text NOT NULL,
	`message` text NOT NULL,
	`source` text DEFAULT 'website' NOT NULL,
	`idempotency_key` text NOT NULL,
	`submitted_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`first_response_at` integer,
	`qualified_at` integer,
	`closed_at` integer,
	`close_reason` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `leads_idempotency_key_uidx` ON `leads` (`idempotency_key`);--> statement-breakpoint
CREATE INDEX `leads_queue_idx` ON `leads` (`status`,`priority`,`submitted_at`);--> statement-breakpoint
CREATE INDEX `leads_contact_idx` ON `leads` (`contact_id`);--> statement-breakpoint
CREATE TABLE `page_translations` (
	`id` text PRIMARY KEY NOT NULL,
	`page_id` integer NOT NULL,
	`locale` text NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`summary` text,
	`seo_title` text,
	`seo_description` text,
	FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `page_translations_page_locale_uidx` ON `page_translations` (`page_id`,`locale`);--> statement-breakpoint
CREATE UNIQUE INDEX `page_translations_locale_slug_uidx` ON `page_translations` (`locale`,`slug`);--> statement-breakpoint
CREATE TABLE `project_briefs` (
	`lead_id` text PRIMARY KEY NOT NULL,
	`project_type` text,
	`objective` text,
	`expected_start_date` text,
	`expected_end_date` text,
	`location_text` text,
	`attendee_count` integer,
	`budget_range` text,
	`budget_status` text DEFAULT 'undetermined' NOT NULL,
	`requirements` text,
	`preferred_contact_time` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `project_industries` (
	`project_id` integer NOT NULL,
	`industry_id` text NOT NULL,
	PRIMARY KEY(`project_id`, `industry_id`),
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`industry_id`) REFERENCES `industries`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE INDEX `project_industries_industry_idx` ON `project_industries` (`industry_id`);--> statement-breakpoint
CREATE TABLE `project_metrics` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` integer NOT NULL,
	`metric_name` text NOT NULL,
	`metric_value` text NOT NULL,
	`metric_unit` text,
	`is_public` integer DEFAULT false NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `project_metrics_public_order_idx` ON `project_metrics` (`project_id`,`is_public`,`display_order`);--> statement-breakpoint
CREATE TABLE `project_translations` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` integer NOT NULL,
	`locale` text NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`overview` text,
	`business_objective` text,
	`audience` text,
	`challenge` text,
	`insight` text,
	`big_idea` text,
	`solution` text,
	`execution` text,
	`result_summary` text,
	`seo_title` text,
	`seo_description` text,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `project_translations_project_locale_uidx` ON `project_translations` (`project_id`,`locale`);--> statement-breakpoint
CREATE UNIQUE INDEX `project_translations_locale_slug_uidx` ON `project_translations` (`locale`,`slug`);--> statement-breakpoint
CREATE TABLE `redirects` (
	`id` text PRIMARY KEY NOT NULL,
	`source_path` text NOT NULL,
	`destination_path` text NOT NULL,
	`status_code` integer DEFAULT 301 NOT NULL,
	`locale` text,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `redirects_source_path_uidx` ON `redirects` (`source_path`);--> statement-breakpoint
CREATE TABLE `service_deliverables` (
	`id` text PRIMARY KEY NOT NULL,
	`service_id` integer NOT NULL,
	`locale` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`display_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `service_deliverables_order_idx` ON `service_deliverables` (`service_id`,`locale`,`display_order`);--> statement-breakpoint
CREATE TABLE `service_translations` (
	`id` text PRIMARY KEY NOT NULL,
	`service_id` integer NOT NULL,
	`locale` text NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`short_description` text,
	`problem_statement` text,
	`solution_summary` text,
	`body` text,
	`seo_title` text,
	`seo_description` text,
	FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `service_translations_service_locale_uidx` ON `service_translations` (`service_id`,`locale`);--> statement-breakpoint
CREATE UNIQUE INDEX `service_translations_locale_slug_uidx` ON `service_translations` (`locale`,`slug`);--> statement-breakpoint
CREATE TABLE `tags` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`name_vi` text NOT NULL,
	`name_en` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tags_code_uidx` ON `tags` (`code`);