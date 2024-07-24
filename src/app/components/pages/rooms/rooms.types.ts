export interface Room {
  _id: string;
  room_number: number;
  capacity: number;
  comfort_level: string;
  image: string;
  price: number;
  bookingsAndCheckIns: CheckInOrBooking[];
}

export interface CheckInOrBooking {
  _id: string;
  check_in_date: Date;
  check_out_date: Date;
}

export interface RoomsApiResponse {
  status: number;
  message: string;
  data: Room[];
}
