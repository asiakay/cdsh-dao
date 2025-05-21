import type { Proposal, User } from '@/types';

export const mockUser: User = {
  id: 'user1',
  name: 'Alice Wonderland',
  tokens: 100,
  delegatedTo: null,
  avatarUrl: 'https://placehold.co/100x100.png',
};

export const mockProposals: Proposal[] = [
  {
    id: 'consentToolkitV2',
    title: 'Adopt Dynamic Consent Toolkit v2.0',
    description: 'Integrate advanced consent mechanisms with audio scripts for oral communities and multilingual support.',
    longDescription: 'This proposal aims to enhance our platform\'s inclusivity by adopting the Dynamic Consent Toolkit v2.0. Key features include: customizable audio scripts for informed consent in oral communities, support for 15+ languages, and granular consent options for data sharing. The upgrade will also improve auditability and compliance with evolving global data privacy regulations. Expected benefits include increased user trust, broader community reach, and a stronger ethical framework for data handling.',
    budgetImpact: 5000, // USD
    votes: {
      yes: 320,
      no: 150,
      abstain: 30,
    },
    status: 'active',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    proposer: 'Dr. Elara Vance',
    discussionThreadSimulated: `**UserA:** Sounds promising! How will the budget be allocated?\n**UserB:** I'm concerned about the technical lift. Do we have the expertise?\n**Proposer:** The budget covers licensing, integration, and training. We'll partner with experts for the initial setup.\n**UserC:** What about accessibility for visually impaired users with the audio scripts? Will there be transcripts?\n**Proposer:** Yes, transcripts and screen-reader compatibility are part of the v2.0 toolkit's accessibility features.`
  },
  {
    id: 'researchGrantBlockchain',
    title: 'Fund Research Grant for Blockchain in Supply Chains',
    description: 'Allocate resources to study the feasibility and impact of blockchain technology on supply chain transparency.',
    longDescription: 'This proposal seeks funding for a 6-month research grant focused on exploring blockchain applications within ethical supply chains. The research will investigate potential benefits like enhanced transparency, traceability, and fair labor practices verification. Deliverables include a comprehensive feasibility report, a pilot program design, and recommendations for potential CDSH integration. The grant will be awarded through a competitive application process managed by an independent review committee.',
    budgetImpact: 15000,
    votes: {
      yes: 450,
      no: 80,
      abstain: 20,
    },
    status: 'active',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    proposer: 'Prof. Ben Carter',
    discussionThreadSimulated: `**UserX:** This is a significant budget. What's the expected ROI?\n**UserY:** Blockchain is hyped. Is it really applicable here or just a buzzword?\n**Proposer:** The ROI is primarily in potential long-term efficiency gains, risk mitigation, and enhanced brand reputation. The research aims to provide concrete data on its applicability for our specific context.\n**UserZ:** Who will oversee the grant awarding process to ensure fairness?\n**Proposer:** An independent review committee consisting of academic and industry experts, with no direct CDSH operational staff, will be formed.`
  },
  {
    id: 'communityModerationProgram',
    title: 'Establish Community Moderation Program',
    description: 'Create a structured program for training and empowering community moderators to ensure a healthy online environment.',
    longDescription: 'To foster a more inclusive and respectful online environment, this proposal suggests establishing a formal Community Moderation Program. This includes developing clear guidelines, a comprehensive training curriculum for volunteer moderators, and tools for reporting and addressing violations. The program aims to reduce spam, harassment, and misinformation, thereby improving user experience and engagement. A small stipend for lead moderators is included in the budget.',
    budgetImpact: 2500,
    votes: {
      yes: 120,
      no: 280,
      abstain: 15,
    },
    status: 'active',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    proposer: 'Community Working Group',
    discussionThreadSimulated: `**User1:** I like the idea, but how do we prevent moderator bias?\n**User2:** What are the criteria for selecting moderators?\n**Proposer:** The program will include bias training and a clear appeals process. Moderators will be selected based on community standing, activity, and commitment to fairness, through an application and vetting process.\n**User3:** Is the budget sufficient for stipends and tools?\n**Proposer:** The initial budget is for a pilot phase. If successful, we may propose an increase for scaling.`
  },
   {
    id: 'dataPrivacyAuditTool',
    title: 'Develop an Open Source Data Privacy Audit Tool',
    description: 'Fund the development of a tool to help users and organizations audit data privacy practices.',
    longDescription: 'This proposal is to fund the creation of an open-source tool that allows users and small organizations to perform basic data privacy audits. The tool would check for common vulnerabilities, assess compliance with standard privacy policies (like GDPR consent banners), and provide educational resources. The goal is to empower individuals and smaller entities to better understand and manage their data privacy posture. The development will be community-driven with oversight from privacy experts.',
    budgetImpact: 8000,
    votes: {
      yes: 50,
      no: 20,
      abstain: 5,
    },
    status: 'pending',
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days from now
    proposer: 'Privacy First Initiative',
    discussionThreadSimulated: `**UserA:** This is a great idea! Who would maintain it long-term?\n**UserB:** How will it differ from existing commercial tools?\n**Proposer:** We aim for a non-profit foundation to oversee long-term maintenance. It will be free and focus on education and basic checks, not advanced enterprise features, making it accessible to those who can't afford commercial solutions.`
  },
];

export function getProposalById(id: string): Proposal | undefined {
  return mockProposals.find(p => p.id === id);
}
