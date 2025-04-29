ALTER TABLE "resorto"."syncs" ADD COLUMN "hash" text NOT NULL;--> statement-breakpoint
ALTER TABLE "resorto"."syncs" ADD CONSTRAINT "syncs_hash_unique" UNIQUE("hash");