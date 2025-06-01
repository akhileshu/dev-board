/*
  Warnings:

  - The values [CLIENT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `milestoneId` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `what` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `why` on the `Feature` table. All the data in the column will be lost.
  - The `status` column on the `Feature` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `projectId` on the `Milestone` table. All the data in the column will be lost.
  - You are about to drop the column `templateId` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `actualOutcome` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `atomicTasks` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `buildVsBuy` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `challenges` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `decisionCriteria` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `expectedOutcome` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `how` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `improvementPlan` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `pivotReason` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `resourcesUsed` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `reusableAssetNote` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `shippingImperfect` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `userFlowDiagram` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `what` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `why` on the `Task` table. All the data in the column will be lost.
  - The `status` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `taskId` on the `Timebox` table. All the data in the column will be lost.
  - Added the required column `phaseId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MvpStage" AS ENUM ('IDEA_VALIDATION', 'MVP_DEFINITION', 'BUILDING', 'TESTING', 'READY_TO_LAUNCH', 'LAUNCHED', 'POST_LAUNCH');

-- CreateEnum
CREATE TYPE "WorkStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELLED');

-- CreateEnum
CREATE TYPE "taskStatus" AS ENUM ('OPEN', 'APPROVED', 'IN_DEVELOPMENT', 'PARKED', 'TESTING', 'READY_FOR_BUILD', 'UNDER_REVIEW', 'REQUIRES_ITERATION', 'DONE');

-- CreateEnum
CREATE TYPE "TaskRelationType" AS ENUM ('BLOCKS', 'BLOCKED_BY', 'DUPLICATES', 'RELATED', 'PARENT', 'CHILD');

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "WorkArea" AS ENUM ('ENGINEERING', 'PRODUCT_MANAGEMENT', 'USER_EXPERIENCE');

-- CreateEnum
CREATE TYPE "TodoType" AS ENUM ('IDEA', 'FEEDBACK', 'TASK', 'QUESTION');

-- CreateEnum
CREATE TYPE "TechCategory" AS ENUM ('SECURITY', 'PERFORMANCE', 'SCALABILITY', 'TESTING', 'DEVOPS', 'MAINTAINABILITY', 'RELIABILITY', 'COMPLIANCE', 'ACCESSIBILITY', 'LOCALIZATION', 'MOBILE_OPTIMIZATION', 'TECH_DEBT');

-- CreateEnum
CREATE TYPE "IdeaStatus" AS ENUM ('SUGGESTED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "IdeaScope" AS ENUM ('FEATURE', 'TASK', 'TBD');

-- AlterEnum
ALTER TYPE "ResourceType" ADD VALUE 'PDF';

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('DEVELOPER', 'MANAGER', 'USER');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'DEVELOPER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_milestoneId_fkey";

-- DropForeignKey
ALTER TABLE "Milestone" DROP CONSTRAINT "Milestone_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Timebox" DROP CONSTRAINT "Timebox_taskId_fkey";

-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "milestoneId",
DROP COLUMN "what",
DROP COLUMN "why",
ADD COLUMN     "ideaId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "WorkStatus" NOT NULL DEFAULT 'PLANNED';

-- AlterTable
ALTER TABLE "Milestone" DROP COLUMN "projectId";

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "templateId";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "actualOutcome",
DROP COLUMN "atomicTasks",
DROP COLUMN "buildVsBuy",
DROP COLUMN "challenges",
DROP COLUMN "decisionCriteria",
DROP COLUMN "endDate",
DROP COLUMN "expectedOutcome",
DROP COLUMN "how",
DROP COLUMN "improvementPlan",
DROP COLUMN "pivotReason",
DROP COLUMN "resourcesUsed",
DROP COLUMN "reusableAssetNote",
DROP COLUMN "shippingImperfect",
DROP COLUMN "startDate",
DROP COLUMN "userFlowDiagram",
DROP COLUMN "what",
DROP COLUMN "why",
ADD COLUMN     "TechCategories" "TechCategory"[] DEFAULT ARRAY[]::"TechCategory"[],
ADD COLUMN     "ideaId" TEXT,
ADD COLUMN     "phaseId" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "taskStatus" NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "Timebox" DROP COLUMN "taskId",
ADD COLUMN     "productDetailsId" TEXT;

-- DropEnum
DROP TYPE "FeatureStatus";

-- DropEnum
DROP TYPE "SubtaskStatus";

-- CreateTable
CREATE TABLE "MVPDetail" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stage" "MvpStage" NOT NULL DEFAULT 'IDEA_VALIDATION',
    "timeToMarketId" TEXT,

    CONSTRAINT "MVPDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTimeline" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectTimeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phase" (
    "id" TEXT NOT NULL,
    "projectTimelineId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "status" "WorkStatus" NOT NULL DEFAULT 'PLANNED',
    "mvpDetailId" TEXT,

    CONSTRAINT "Phase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateResource" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "templateId" TEXT,
    "resourceId" TEXT,

    CONSTRAINT "TemplateResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskRelation" (
    "id" TEXT NOT NULL,
    "fromTaskId" TEXT NOT NULL,
    "toTaskId" TEXT NOT NULL,
    "relationType" "TaskRelationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "engineeringDetails" (
    "id" TEXT NOT NULL,
    "how" TEXT NOT NULL,
    "challenges" TEXT,
    "decisionCriteria" TEXT,
    "buildVsBuy" TEXT,
    "improvementPlan" TEXT,
    "shippingImperfect" BOOLEAN NOT NULL DEFAULT false,
    "pivotReason" TEXT,
    "riskId" TEXT,
    "reusableAssetNote" TEXT,
    "resourcesUsed" TEXT[],
    "atomicTasks" JSONB NOT NULL,
    "effortArea" TEXT,
    "effortScore" DOUBLE PRECISION,
    "taskId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "engineeringDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Risk" (
    "id" TEXT NOT NULL,
    "level" "RiskLevel" NOT NULL,
    "type" TEXT NOT NULL,
    "mitigationPlan" TEXT,

    CONSTRAINT "Risk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productDetails" (
    "id" TEXT NOT NULL,
    "impactArea" TEXT,
    "impactScore" DOUBLE PRECISION,
    "priorityScore" DOUBLE PRECISION,
    "okrId" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "taskId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskHistory" (
    "id" TEXT NOT NULL,
    "changedField" TEXT NOT NULL,
    "oldValue" JSONB NOT NULL,
    "newValue" JSONB NOT NULL,
    "changedBy" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OKR" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outcomeAligned" BOOLEAN,
    "outcomeNotes" TEXT,

    CONSTRAINT "OKR_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyResult" (
    "id" TEXT NOT NULL,
    "okrId" TEXT NOT NULL,
    "area" "WorkArea" NOT NULL,
    "result" TEXT NOT NULL,
    "status" "OutcomeStatus",
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeyResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uxDetails" (
    "id" TEXT NOT NULL,
    "customerFeedbackLink" TEXT,
    "analyticsData" JSONB,
    "analyticsLink" TEXT,
    "analyticsNotes" TEXT,
    "userJourneyId" TEXT,
    "userPersonaId" TEXT,
    "taskId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uxDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPersona" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "goals" TEXT[],
    "painPoints" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPersona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserJourney" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "persona" TEXT,
    "diagramLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserJourney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TodoNote" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "TodoType" NOT NULL,
    "linkedTo" TEXT,
    "linkId" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TodoNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Idea" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "authorId" TEXT NOT NULL,
    "status" "IdeaStatus" NOT NULL DEFAULT 'SUGGESTED',
    "tags" TEXT[],
    "votes" INTEGER NOT NULL DEFAULT 0,
    "impactArea" TEXT,
    "impactScore" DOUBLE PRECISION,
    "scope" "IdeaScope" NOT NULL DEFAULT 'TBD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userJourneyId" TEXT,

    CONSTRAINT "Idea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaitlistEntry" (
    "id" TEXT NOT NULL,
    "mvpDetailId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "source" TEXT,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaitlistEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Positioning" (
    "id" TEXT NOT NULL,
    "mvpDetailId" TEXT NOT NULL,
    "valueProp" TEXT NOT NULL,
    "differentiation" TEXT NOT NULL,
    "slogan" TEXT,
    "tagline" TEXT,

    CONSTRAINT "Positioning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoToMarket" (
    "id" TEXT NOT NULL,
    "mvpDetailId" TEXT NOT NULL,
    "strategy" TEXT NOT NULL,
    "budget" DOUBLE PRECISION,
    "channels" TEXT[],
    "notes" TEXT,

    CONSTRAINT "GoToMarket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TargetMarket" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "segment" TEXT NOT NULL,
    "painPoints" TEXT[],
    "size" TEXT,
    "notes" TEXT,

    CONSTRAINT "TargetMarket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeToMarket" (
    "id" TEXT NOT NULL,
    "mvpDetailId" TEXT NOT NULL,
    "estimatedDays" INTEGER NOT NULL,
    "actualDays" INTEGER,
    "blockers" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeToMarket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MvpLaunchMilestone" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "MilestoneStatus" NOT NULL,

    CONSTRAINT "MvpLaunchMilestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarlyAdopter" (
    "id" TEXT NOT NULL,
    "mvpDetailId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "role" TEXT,
    "notes" TEXT,

    CONSTRAINT "EarlyAdopter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValidationMetric" (
    "id" TEXT NOT NULL,
    "mvpDetailId" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "target" DOUBLE PRECISION NOT NULL,
    "actual" DOUBLE PRECISION,
    "status" "OutcomeStatus",

    CONSTRAINT "ValidationMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MVPDetail_projectId_key" ON "MVPDetail"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "engineeringDetails_riskId_key" ON "engineeringDetails"("riskId");

-- CreateIndex
CREATE UNIQUE INDEX "engineeringDetails_taskId_key" ON "engineeringDetails"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "productDetails_taskId_key" ON "productDetails"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "uxDetails_taskId_key" ON "uxDetails"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "TimeToMarket_mvpDetailId_key" ON "TimeToMarket"("mvpDetailId");

-- AddForeignKey
ALTER TABLE "MVPDetail" ADD CONSTRAINT "MVPDetail_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTimeline" ADD CONSTRAINT "ProjectTimeline_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "Phase_projectTimelineId_fkey" FOREIGN KEY ("projectTimelineId") REFERENCES "ProjectTimeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "Phase_mvpDetailId_fkey" FOREIGN KEY ("mvpDetailId") REFERENCES "MVPDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateResource" ADD CONSTRAINT "TemplateResource_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateResource" ADD CONSTRAINT "TemplateResource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskRelation" ADD CONSTRAINT "TaskRelation_fromTaskId_fkey" FOREIGN KEY ("fromTaskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskRelation" ADD CONSTRAINT "TaskRelation_toTaskId_fkey" FOREIGN KEY ("toTaskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "engineeringDetails" ADD CONSTRAINT "engineeringDetails_riskId_fkey" FOREIGN KEY ("riskId") REFERENCES "Risk"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "engineeringDetails" ADD CONSTRAINT "engineeringDetails_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productDetails" ADD CONSTRAINT "productDetails_okrId_fkey" FOREIGN KEY ("okrId") REFERENCES "OKR"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productDetails" ADD CONSTRAINT "productDetails_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeyResult" ADD CONSTRAINT "KeyResult_okrId_fkey" FOREIGN KEY ("okrId") REFERENCES "OKR"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uxDetails" ADD CONSTRAINT "uxDetails_userJourneyId_fkey" FOREIGN KEY ("userJourneyId") REFERENCES "UserJourney"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uxDetails" ADD CONSTRAINT "uxDetails_userPersonaId_fkey" FOREIGN KEY ("userPersonaId") REFERENCES "UserPersona"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uxDetails" ADD CONSTRAINT "uxDetails_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timebox" ADD CONSTRAINT "Timebox_productDetailsId_fkey" FOREIGN KEY ("productDetailsId") REFERENCES "productDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_userJourneyId_fkey" FOREIGN KEY ("userJourneyId") REFERENCES "UserJourney"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaitlistEntry" ADD CONSTRAINT "WaitlistEntry_mvpDetailId_fkey" FOREIGN KEY ("mvpDetailId") REFERENCES "MVPDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Positioning" ADD CONSTRAINT "Positioning_mvpDetailId_fkey" FOREIGN KEY ("mvpDetailId") REFERENCES "MVPDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoToMarket" ADD CONSTRAINT "GoToMarket_mvpDetailId_fkey" FOREIGN KEY ("mvpDetailId") REFERENCES "MVPDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TargetMarket" ADD CONSTRAINT "TargetMarket_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeToMarket" ADD CONSTRAINT "TimeToMarket_mvpDetailId_fkey" FOREIGN KEY ("mvpDetailId") REFERENCES "MVPDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarlyAdopter" ADD CONSTRAINT "EarlyAdopter_mvpDetailId_fkey" FOREIGN KEY ("mvpDetailId") REFERENCES "MVPDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValidationMetric" ADD CONSTRAINT "ValidationMetric_mvpDetailId_fkey" FOREIGN KEY ("mvpDetailId") REFERENCES "MVPDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
