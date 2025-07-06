CREATE TABLE `drafts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id2` text(32) NOT NULL,
	`author` integer NOT NULL,
	`slug` text NOT NULL,
	`folder` integer,
	`status` text NOT NULL,
	`created` integer NOT NULL,
	`updated` integer NOT NULL,
	`expired` integer,
	`published` integer,
	`archived` integer,
	`title` text NOT NULL,
	`subheadline` text,
	`desc` text,
	`featuredImageUrl` text,
	`content` blob,
	`images` blob
);
--> statement-breakpoint
CREATE UNIQUE INDEX `drafts_id2_unique` ON `drafts` (`id2`);--> statement-breakpoint
CREATE UNIQUE INDEX `drafts_slug_unique` ON `drafts` (`slug`);--> statement-breakpoint
CREATE TABLE `folders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id2` text(32) NOT NULL,
	`author` integer NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`created` integer NOT NULL,
	`updated` integer NOT NULL,
	`folder` integer,
	`target` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `folders_id2_unique` ON `folders` (`id2`);--> statement-breakpoint
CREATE UNIQUE INDEX `folders_slug_unique` ON `folders` (`slug`);--> statement-breakpoint
CREATE TABLE `media` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id2` text(32) NOT NULL,
	`author` integer NOT NULL,
	`slug` text NOT NULL,
	`folder` integer,
	`created` integer NOT NULL,
	`updated` integer NOT NULL,
	`originalName` text NOT NULL,
	`bin` blob,
	`uploaded` integer,
	`size` integer NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `media_id2_unique` ON `media` (`id2`);--> statement-breakpoint
CREATE UNIQUE INDEX `media_slug_unique` ON `media` (`slug`);