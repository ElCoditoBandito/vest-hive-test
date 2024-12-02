import React from 'react';
import { CreateProposal } from '@/components/voting/create-proposal';

export default function NewProposalPage() {
  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Proposal</h1>
      <CreateProposal
        onSubmit={async (data) => {
          'use server';
          // Server actions will be implemented later
          console.log('Creating proposal:', data);
        }}
      />
    </div>
  );
}