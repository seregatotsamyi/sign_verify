-- CreateTable
CREATE TABLE "verification_results" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "result" BOOLEAN NOT NULL,
    "documentName" TEXT NOT NULL,
    "signatureType" TEXT NOT NULL,
    "signatureTime" TIMESTAMP(3) NOT NULL,
    "issuerName" TEXT NOT NULL,
    "notAfter" TIMESTAMP(3) NOT NULL,
    "notBefore" TIMESTAMP(3) NOT NULL,
    "subjectName" TEXT NOT NULL,
    "scopeSerialNumber" TEXT NOT NULL,
    "thumbprint" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_results_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "verification_results" ADD CONSTRAINT "verification_results_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
