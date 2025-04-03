CREATE TABLE `drafts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id2` text(32) NOT NULL,
	`author` integer NOT NULL,
	`slug` text NOT NULL,
	`status` text NOT NULL,
	`created` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated` integer NOT NULL,
	`expired` integer,
	`published` integer,
	`archived` integer,
	`title` text NOT NULL,
	`subheadline` text,
	`desc` text,
	`featuredImageUrl` text,
	`content` blob
);
--> statement-breakpoint
CREATE UNIQUE INDEX `drafts_id2_unique` ON `drafts` (`id2`);--> statement-breakpoint
CREATE UNIQUE INDEX `drafts_slug_unique` ON `drafts` (`slug`);--> statement-breakpoint
CREATE TABLE `media` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id2` text(32) NOT NULL,
	`author` integer NOT NULL,
	`slug` text NOT NULL,
	`created` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated` integer NOT NULL,
	`name` text NOT NULL,
	`bin` blob,
	`size` integer NOT NULL,
	`originalName` text NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `media_id2_unique` ON `media` (`id2`);--> statement-breakpoint
CREATE UNIQUE INDEX `media_slug_unique` ON `media` (`slug`);