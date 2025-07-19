import {
  Container,
  Heading,
  Link,
  PinInput,
  Span,
  Stack,
  Text,
  VStack,
  Button,
  Image,
	Input,
	Editable,
	IconButton,
	Center,
} from '@chakra-ui/react'
import { LuArrowRight, LuCheck, LuPencilLine, LuX } from 'react-icons/lu'
import logo from "../../img/logos/wcm_logo.png"
import { useEffect, useState } from 'react'
import { TeamSelect } from './TeamSelect'
import { useAppContext } from '../context/AppContext'
import { useNavigate, useSearchParams } from 'react-router'
import { RoleSelect } from './RoleSelect'
import { toaster } from '../ui/toaster'
import { server } from '~/config'

export const Login = () => {
  const { team, role, selectTeam, selectUser, selectRole } = useAppContext();
	const navigate = useNavigate();
	const [ pin, setPin ] = useState(["", "", "", ""]);
	const [ mode, setMode ] = useState<'login' | 'reg'>('reg');
	const [ searchParams, setSearchParams ] = useSearchParams();
	const [ code, harvestCode ] = useState<string | null>("");
	
	const [ username, setUsername ] = useState<string | undefined>(undefined);
	const [ loginSuccess, setLoginSuccess ] = useState<boolean>(false);

	const handleLogin = async () => {
		toaster.create({ type: 'info', description: 'Login attempt...', duration: 2000});
		try {
          await fetch(`${server}api/users/name/${username}`).then(res => {
            console.log(res);
            if (!res.ok) {
              toaster.create({ type: 'error', description: `Failed to load Posts`, duration: 5000})
            } 
						return res.json();
          }).then(json => {
            console.log(json);
						let i = 0;
						for (const num in pin) {
							if (json.pin[i].toString() !== pin[i]) return;
							i++;
						}
						setLoginSuccess(true);
						selectUser(json);
						selectRole(json.role._id);
						selectTeam(json.role.team.code);
          });
        } catch (err) {
          // Handle network errors or errors thrown from the response.ok check
          console.log(err)
          toaster.create({ type: 'error', description: 'Error submitting data: ' + err.message});
        }
	};

	const handleReg = async () => {
		try {
			toaster.create({ type: 'info', description: 'Attempting to Register' });
			await fetch(`${server}api/users`, { // Replace with your API endpoint
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: username, role: role?._id, pin: pin })
			}).then(res => {
				console.log(res.body)
      	!res.ok ? toaster.create({ type: 'error', description: `Failed to load Teams`, duration: 5000}) : undefined;
				return res.json();
			}).then(json => {
				setLoginSuccess(true);
				selectUser(json);
				selectRole(json.role._id);
				selectTeam(json.role.team.code);
			});
		} catch (err) {
			
		}
	};

	useEffect(() => { 
		console.log(pin);
		if (pin.length === 4) null;
	}, [pin]); // Listens to changes on the pin.
	useEffect(() => {
		if (loginSuccess) {
			navigate(`/feed`);
			localStorage.setItem('username', username as string);
		}
	}, [loginSuccess])
	useEffect(() => {
		harvestCode(searchParams.get('team')) 
	}, [searchParams])
	useEffect(() => {
		if (code) selectTeam(code?.toUpperCase());
	}, [code])
    
  return (<Container maxW="md" py={{ base: '12', md: '24' }}>
    <Stack gap="8">
      <Image src={logo} />
      <Stack gap={{ base: '2', md: '3' }} textAlign="center">
				       <Text color="fg.muted">
          { mode === "reg" && "Already registered a username and pin?" }
					{ mode === "login" && "Need to register for the game?"}
        </Text>
				<Link justifyContent="center" onClick={() => setMode(mode === 'login' ? 'reg' : 'login')}>
					<Span color="fg" fontWeight="medium">
            { mode === "reg" && "Switch to Login" }
						{ mode === "login" && "Switch to Registration"}
          </Span>
				</Link>
				<Editable.Root justifyContent="space-between" defaultEdit placeholder="Enter Username" onValueCommit={ (v) => setUsername(v.value) }>
					<Editable.Preview />
					<Editable.Input />
					<Editable.Control>
						<Editable.EditTrigger asChild>
							<IconButton variant="ghost" size="xs">
								<LuPencilLine />
							</IconButton>
						</Editable.EditTrigger>
						<Editable.CancelTrigger asChild>
							<IconButton variant="outline" size="xs">
								<LuX />
							</IconButton>
						</Editable.CancelTrigger>
						<Editable.SubmitTrigger asChild>
							<IconButton variant="outline" size="xs">
								<LuCheck />
							</IconButton>
						</Editable.SubmitTrigger>
					</Editable.Control>
				</Editable.Root>
				{ mode === 'reg' && <TeamSelect disabled={team ? true : false} /> }
				{ mode === 'reg' && <RoleSelect /> }
      </Stack>
      <VStack gap="6">
				<Text>Enter pin below</Text>
        <PinInput.Root value={pin} onValueChange={ (e) => { 
					console.log(e.value);
					console.log(typeof e.value);
					setPin(e.value)
				}} size="xl" placeholder="*">
          <PinInput.HiddenInput />
          <PinInput.Control>
            <PinInput.Input index={0} />
            <PinInput.Input index={1} />
            <PinInput.Input index={2} />
            <PinInput.Input index={3} />
          </PinInput.Control>
        </PinInput.Root>
      </VStack>
      <Button
				disabled={ pin.includes("") }
				onClick={ () => {
				if (mode === "login") handleLogin();
				if (mode === "reg") handleReg();
			}}>
        { mode === 'login' && "Login" }{ mode === 'reg' && "Regester User" } <LuArrowRight />
      </Button>
    </Stack>
  </Container>)
}
