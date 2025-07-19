import { Button, CloseButton, Drawer, Portal, InputGroup, NumberInput, NumberInputLabel, HStack, VStack, Text, Stack, IconButton } from "@chakra-ui/react"
import { useDrawerContext } from "../context/DrawerContext"
import { terrorBreakpoints } from "../../../data/terror";
import { LuArrowRightLeft } from "react-icons/lu"
import { useTerrorContext } from "../context/TerrorContext"
import { GiCheckMark } from "react-icons/gi";
import { useSocketContext } from "../context/SocketContext";
import { useState } from "react";
import { server } from "~/config";
import { toaster } from "../ui/toaster";

const MS_PER_MINUTE = 6e4;

export const ControlDrawer = () => {
	const { activeDrawer, closeDrawer } = useDrawerContext();
	const { terrorTrack, setTerror, getTerror } = useTerrorContext();
	const { socketEmit } = useSocketContext();
	const breakpoints = terrorBreakpoints;
	const [minutes, setMinutes] = useState<number>(15);
	const [turnNumber, setTurnNumber] = useState<number>(1);
	return (
		<Drawer.Root placement="end" open={activeDrawer === "dashboard"} onOpenChange={(e) => !e.open ? closeDrawer() : ""} onEscapeKeyDown={() => closeDrawer()} size='sm'>
			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content>
						<Drawer.Body pt="6" spaceY="3">
							{/* <Text textStyle="3xl">Clock Controls</Text>
							<HStack justifyContent="space-between">
								<VStack alignItems='start' gap={0}>
									<Text textStyle="md">Minutes</Text>
								</VStack>
								<NumberInput.Root value='15' size='md' w="3xs" onValueChange={(el) => {
									setMinutes(Number.isNaN(el.valueAsNumber) ? 0 : el.valueAsNumber);
								}}>
									<NumberInput.Control />
									<InputGroup
										startElementProps={{ pointerEvents: "auto" }}
										startElement={
											<NumberInput.Scrubber>
												<LuArrowRightLeft />
											</NumberInput.Scrubber>
										}>
										<NumberInput.Input />
									</InputGroup>
								</NumberInput.Root>
							</HStack>
							<HStack justifyContent="space-between">
								<VStack alignItems='start' gap={0}>
									<Text textStyle="md">Turn #</Text>
								</VStack>
								<NumberInput.Root value='1' size='md' w="3xs" onValueChange={(el) => {
									setTurnNumber(Number.isNaN(el.valueAsNumber) ? 0 : el.valueAsNumber);
								}}>
									<NumberInput.Control />
									<InputGroup
										startElementProps={{ pointerEvents: "auto" }}
										startElement={
											<NumberInput.Scrubber>
												<LuArrowRightLeft />
											</NumberInput.Scrubber>
										}>
										<NumberInput.Input />
									</InputGroup>
								</NumberInput.Root>
							</HStack>
							<HStack justifyContent="space-between">
								<Button onClick={async () => {
									console.log(`client attempting to update with ${minutes}`);
									await fetch(
										`${server}api/turn`,
										{
											method: 'POST', headers: { 'Content-Type': 'application/json' },
											body: JSON.stringify({ number: turnNumber, turnDuration: minutes, startTime: Date.now(), endTime: Date.now() + minutes * MS_PER_MINUTE, })
										}
									);
									socketEmit(
										{ event: 'countdown', payload: { action: 'update', minutes } },
										(response: {}) => { console.log(response); }
									)
								}}>Update Time</Button>
							</HStack> */}
							<Text textStyle="3xl">Terror Controls</Text>
							{terrorTrack.map(region => (
								<HStack justifyContent="space-between">
									<VStack alignItems='start' gap={0}>
										<Text textStyle="md">{region.name}</Text>
										<Text textStyle="sm">Current: {breakpoints.find(el => region.terror >= el.minValue && region.terror < el.maxValue)?.name}</Text>
									</VStack>
									<NumberInput.Root value={region.terror.toString()} size='md' w="3xs" onValueChange={(el) => {
										region.terror = Number.isNaN(el.valueAsNumber) ? 0 : el.valueAsNumber;
										setTerror(region);
									}}>
										<NumberInput.Control />
										<InputGroup
											startElementProps={{ pointerEvents: "auto" }}
											startElement={
												<NumberInput.Scrubber>
													<LuArrowRightLeft />
												</NumberInput.Scrubber>
											}>
											<NumberInput.Input />
										</InputGroup>
									</NumberInput.Root>
								</HStack>
							))}
							<Button onClick={ () => {
								let terror = getTerror()
								socketEmit({ event: 'terror', payload: terror }, (response: {status: string, description: string, data: any}) => {
										const { status, description, data } = response;
										toaster.create({ type: status, description });
								})
							} }> Transmit Terror </Button>
						</Drawer.Body>
						<Drawer.Footer>
							<Drawer.CloseTrigger asChild>
								<CloseButton onClick={() => closeDrawer()} size="lg" />
							</Drawer.CloseTrigger>
							<Button variant="outline" onClick={() => closeDrawer()}>Close</Button>
						</Drawer.Footer>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	)
}