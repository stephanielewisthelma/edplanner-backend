/*
  Warnings:

  - You are about to drop the `_CourseToTask` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_CourseToTask" DROP CONSTRAINT "_CourseToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CourseToTask" DROP CONSTRAINT "_CourseToTask_B_fkey";

-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "courseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."_CourseToTask";

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
