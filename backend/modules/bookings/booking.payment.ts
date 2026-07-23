import { prisma } from "../../core/db.js";


export async function confirmBookingPayment(
  bookingId:string
){

  const booking =
    await prisma.booking.findUnique({
      where:{
        id:bookingId
      },
      include:{
        roomType:true
      }
    });


  if(!booking){
    throw new Error(
      "Booking not found"
    );
  }


  // Prevent duplicate payment confirmation
  if(
    booking.paymentStatus === "RECEIVED" &&
    booking.status === "BOOKED"
  ){
    return booking;
  }



const room = await prisma.room.findFirst({
  where:{
    roomTypeId: booking.roomTypeId,

    status:"AVAILABLE",

    bookings:{
      none:{
        status:{
          in:[
            "BOOKED",
            "CHECKED_IN"
          ]
        },

        checkIn:{
          lt:booking.checkOut
        },

        checkOut:{
          gt:booking.checkIn
        }
      }
    }
  }
});



  if(!room){

    throw new Error(
      "No available room after payment"
    );

  }



  return prisma.booking.update({

    where:{
      id:bookingId
    },


    data:{

      roomNumber:
        room.roomNumber,

      status:
        "BOOKED",

      paymentStatus:
        "RECEIVED"

    },


    include:{
      room:true,
      roomType:true
    }

  });

}