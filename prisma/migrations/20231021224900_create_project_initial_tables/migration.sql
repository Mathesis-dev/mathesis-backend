-- CreateEnum
CREATE TYPE "UserCategoryEnum" AS ENUM ('TEACHER', 'STUDENT');

-- CreateEnum
CREATE TYPE "GenderEnum" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "SubjectEnum" AS ENUM ('ARTS', 'BIOLOGY', 'SCIENCE', 'PHYSICAL_EDUCATION', 'PHYSICS', 'GEOGRAPHY', 'HISTORY', 'MATH', 'PORTUGUESE', 'CHEMISTRY');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "category" "UserCategoryEnum" NOT NULL,
    "gender" "GenderEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teaching_schedules" (
    "id" SERIAL NOT NULL,
    "subject" "SubjectEnum" NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "online_class" BOOLEAN NOT NULL DEFAULT true,
    "in_person_class" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "teaching_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "biography" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "bad_reviews" INTEGER NOT NULL DEFAULT 0,
    "medium_reviews" INTEGER NOT NULL DEFAULT 0,
    "good_reviews" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_favorite_teachers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_user_id_key" ON "teachers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_user_id_key" ON "students"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_favorite_teachers_AB_unique" ON "_favorite_teachers"("A", "B");

-- CreateIndex
CREATE INDEX "_favorite_teachers_B_index" ON "_favorite_teachers"("B");

-- AddForeignKey
ALTER TABLE "teaching_schedules" ADD CONSTRAINT "teaching_schedules_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorite_teachers" ADD CONSTRAINT "_favorite_teachers_A_fkey" FOREIGN KEY ("A") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorite_teachers" ADD CONSTRAINT "_favorite_teachers_B_fkey" FOREIGN KEY ("B") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
