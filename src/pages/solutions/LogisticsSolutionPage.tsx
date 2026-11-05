import React from 'react';
import { DomainSolutionTemplate } from '../../components/solutions/DomainSolutionTemplate';
import { DOMAIN_SOLUTIONS_DATA } from '../../data/domainSolutionsData';

export const LogisticsSolutionPage: React.FC = () => {
  const data = DOMAIN_SOLUTIONS_DATA['logistics-shipping'];
  return <DomainSolutionTemplate data={data} />;
};

export default LogisticsSolutionPage;

