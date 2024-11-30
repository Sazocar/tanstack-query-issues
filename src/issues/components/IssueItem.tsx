import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { GithubIssue, State } from '../interfaces';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getIssue, getIssueComments } from '../actions';
import { timeSince } from '../../helpers';

interface IssueItemProps {
  issue: GithubIssue;
}

export const IssueItem = ({ issue }: IssueItemProps) => {
  const { title, number, state, comments, user } = issue ?? {};

  const isIssueOpen = state === State.Open;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ['issues', issue.number],
      queryFn: () => getIssue(issue.number),
      staleTime: 1000 * 60,
    });

    queryClient.prefetchQuery({
      queryKey: ['issues', issue.number, 'comments'],
      queryFn: () => getIssueComments(issue.number),
      staleTime: 1000 * 60,
    });
  };

  return (
    <div
      onMouseEnter={prefetchData}
      className="animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800"
    >
      {isIssueOpen ? (
        <FiInfo size={30} color="red" className="min-w-10" />
      ) : (
        <FiCheckCircle size={30} color="green" className="min-w-10" />
      )}

      <div className="flex flex-col flex-grow px-2">
        <a
          onClick={() => navigate(`/issues/issue/${number}`)}
          className="hover:underline cursor-pointer"
        >
          {title}
        </a>
        <span className="text-gray-500">
          {`#${number} opened ${timeSince(issue.created_at)} ago by`}
          <span className="font-bold">{user.login}</span>
        </span>

        <div className="flex flex-wrap">
          {issue?.labels?.map((label) => (
            <span
              key={label.id}
              className="mr-2 px-2 py-1 text-xs text-white rounded-md"
              style={{ border: `1px solid #${label.color}` }}
            >
              {label.name}
            </span>
          ))}
        </div>
      </div>

      <img
        src={user.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{comments}</span>
      </div>
    </div>
  );
};
