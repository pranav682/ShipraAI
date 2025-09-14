import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { WorkflowDetailsContent } from '@/components/workflows/workflow-details-content';
import { allWorkflows } from '@/lib/data/workflow-data';

interface WorkflowDetailsPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return allWorkflows.map((workflow) => ({
    id: workflow.id,
  }));
}

export default function WorkflowDetailsPage({ params }: WorkflowDetailsPageProps) {
  return (
    <DashboardLayout>
      <WorkflowDetailsContent workflowId={params.id} />
    </DashboardLayout>
  );
}