export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  identityScore: number;
  joinedAt: string;
}

export interface StoredDocument {
  id: string;
  userId: string;
  filename: string;
  originalName: string;
  type: string; // 'aadhaar', 'pan', 'marksheet', 'resume', 'other'
  mimeType: string;
  size: number;
  extractedData: Record<string, string | number | boolean>;
  extractedText?: string;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  uploadedAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface Scholarship {
  id: string;
  name: string;
  matchPercentage: number;
  deadline: string;
  eligibilityReason: string;
  sourceLink: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
