-- CreateTable
CREATE TABLE "Student" (
    "studentId" SERIAL NOT NULL,
    "level" INTEGER,
    "classCode" TEXT,
    "studentNumber" INTEGER,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "massarNumber" TEXT,
    "password" TEXT NOT NULL,
    "group" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("studentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_username_key" ON "Student"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Student_massarNumber_key" ON "Student"("massarNumber");
