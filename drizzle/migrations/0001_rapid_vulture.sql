CREATE SCHEMA "auth";
--> statement-breakpoint
CREATE SCHEMA "lingua";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flags" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"emoji" text NOT NULL,
	CONSTRAINT "flags_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lingua"."lairs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"primary" boolean DEFAULT false NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now(),
	"updated_at" timestamp (3) with time zone DEFAULT now(),
	CONSTRAINT "lairs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lingua"."languages" (
	"id" serial PRIMARY KEY NOT NULL,
	"lair_id" bigint NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"flag_id" bigint NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now(),
	"updated_at" timestamp (3) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp (3) with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lingua"."tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"language_id" bigint NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL,
	"embedding" vector(1536),
	"created_at" timestamp (3) with time zone DEFAULT now(),
	"updated_at" timestamp (3) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lingua"."versions" (
	"id" serial PRIMARY KEY NOT NULL,
	"language_id" bigint NOT NULL,
	"previous_version_id" bigint,
	"version" integer NOT NULL,
	"changelog" jsonb NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"is_archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now(),
	"updated_at" timestamp (3) with time zone DEFAULT now()
);
--> statement-breakpoint
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
DO $$ BEGIN
 ALTER TABLE "lingua"."languages" ADD CONSTRAINT "languages_flag_id_flags_id_fk" FOREIGN KEY ("flag_id") REFERENCES "public"."flags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lingua"."tokens" ADD CONSTRAINT "tokens_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "lingua"."languages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lingua"."versions" ADD CONSTRAINT "versions_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "lingua"."languages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lingua"."versions" ADD CONSTRAINT "versions_previous_version_id_versions_id_fk" FOREIGN KEY ("previous_version_id") REFERENCES "lingua"."versions"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lairs_name_index" ON "lingua"."lairs" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "languages_code_index" ON "lingua"."languages" USING btree ("code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "languages_name_index" ON "lingua"."languages" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tokens_key_index" ON "lingua"."tokens" USING btree ("key");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tokens_embedding_index" ON "lingua"."tokens" USING hnsw ("embedding" vector_cosine_ops);