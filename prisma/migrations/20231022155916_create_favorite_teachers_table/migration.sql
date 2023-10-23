/*
  Warnings:

  - You are about to drop the `_favorite_teachers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_favorite_teachers" DROP CONSTRAINT "_favorite_teachers_A_fkey";

-- DropForeignKey
ALTER TABLE "_favorite_teachers" DROP CONSTRAINT "_favorite_teachers_B_fkey";

-- DropTable
DROP TABLE "_favorite_teachers";

-- CreateTable
CREATE TABLE "favorite_teachers" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "favorite_teachers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorite_teachers" ADD CONSTRAINT "favorite_teachers_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_teachers" ADD CONSTRAINT "favorite_teachers_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
