export type reportApiType = {
  Result: boolean;
  SignatureInfo: {
    CAdESType: string;
    LocalSigningTime: string;
  };
  SignerCertificate: string;
  SignerCertificateInfo: {
    IssuerName: string;
    KeyIdentifier: string;
    NotAfter: string;
    NotBefore: string;
    SerialNumber: string;
    SubjectName: string;
    Thumbprint: string;
  };
};
export type reportType = {
  createdAt: string;
  documentName: string;
  userId: string;
  result: boolean;
  signatureType: string;
  signatureTime: string;
  issuerName: string;
  notAfter: string;
  notBefore: string;
  subjectName: string;
  scopeSerialNumber: string;
  thumbprint: string;
  updatedAt: string;
};
