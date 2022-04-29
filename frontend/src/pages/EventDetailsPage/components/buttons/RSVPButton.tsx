import { InducteeRenderPermission } from '@HOCs/RenderPermissions';
import { Button } from '@SharedComponents';
import { affiliateRSVPToEvent, affiliateUnRSVPToEvent } from '@Services/EventService';

interface SignInButtonProps {
  eventId: number;
  rsvped: boolean;
  children?: string;
}

function RSVPButton({ eventId, rsvped }: SignInButtonProps) {
  const buttonProps = rsvped ? { children: 'UNRSVP', onClick: () => affiliateUnRSVPToEvent(eventId) } : { children: 'RSVP', onClick: () => affiliateRSVPToEvent(eventId) }
  return InducteeRenderPermission(Button)({
    ...buttonProps,
    primary: true,
    positive: true,
  });
}

export default RSVPButton;
