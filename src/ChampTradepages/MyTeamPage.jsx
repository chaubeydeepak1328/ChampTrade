import React from 'react';
import TeamOverview from '../champtradeComponent/dashboard/TeamOverview';
import Panel from '../champtradeComponent/dashboard/Panel';

function MyTeamPage() {
  return (
    <Panel title="My Team">
      <TeamOverview />
    </Panel>
  );
}

export default MyTeamPage;