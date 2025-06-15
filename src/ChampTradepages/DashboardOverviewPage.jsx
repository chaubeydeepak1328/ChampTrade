
import MyOverviewWidgets from '../champtradeComponent/dashboard/MyOverviewWidgets';
import LatestTransactionsPanel from '../champtradeComponent/dashboard/LatestTransactionsPanel';
import Panel from '../champtradeComponent/dashboard/Panel';

function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <MyOverviewWidgets />
      <Panel title="Latest Transactions">
        <LatestTransactionsPanel />
      </Panel>
    </div>
  );
}

export default DashboardOverviewPage;