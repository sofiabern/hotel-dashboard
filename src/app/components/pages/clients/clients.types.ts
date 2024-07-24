export interface Client {
  _id: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  passport_details: string;
  visitsAmount: number;
  discounts: {
    regularCustomer: number;
    military: number;
    guardian: number;

  }
  totalDiscount: number;
}

export interface PassportDetails {
  passport_details: string;
}

export interface ClientsApiResponse {
  status: number;
  message: string;
  data: Client[];
}
export interface ClientsPaginationApiResponse {
  status: number;
  message: string;
  data: {
    clients: Client[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface VisitsApiResponse {
  status: number;
  message: string;
  data: number;
}
