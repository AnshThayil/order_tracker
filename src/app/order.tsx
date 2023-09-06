import { Box, Button, Card, CardHeader, Text, Center, Heading, CardBody, CardFooter, CircularProgress, CircularProgressLabel, ButtonGroup } from '@chakra-ui/react'
import { useState, useEffect, useRef, useCallback } from 'react'

function useInterval(callback: any, delay: number) {
    const savedCallback = useRef(callback);
    const intervalId: any = useRef();

    useEffect(() => {
        savedCallback.current = callback
    }, [callback]);

    useEffect(() => {
        const tick = () => savedCallback.current();

        if (delay !== null){
            intervalId.current = setInterval(tick, delay);
        }

        const id = intervalId.current;

        return () => clearInterval(id);
    }, [delay]);

    const stopInterval = useCallback(() => {
        if(intervalId.current !== null){
            clearInterval(intervalId.current)
        }
    }, [delay])

    return stopInterval;
}

export type OrderProps = {
    timeIn: Date,
    timerLen: number,
    guestName: string,
    roomNum: string,
    means: string,
    serverName: string,
    remove: (key: string) => void
}
export default function Order({timeIn, timerLen, guestName, roomNum, means, serverName, remove}: OrderProps) {

    const color = {
        'red': '#eb6060',
        'orange': '#f0ad4e',
        'green': '#5cb85c'
    }
    const [time, setTime] = useState(timerLen);
    const [statusColor, setStatusColor] = useState(color.green)
    const [paused, setPaused] = useState(false);

    const stop = useInterval(() => {
        if (!paused){
            if (time > 0) {
                setTime((prevTime) => prevTime - 1);
                if (((time / timerLen) <= 0.5) && ((time / timerLen) > 0.25)) {
                    setStatusColor(color.orange)
                } else if ((time / timerLen) <= 0.25) {
                    setStatusColor(color.red)
                }
            }
        }
    }, 1000);

    const handlePause = () => {
        setPaused((prev) => !prev);
    }
    const handleStop = () => {
        stop();
        remove(roomNum+guestName)
    }

    return (
        <Card display='flex' width='100%'>
            <CardHeader color={'white'} bg={statusColor}>
                <Center>
                    <Heading size='sm'>Room No.</Heading>
                </Center>
                <Center>
                    <Heading size='lg'>{roomNum}</Heading>
                </Center>
            </CardHeader>
            <CardBody>
                <Center>
                    <Heading size='sm'>Guest Name: {guestName}</Heading>
                </Center>
                <Center>
                    <Text >Time in: {String(timeIn.getHours()).padStart(2, '0')}:{String(timeIn.getMinutes()).padStart(2, '0')}</Text>
                </Center>
                <Center>
                    <Text>Expected Time: {String(Math.floor(timerLen / 60)).padStart(2, '0')}:{String(timerLen % 60).padStart(2, '0')}</Text>
                </Center>
                <Center>
                    <Text>Means: {means}</Text>
                </Center>
                <Center>
                    <Text>Server: {serverName}</Text>
                </Center>
                <Center>
                    <CircularProgress color={statusColor} margin='5%' size='100px' value={Math.floor((time / timerLen) * 100)} >
                        <CircularProgressLabel>{String(Math.floor(time / 60)).padStart(2, '0')}:{String(time % 60).padStart(2, '0')}</CircularProgressLabel>
                    </CircularProgress>
                </Center>
                <Box justifyContent='center' width='100%' display='flex'>
                    <ButtonGroup>
                        <Button onClick={handleStop}>Complete </Button>
                        <Button onClick={handlePause}>Pause</Button>
                    </ButtonGroup>
                </Box>
            </CardBody>
        </Card>
    )
}