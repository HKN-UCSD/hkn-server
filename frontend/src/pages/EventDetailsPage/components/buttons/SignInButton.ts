import { InducteeRenderPermission } from '@HOCs/RenderPermissions';
import { Button } from '@SharedComponents';
import { affiliateSignInToEvent } from '@Services/EventService';

interface SignInButtonProps {
  eventId: number;
  signedIn: boolean;
}

function SignInButton({ eventId, signedIn }: SignInButtonProps) {
  const buttonProps = signedIn ? { children: 'Signed In', disabled: true } : { children: 'Sign In' }
  return InducteeRenderPermission(Button)({
    ...buttonProps,
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
