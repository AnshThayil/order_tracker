'use client'

import { Center, Heading } from "@chakra-ui/react";
import ActiveOrders from "./active_orders";
import CompletedOrders from "./completed_orders";
import { OrderProps } from "./order";
import { useState } from 'react'


export default function Home() {

  const fake_order: OrderProps = {
    guestName: 'Ansh Thayil',
    roomNum: '123',
    timeIn: new Date(),
    timerLen: 15,
    means: 'tray',
    serverName:'John',
    remove: (key: string) => {},
    complete: (newOrder: OrderProps) => {},
    completed: false
  }
  const [completedOrder, setCompletedOrder] = useState(fake_order)
  const handleComplete = (newCompletedOrder: OrderProps) => {
    setCompletedOrder(newCompletedOrder);
  }
  const resetCompletedOrder = () => {setCompletedOrder(fake_order)}
  return (
    <div>
      <Center>
        <Heading margin="10px" size='xl'>Order Tracking System</Heading>
      </Center>
      {/* <Order timeIn={new Date()} timerLen={15} guestName={'Ansh Thayil'} roomNum={'123'}/> */}
      <Center>
        <ActiveOrders markAsComplete={handleComplete}/>
      </Center>
      <Center>
        <CompletedOrders newCompletedOrder={completedOrder} resetCompletedOrder={resetCompletedOrder} />
      </Center>
      {/*<CompletedOrders /> */}
    </div>
    
  )
}
