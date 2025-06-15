import React from 'react';
import ReferralStats from '../champtradeComponent/dashboard/ReferralStats';
import Panel from '../champtradeComponent/dashboard/Panel';

function MyReferralsPage() {
  return (
    <Panel title="My Referrals">
      <ReferralStats />
    </Panel>
  );
}

export default MyReferralsPage;