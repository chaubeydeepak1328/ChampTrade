import { Trophy } from 'lucide-react';
import MyOverviewWidgets from './MyOverviewWidgets';
import EarningsBreakdown from './EarningsBreakdown';
import ReferralStats from './ReferralStats';
import PlanProgress from './PlanProgress';
import TeamOverview from './TeamOverview';
import ClaimWithdrawPanel from './ClaimWithdrawPanel';
import BuyTccPanel from './BuyTccPanel';
import SupportTicketsPanel from './SupportTicketsPanel';
import LatestTransactionsPanel from './LatestTransactionsPanel';
import Panel from './Panel';

const MainDashboardPanel = () => {
  return (
    <main className="flex-1 bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <MyOverviewWidgets />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Panel title="My Earnings">
              <EarningsBreakdown />
            </Panel>
            
            <Panel title="My Team">
              <TeamOverview />
            </Panel>
            
            <Panel title="Referral Network">
              <ReferralStats />
            </Panel>
            
            <Panel title="Plan & Reinvestment Progress">
              <PlanProgress />
            </Panel>

            <Panel title="Latest Transactions">
              <LatestTransactionsPanel />
            </Panel>
          </div>
          
          <div className="space-y-6">
            <Panel title="Claim / Withdraw">
              <ClaimWithdrawPanel />
            </Panel>
            
            <Panel title="Buy TCC">
              <BuyTccPanel />
            </Panel>

            <Panel title="Support Tickets">
              <SupportTicketsPanel />
            </Panel>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainDashboardPanel;