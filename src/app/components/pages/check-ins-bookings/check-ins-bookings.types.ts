export interface CheckInBooking {
  _id: string;
  client: {
    first_name: string;
    middle_name?: string;
    last_name: string;
  };
  room: {
    room_number: number;
  };
  check_in_date: Date;
  check_out_date: Date;
  note?: string;
  isCheckIn: boolean;
  totalDayPrice: number;
  totalPrice: number;
}

export interface CheckInsBookingsApiResponse {
  status: number;
  message: string;
  data: CheckInBooking[];
}

export interface CheckInsBookingsPaginationApiResponse {
  status: number;
  message: string;
  data: {
    checkIns: CheckInBooking[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface CheckInAndBookingData {
  last_name: string;
  first_name: string;
  middle_name?: string;
  passport_details: string;
  room: string;
  isCheckIn: boolean;
  check_in_date: Date;
  check_out_date: Date;
  discounts: {
    regularCustomer: number;
    military: number;
    guardian: number;

  },
  totalDiscount: number;
  totalDayPrice: number;
  totalPrice: number;
  comment?: string;
  note?: string;
}


export interface CheckInBookingApiResponse {
  status: number;
  message: string;
  data: {
    checkIn: CheckInBooking
}
}

