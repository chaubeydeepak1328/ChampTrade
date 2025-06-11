import React from 'react';
import EarningsBreakdown from '../champtradeComponent/dashboard/EarningsBreakdown';
import Panel from '../champtradeComponent/dashboard/Panel';

function MyEarningsPage() {
  return (
    <Panel title="My Earnings" >
      <EarningsBreakdown />
    </Panel>
  );
}

export default MyEarningsPage;