import React from 'react';
import { LoadingSpinner } from '../../shared';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { State } from '../interfaces';

export const ListView = () => {
  const [state, setState] = React.useState(State.All);
  const [selectedLabels, setSelectedLabels] = React.useState<string[]>([]);

  const { issuesQuery, page, nextPage, previusPage } = useIssues({
    state,
    selectedLabels,
  });

  const issues = issuesQuery.data ?? [];

  const onLabelSelected = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(
        selectedLabels.filter((selectedLabels) => selectedLabels !== label)
      );
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <IssueList issues={issues} onStateChange={setState} state={state} />

            <div className="flex justify-between items-center">
              <button
                onClick={previusPage}
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all"
              >
                Preview
              </button>
              <span>{page}</span>
              <button
                onClick={nextPage}
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          selectedLabels={selectedLabels}
          onLabelSelected={onLabelSelected}
        />
      </div>
    </div>
  );
};
