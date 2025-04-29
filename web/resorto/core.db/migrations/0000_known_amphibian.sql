CREATE SCHEMA "resorto";
--> statement-breakpoint
CREATE TABLE "resorto"."devices" (
	"id" integer,
	"uid" text PRIMARY KEY NOT NULL,
	"created" timestamp with time zone,
	"updated" timestamp with time zone,
	"deleted" timestamp with time zone,
	"ownerId" integer,
	"workerId" integer,
	"data" json
);
--> statement-breakpoint
CREATE TABLE "resorto"."guests" (
	"id" integer,
	"uid" text PRIMARY KEY NOT NULL,
	"created" timestamp with time zone,
	"updated" timestamp with time zone,
	"deleted" timestamp with time zone,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"email" text,
	"phone" text NOT NULL,
	CONSTRAINT "guests_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "resorto"."payments" (
	"id" integer,
	"uid" text PRIMARY KEY NOT NULL,
	"created" timestamp with time zone,
	"updated" timestamp with time zone,
	"deleted" timestamp with time zone,
	"amount" numeric,
	"status" text,
	"receipt" json
);
--> statement-breakpoint
CREATE TABLE "resorto"."reservations" (
	"id" integer,
	"uid" text PRIMARY KEY NOT NULL,
	"created" timestamp with time zone,
	"updated" timestamp with time zone,
	"deleted" timestamp with time zone,
	"roomId" integer,
	"guestId" integer,
	"paymentId" integer,
	"checkIn" timestamp,
	"checkOut" timestamp
);
--> statement-breakpoint
CREATE TABLE "resorto"."resorts" (
	"id" integer,
	"uid" text PRIMARY KEY NOT NULL,
	"created" timestamp with time zone,
	"updated" timestamp with time zone,
	"deleted" timestamp with time zone,
	"ownerId" integer,
	"email" text,
	"phone" text NOT NULL,
	"address" json NOT NULL,
	CONSTRAINT "resorts_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "resorto"."rooms" (
	"id" integer,
	"uid" text PRIMARY KEY NOT NULL,
	"created" timestamp with time zone,
	"updated" timestamp with time zone,
	"deleted" timestamp with time zone,
	"resortId" integer NOT NULL,
	"roomNo" text NOT NULL,
	"roomType" text NOT NULL,
	"roomStatus" text NOT NULL,
	"maxOccupancy" integer
);
--> statement-breakpoint
CREATE TABLE "resorto"."syncs" (
	"id" integer,
	"uid" text PRIMARY KEY NOT NULL,
	"created" timestamp with time zone,
	"deviceId" integer,
	"changes" json,
	"sync" boolean,
	"applied" boolean
);
--> statement-breakpoint
CREATE TABLE "resorto"."tasks" (
	"id" integer,
	"uid" text PRIMARY KEY NOT NULL,
	"created" timestamp with time zone,
	"updated" timestamp with time zone,
	"deleted" timestamp with time zone,
	"done" timestamp,
	"roomId" integer,
	"status" text
);
--> statement-breakpoint
CREATE TABLE "resorto"."workers" (
	"id" integer,
	"uid" text PRIMARY KEY NOT NULL,
	"created" timestamp with time zone,
	"updated" timestamp with time zone,
	"deleted" timestamp with time zone,
	"ownerId" integer NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"passcode" text
);
