import { InducteeRenderPermission } from '@HOCs/RenderPermissions';
import { Button } from '@SharedComponents';
import { rsvpToEvent } from '@Services/EventService';

interface SignInButtonProps {
  eventId: number;
  children?: string;
}

function RSVPButton({ eventId, children = 'RSVP' }: SignInButtonProps) {
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
    onClick: () => rsvpToEvent(eventId, eventRequestPayloadFiller),
  });
}

export default RSVPButton;
