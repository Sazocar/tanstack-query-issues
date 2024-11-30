import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getIssues } from '../actions';
import { State } from '../interfaces';

interface Props {
  state: State;
  selectedLabels: string[];
}

export const useIssues = ({ state, selectedLabels }: Props) => {
  const [page, setPage] = React.useState(1);

  const issuesQuery = useQuery({
    queryKey: ['issues', { state, selectedLabels, page }],
    queryFn: () => getIssues(state, selectedLabels, page),
    staleTime: 1000 * 60,
  });

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;

    setPage(page + 1);
  };

  const previusPage = () => {
    if (page === 1) return;

    setPage((previousPage) => previousPage - 1);
  };

  React.useEffect(() => {
    setPage(1);
  }, [state]);

  React.useEffect(() => {
    setPage(1);
  }, [selectedLabels]);

  return {
    issuesQuery,
    page,
    nextPage,
    previusPage,
  };
};
