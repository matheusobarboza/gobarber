-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "user_id" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
