'use client'

import { Center, Heading } from "@chakra-ui/react";
import ActiveOrders from "./active_orders";

export default function Home() {
  return (
    <div>
      <Center>
        <Heading margin="10px" size='xl'>Order Tracking System</Heading>
      </Center>
      {/* <Order timeIn={new Date()} timerLen={15} guestName={'Ansh Thayil'} roomNum={'123'}/> */}
      <Center>
        <ActiveOrders />
      </Center>
      {/*<CompletedOrders /> */}
    </div>
    
  )
}
