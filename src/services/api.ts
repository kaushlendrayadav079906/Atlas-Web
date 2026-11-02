/**
 * ATLAS Technosoft - Backend API Service
 * Connects frontend forms with FastAPI and SAP Business One Service Layer.
 */

export interface ContactEnquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  service: string;
  message: string;
}

export interface ConsultationPayload extends ContactEnquiryPayload {
  preferredDate?: string;
  preferredTime?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  status: string;
  message: string;
  sapCardCode?: string;
  sapActivityId?: number;
  referenceId?: string;
  preferredDate?: string;
  preferredTime?: string;
  submittedAt?: string;
  errors?: Array<{ field: string; message: string }>;
  details?: string;
}

const API_BASE_URL = ((import.meta as unknown as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL) || '';

async function handleResponse<T>(res: Response): Promise<ApiResponse<T>> {
  const data = await res.json().catch(() => ({}));
  
  if (!res.ok) {
    // If backend provided validation errors list
    if (data.errors && Array.isArray(data.errors)) {
      const errorMsg = data.errors.map((e: any) => e.message).join('. ');
      throw new Error(errorMsg || data.message || 'Validation failed. Please review your inputs.');
    }

    if (data.detail) {
      if (typeof data.detail === 'string') {
        throw new Error(data.detail);
      } else if (data.detail.message) {
        throw new Error(data.detail.message);
      }
    }

    throw new Error(data.message || `Server request failed with status ${res.status}`);
  }

  return data;
}

export const apiService = {
  /**
   * Submit Contact Us Enquiry to SAP Business One
   */
  async submitContact(payload: ContactEnquiryPayload): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return handleResponse(response);
  },

  /**
   * Book a Strategic Consultation in SAP Business One
   */
  async submitConsultation(payload: ConsultationPayload): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/consultations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return handleResponse(response);
  },

  /**
   * Health and diagnostics check
   */
  async checkHealth(): Promise<{ status: string; service: string }> {
    const response = await fetch(`${API_BASE_URL}/api/v1/health`);
    return response.json();
  }
};
