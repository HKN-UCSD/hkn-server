import { InducteeRenderPermission } from '@HOCs/RenderPermissions';
import { Button } from '@SharedComponents';
import { affiliateRSVPToEvent } from '@Services/EventService';

interface SignInButtonProps {
  eventId: number;
  children?: string;
}

function RSVPButton({ eventId, children = 'RSVP' }: SignInButtonProps) {
  return InducteeRenderPermission(Button)({
    children,
    primary: true,
    positive: true,
    onClick: () => affiliateRSVPToEvent(eventId),
  });
}

export default RSVPButton;
