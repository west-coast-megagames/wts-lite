import { Switch } from '@chakra-ui/react';
import { useAppContext } from '~/components/context/AppContext';

export const DisplayModeSwitch = () => {
    const { displayMode, selectDisplayMode } = useAppContext();

    return (
			<Switch.Root label={`Display Mode`}
				checked={displayMode === 'projector'}
				onCheckedChange={ (e) => selectDisplayMode(e.checked ? 'projector' : 'user') }
				>
				<Switch.HiddenInput />
				<Switch.Control>
						<Switch.Thumb />
				</Switch.Control>
				<Switch.Label>Mode Select: {displayMode}</Switch.Label>
		</Switch.Root>
  )
}