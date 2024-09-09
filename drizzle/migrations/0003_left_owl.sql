ALTER TABLE "lingua"."versions" DROP CONSTRAINT "versions_previous_version_id_versions_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lingua"."versions" ADD CONSTRAINT "versions_previous_version_id_versions_id_fk" FOREIGN KEY ("previous_version_id") REFERENCES "lingua"."versions"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
