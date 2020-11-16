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
    onClick: () => {
      try {
        signInToEvent(eventId, eventRequestPayloadFiller);
        alert("You've successfully signed in!");
      } catch {
        alert('Your sign in request could not be processed.');
      }
    },
  });
}

export default SignInButton;
