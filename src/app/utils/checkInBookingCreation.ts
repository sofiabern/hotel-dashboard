import { isBefore, isAfter, isEqual } from 'date-fns';
import { ToastrService } from 'ngx-toastr';



export function calculateTotalDiscountAndPrice(discounts: { regularCustomer: number; military: number; guardian: number; }, roomPrice: number, startDate: Date, endDate: Date): { totalDiscount: number, totalDayPrice: number, totalPrice: number } {
  const totalDiscount = discounts.regularCustomer + discounts.military + discounts.guardian;
  const totalDayPrice = totalDiscount ? Math.round(roomPrice * (1 - totalDiscount / 100)) : roomPrice;

  let totalPrice = 0;
  if (startDate && endDate) {
    const difference = endDate.getTime() - startDate.getTime();
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24)) + 1;
    totalPrice = totalDayPrice * days;
  }

  return { totalDiscount, totalDayPrice, totalPrice };
}

export function checkDateIntersection(startDate: Date, endDate: Date, bookingsAndCheckIns: any[], toastr: ToastrService): boolean {
  const hasIntersection = bookingsAndCheckIns.some((item) => {
    const bookingCheckInDate = new Date(item.check_in_date);
    const bookingCheckOutDate = new Date(item.check_out_date);
    return (
      (isBefore(startDate, bookingCheckOutDate) && isAfter(endDate, bookingCheckInDate)) ||
      isEqual(startDate, bookingCheckInDate) ||
      isEqual(endDate, bookingCheckOutDate) ||
      isEqual(endDate, bookingCheckInDate) ||
      isEqual(startDate, bookingCheckOutDate) ||
      (isBefore(startDate, bookingCheckOutDate) && isAfter(startDate, bookingCheckInDate)) ||
      (isBefore(endDate, bookingCheckOutDate) && isAfter(endDate, bookingCheckInDate))
    );
  });

  if (hasIntersection) {
    toastr.error('Selected dates intersect with existing bookings or check-ins. Please filter rooms before choosing.');
  }

  return hasIntersection;
}
