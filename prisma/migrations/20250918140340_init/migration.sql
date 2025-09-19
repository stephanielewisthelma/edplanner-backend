/*
  Warnings:

  - You are about to drop the column `courseId` on the `ClassSchedule` table. All the data in the column will be lost.
  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseCode]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseCode` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseCode` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseCode` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_courseId_fkey";

-- DropIndex
DROP INDEX "public"."Course_id_key";

-- AlterTable
ALTER TABLE "public"."ClassSchedule" DROP COLUMN "courseId",
ADD COLUMN     "courseCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Course" DROP CONSTRAINT "Course_pkey",
DROP COLUMN "id",
ADD COLUMN     "courseCode" TEXT NOT NULL,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("courseCode");

-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "courseId",
ADD COLUMN     "courseCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseCode_key" ON "public"."Course"("courseCode");

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "public"."Course"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;
