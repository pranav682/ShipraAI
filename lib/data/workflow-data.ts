export const workflowDetails = {
  id: '1',
  name: 'Customer Onboarding Sequence',
  description: 'Automated welcome emails, account setup, and first-week engagement',
  category: 'Email Marketing',
  deliveredDate: '2024-01-20',
  consultant: 'Sarah Chen',
  status: 'active',
  version: '2.1.0',
  lastRun: '2 hours ago',
  metrics: {
    totalRuns: 1247,
    successRate: 98.5,
    dataGenerated: '2.3K new customers',
    timesSaved: '45h/week',
    roi: '340%',
    avgExecutionTime: '2.3 minutes',
    totalCost: '$127.50'
  },
  features: [
    'Personalized welcome emails',
    'Automated account verification',
    'Progressive onboarding steps',
    'Engagement tracking',
    'Churn prediction alerts'
  ],
  integrations: ['Mailchimp', 'Salesforce', 'Slack', 'Google Analytics'],
  triggers: [
    'New user registration',
    'Account verification completed',
    'First login detected'
  ]
};

export const workflowRuns = [
  {
    id: 'run-1247',
    runNumber: 1247,
    startTime: '2024-01-25T14:30:00Z',
    endTime: '2024-01-25T14:32:15Z',
    duration: '2m 15s',
    status: 'success',
    trigger: 'New user registration',
    triggeredBy: 'john.doe@example.com',
    recordsProcessed: 1,
    dataGenerated: '1 customer record',
    executionCost: 0.12,
    version: '2.1.0',
    steps: [
      { name: 'Validate Email', duration: '0.5s', status: 'success' },
      { name: 'Create Welcome Email', duration: '1.2s', status: 'success' },
      { name: 'Send Email', duration: '2.1s', status: 'success' },
      { name: 'Update CRM', duration: '0.8s', status: 'success' },
      { name: 'Log Analytics', duration: '0.3s', status: 'success' }
    ],
    output: {
      emailsSent: 1,
      emailsDelivered: 1,
      emailsOpened: 0,
      emailsClicked: 0,
      bounceRate: 0,
      crmRecordsUpdated: 1
    }
  },
  {
    id: 'run-1246',
    runNumber: 1246,
    startTime: '2024-01-25T13:45:00Z',
    endTime: '2024-01-25T13:47:30Z',
    duration: '2m 30s',
    status: 'success',
    trigger: 'New user registration',
    triggeredBy: 'jane.smith@example.com',
    recordsProcessed: 1,
    dataGenerated: '1 customer record',
    executionCost: 0.12,
    version: '2.1.0',
    steps: [
      { name: 'Validate Email', duration: '0.4s', status: 'success' },
      { name: 'Create Welcome Email', duration: '1.1s', status: 'success' },
      { name: 'Send Email', duration: '2.3s', status: 'success' },
      { name: 'Update CRM', duration: '0.7s', status: 'success' },
      { name: 'Log Analytics', duration: '0.2s', status: 'success' }
    ],
    output: {
      emailsSent: 1,
      emailsDelivered: 1,
      emailsOpened: 1,
      emailsClicked: 1,
      bounceRate: 0,
      crmRecordsUpdated: 1
    }
  },
  {
    id: 'run-1245',
    runNumber: 1245,
    startTime: '2024-01-25T12:20:00Z',
    endTime: '2024-01-25T12:22:45Z',
    duration: '2m 45s',
    status: 'warning',
    trigger: 'Account verification completed',
    triggeredBy: 'mike.wilson@example.com',
    recordsProcessed: 1,
    dataGenerated: '1 customer record',
    executionCost: 0.12,
    version: '2.1.0',
    steps: [
      { name: 'Validate Email', duration: '0.6s', status: 'success' },
      { name: 'Create Welcome Email', duration: '1.3s', status: 'success' },
      { name: 'Send Email', duration: '2.8s', status: 'warning' },
      { name: 'Update CRM', duration: '0.9s', status: 'success' },
      { name: 'Log Analytics', duration: '0.4s', status: 'success' }
    ],
    output: {
      emailsSent: 1,
      emailsDelivered: 1,
      emailsOpened: 0,
      emailsClicked: 0,
      bounceRate: 0,
      crmRecordsUpdated: 1
    },
    warnings: ['Email delivery took longer than expected (2.8s vs 2.0s average)']
  },
  {
    id: 'run-1244',
    runNumber: 1244,
    startTime: '2024-01-25T11:15:00Z',
    endTime: '2024-01-25T11:15:45Z',
    duration: '45s',
    status: 'failed',
    trigger: 'New user registration',
    triggeredBy: 'invalid@email',
    recordsProcessed: 0,
    dataGenerated: '0 records',
    executionCost: 0.05,
    version: '2.1.0',
    steps: [
      { name: 'Validate Email', duration: '0.3s', status: 'failed' },
      { name: 'Create Welcome Email', duration: '0s', status: 'skipped' },
      { name: 'Send Email', duration: '0s', status: 'skipped' },
      { name: 'Update CRM', duration: '0s', status: 'skipped' },
      { name: 'Log Analytics', duration: '0.2s', status: 'success' }
    ],
    output: {
      emailsSent: 0,
      emailsDelivered: 0,
      emailsOpened: 0,
      emailsClicked: 0,
      bounceRate: 0,
      crmRecordsUpdated: 0
    },
    errors: ['Invalid email format: invalid@email']
  },
  {
    id: 'run-1243',
    runNumber: 1243,
    startTime: '2024-01-25T10:30:00Z',
    endTime: '2024-01-25T10:32:10Z',
    duration: '2m 10s',
    status: 'success',
    trigger: 'First login detected',
    triggeredBy: 'sarah.johnson@example.com',
    recordsProcessed: 1,
    dataGenerated: '1 customer record',
    executionCost: 0.12,
    version: '2.0.9',
    steps: [
      { name: 'Validate Email', duration: '0.4s', status: 'success' },
      { name: 'Create Welcome Email', duration: '1.0s', status: 'success' },
      { name: 'Send Email', duration: '2.0s', status: 'success' },
      { name: 'Update CRM', duration: '0.6s', status: 'success' },
      { name: 'Log Analytics', duration: '0.3s', status: 'success' }
    ],
    output: {
      emailsSent: 1,
      emailsDelivered: 1,
      emailsOpened: 1,
      emailsClicked: 0,
      bounceRate: 0,
      crmRecordsUpdated: 1
    }
  }
];

// Additional workflow data for other workflows
export const allWorkflows = [
  {
    id: '1',
    name: 'Customer Onboarding Sequence',
    category: 'Email Marketing'
  },
  {
    id: '2', 
    name: 'AI Lead Scoring Engine',
    category: 'Sales Automation'
  },
  {
    id: '3',
    name: 'Financial Reporting Dashboard', 
    category: 'Finance'
  }
];