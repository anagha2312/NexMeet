'use client';

import { useGetCalls } from '@/hooks/useGetCalls';

const UpcomingMeetingBanner = () => {
  const { upcomingCalls, isLoading } = useGetCalls();

  const nextMeeting = [...(upcomingCalls ?? [])].sort((a, b) => {
    return (a.state.startsAt?.getTime() ?? 0) - (b.state.startsAt?.getTime() ?? 0);
  })[0];

  const label = isLoading
    ? 'Loading meetings...'
    : nextMeeting?.state.startsAt
      ? `Upcoming Meeting: ${nextMeeting.state.startsAt.toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })}`
      : 'No Upcoming Meetings';

  return (
    <h2 className="glassmorphism max-w-fit rounded py-2 px-4 text-center text-base font-normal">
      {label}
    </h2>
  );
};

export default UpcomingMeetingBanner;
