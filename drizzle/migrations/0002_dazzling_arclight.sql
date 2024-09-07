ALTER TABLE "lingua"."glossaries" RENAME TO "lairs";--> statement-breakpoint
ALTER TABLE "lingua"."languages" RENAME COLUMN "glossary_id" TO "lair_id";--> statement-breakpoint
ALTER TABLE "lingua"."lairs" DROP CONSTRAINT "glossaries_slug_unique";--> statement-breakpoint
ALTER TABLE "lingua"."lairs" DROP CONSTRAINT "glossaries_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "lingua"."languages" DROP CONSTRAINT "languages_glossary_id_glossaries_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "glossaries_name_index";--> statement-breakpoint
ALTER TABLE "lingua"."lairs" ADD COLUMN "primary" boolean DEFAULT false NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lingua"."lairs" ADD CONSTRAINT "lairs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lingua"."languages" ADD CONSTRAINT "languages_lair_id_lairs_id_fk" FOREIGN KEY ("lair_id") REFERENCES "lingua"."lairs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lairs_name_index" ON "lingua"."lairs" USING btree ("name");--> statement-breakpoint
ALTER TABLE "auth"."users" DROP COLUMN IF EXISTS "avatar";--> statement-breakpoint
ALTER TABLE "lingua"."lairs" ADD CONSTRAINT "lairs_slug_unique" UNIQUE("slug");