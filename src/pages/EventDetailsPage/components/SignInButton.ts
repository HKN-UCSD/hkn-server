import { InducteeRenderPermission } from '@HOCs/RenderPermissions';
import { Button } from '@SharedComponents';
import { signInToEvent } from '@Services/EventService';

interface SignInButtonProps {
  eventId: number;
  children?: string;
}

function SignInButton({ eventId, children = 'Sign In' }: SignInButtonProps) {
  const eventRequestPayloadFiller = {
    email: 'filler@filler.filler',
    firstName: '',
    lastName: '',
    major: '',
  };

  return InducteeRenderPermission(Button)({
    children,
    primary: true,
    positive: true,
    onClick: () => signInToEvent(eventId, eventRequestPayloadFiller),
  });
}

export default SignInButton;
