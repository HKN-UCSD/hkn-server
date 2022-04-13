import { InducteeRenderPermission } from '@HOCs/RenderPermissions';
import { Button } from '@SharedComponents';
import { affiliateSignInToEvent } from '@Services/EventService';

interface SignInButtonProps {
  eventId: number;
  signedIn: boolean;
}

function SignInButton({ eventId, signedIn }: SignInButtonProps) {
  if (signedIn) {
    return InducteeRenderPermission(Button)({
      children: 'Signed In',
      primary: true,
      positive: true,
      disabled: true,
      onClick: () => {
        try {
          affiliateSignInToEvent(eventId);
          alert("You've successfully signed in!");
        } catch {
          alert('Your sign in request could not be processed.');
        }
      },
    });
  } else {
    return InducteeRenderPermission(Button)({
      children: 'Sign In',
      primary: true,
      positive: true,
      onClick: () => { },
    });
  }


}

export default SignInButton;
