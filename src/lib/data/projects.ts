import type { Project } from '@/types';

export const projects: Project[] = [
  {
    name: 'Website Redesign for Acme Corp',
    description:
      'Complete overhaul of the existing company website to improve UX/UI and integrate new e-commerce features.',
    status: 'active',
    client_id: 'client-acme-001',
    milestones: [
      {
        title: 'Phase 1: Discovery & Planning',
        description:
          'Gather requirements, conduct user research, and finalize site map and wireframes.',
        due_date: '2025-07-15',
      },
      {
        title: 'Phase 2: Design & Prototyping',
        description:
          'Develop visual mockups and interactive prototypes for key pages.',
        due_date: '2025-08-30',
      },
      {
        title: 'Phase 3: Front-end Development',
        description:
          'Build out responsive front-end components based on approved designs.',
        due_date: '2025-10-15',
      },
    ],
  },
  {
    name: 'Mobile App Development for Widgets Inc.',
    description:
      'Creation of a new native mobile application for iOS and Android platforms to manage inventory.',
    status: 'active',
    client_id: 'client-widgets-002',
    milestones: [
      {
        title: 'Requirement Analysis',
        description:
          'Define core features, user flows, and technical specifications.',
        due_date: '2025-07-01',
      },
      {
        title: 'Database Schema Design',
        description:
          'Design and implement the backend database structure for inventory data.',
        due_date: '2025-07-20',
      },
      {
        title: 'Alpha Release',
        description:
          'Deploy an internal alpha version for initial testing and feedback.',
        due_date: '2025-09-05',
      },
    ],
  },
  {
    name: 'SEO Strategy for Global Solutions',
    description:
      'Develop and implement a comprehensive SEO strategy to improve organic search rankings and traffic.',
    status: 'on hold',
    client_id: 'client-global-003',
    milestones: [
      {
        title: 'Keyword Research',
        description:
          "Identify high-volume, low-competition keywords relevant to the client's business.",
        due_date: '2025-06-30',
      },
      {
        title: 'Competitor Analysis',
        description:
          'Analyze competitor SEO strategies and identify opportunities.',
        due_date: '2025-07-10',
      },
    ],
  },
  {
    name: 'CRM System Integration for Tech Innovators',
    description:
      'Integrate a new CRM system (Salesforce) with existing internal tools and databases.',
    status: 'completed',
    client_id: 'client-tech-004',
    milestones: [
      {
        title: 'System Audit & Needs Assessment',
        description:
          'Review current systems and define integration points and data mapping.',
        due_date: '2024-11-15',
      },
      {
        title: 'API Development & Testing',
        description:
          'Develop custom APIs for data exchange and conduct thorough testing.',
        due_date: '2025-01-30',
      },
      {
        title: 'User Training & Rollout',
        description:
          'Provide training sessions for staff and manage the system rollout.',
        due_date: '2025-03-20',
      },
    ],
  },
  {
    name: 'Social Media Campaign for Green Thumb Co.',
    description:
      'Design and execute a 3-month social media marketing campaign to increase brand awareness and engagement.',
    status: 'active',
    client_id: 'client-green-005',
    milestones: [
      {
        title: 'Content Calendar Creation',
        description:
          'Plan and schedule social media posts across various platforms.',
        due_date: '2025-07-05',
      },
      {
        title: 'Ad Creative Development',
        description:
          'Design visual assets and write copy for paid social advertisements.',
        due_date: '2025-07-15',
      },
      {
        title: 'Campaign Launch & Monitoring',
        description:
          'Launch the campaign and monitor performance, making real-time adjustments.',
        due_date: '2025-07-25',
      },
    ],
  },
  {
    name: 'Data Analytics Dashboard for Quantum Labs',
    description:
      'Develop an interactive dashboard to visualize key business metrics from various data sources.',
    status: 'active',
    client_id: 'client-quantum-006',
    milestones: [
      {
        title: 'Data Source Integration',
        description:
          'Connect to and extract data from disparate databases and APIs.',
        due_date: '2025-08-10',
      },
      {
        title: 'Dashboard UI/UX Design',
        description:
          'Design intuitive and visually appealing layouts for data presentation.',
        due_date: '2025-09-01',
      },
    ],
  },
  {
    name: 'E-commerce Platform Migration for ByteStream',
    description:
      'Migrate an existing online store from Magento to Shopify Plus, including product data and customer accounts.',
    status: 'on hold',
    client_id: 'client-byte-007',
    milestones: [
      {
        title: 'Platform Assessment & Planning',
        description: 'Evaluate existing setup and plan the migration strategy.',
        due_date: '2025-07-10',
      },
      {
        title: 'Data Export & Cleaning',
        description:
          'Export data from Magento and prepare it for import into Shopify.',
        due_date: '2025-07-30',
      },
    ],
  },
  {
    name: 'Internal Tool Development for Spark Innovations',
    description:
      'Build a custom web application to streamline internal project management workflows.',
    status: 'active',
    client_id: 'client-spark-008',
    milestones: [
      {
        title: 'User Stories & Wireframing',
        description:
          'Define user stories and create initial wireframes for key modules.',
        due_date: '2025-06-25',
      },
      {
        title: 'Backend API Development',
        description:
          'Develop robust APIs for data management and user authentication.',
        due_date: '2025-08-01',
      },
    ],
  },
  {
    name: 'Brand Identity Design for Horizon Media',
    description:
      'Create a new brand identity, including logo, color palette, typography, and brand guidelines.',
    status: 'completed',
    client_id: 'client-horizon-009',
    milestones: [
      {
        title: 'Concept Development',
        description: 'Brainstorm and present initial logo concepts.',
        due_date: '2025-01-10',
      },
      {
        title: 'Refinement & Finalization',
        description:
          'Refine chosen concept based on feedback and finalize all brand elements.',
        due_date: '2025-02-28',
      },
    ],
  },
  {
    name: 'Cloud Infrastructure Setup for Zenith Systems',
    description:
      'Design and implement a scalable and secure cloud infrastructure on AWS for their new service.',
    status: 'active',
    client_id: 'client-zenith-010',
    milestones: [
      {
        title: 'Architecture Planning',
        description:
          'Define the cloud architecture, including VPCs, subnets, and security groups.',
        due_date: '2025-07-20',
      },
      {
        title: 'Resource Provisioning (IaC)',
        description:
          'Provision all necessary AWS resources using Infrastructure as Code (Terraform).',
        due_date: '2025-09-05',
      },
    ],
  },
];
