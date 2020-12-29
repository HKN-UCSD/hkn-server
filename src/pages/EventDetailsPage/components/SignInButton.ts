import { InducteeRenderPermission } from '@HOCs/RenderPermissions';
import { Button } from '@SharedComponents';
import { affiliateSignInToEvent } from '@Services/EventService';

interface SignInButtonProps {
  eventId: number;
  children?: string;
}

function SignInButton({ eventId, children = 'Sign In' }: SignInButtonProps) {
  return InducteeRenderPermission(Button)({
    children,
    primary: true,
    positive: true,
    onClick: () => {
      try {
        affiliateSignInToEvent(eventId);
        alert("You've successfully signed in!");
      } catch {
        alert('Your sign in request could not be processed.');
      }
    },
  });
}

export default SignInButton;
