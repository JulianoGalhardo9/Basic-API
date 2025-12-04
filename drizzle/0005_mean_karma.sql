ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_courseId_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "enrollments" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "enrollments" ADD COLUMN "course_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "enrollments" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "enrollments_user_course_idx" ON "enrollments" USING btree ("user_id","course_id");--> statement-breakpoint
ALTER TABLE "enrollments" DROP COLUMN "userId";--> statement-breakpoint
ALTER TABLE "enrollments" DROP COLUMN "courseId";--> statement-breakpoint
ALTER TABLE "enrollments" DROP COLUMN "createdAt";