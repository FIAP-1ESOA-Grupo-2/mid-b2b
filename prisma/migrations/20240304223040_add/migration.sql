-- CreateTable
CREATE TABLE "email_verification_tokens" (
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_tokens_email_key" ON "email_verification_tokens"("email");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_email_key" ON "password_reset_tokens"("email");
