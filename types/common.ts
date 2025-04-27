export type reportApiType = {
  Result: boolean;
  Message?: string | null;
  SignatureInfo?: {
    CAdESType: string | null;
    LocalSigningTime: string | null;
  };
  SignerCertificate?: string | null;
  SignerCertificateInfo?: {
    IssuerName?: string | null;
    KeyIdentifier?: string | null;
    NotAfter?: string | null;
    NotBefore?: string | null;
    SerialNumber?: string | null;
    SubjectName?: string | null;
    Thumbprint?: string | null;
  };
};
export type reportType = {
  id: string;
  Message?: string | null | undefined;
  createdAt: Date;
  documentName: string;
  userId: string;
  result: boolean;
  signatureType?: string | null;
  signatureTime?: string | null;
  issuerName?: string | null;
  notAfter?: string | null;
  notBefore?: string | null;
  subjectName: string | null;
  scopeSerialNumber?: string | null;
  thumbprint?: string | null;
  updatedAt: Date;
};

export type usersType = {
  id: string;
  email: string;
  name: string | null;
  isAdmin: boolean;
  createdAt: Date;
  isBlock: boolean;
};
