import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient();
  
  const fetchQuery = useQuery("anecdotes", getAnecdotes, {
    retry: false,
    refetchOnWindowFocus: false
  });

  const anecdotes = fetchQuery.data;

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: votedAnecdote => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      const anecdoteToVote = anecdotes.find(e => e.id === votedAnecdote.id);
      anecdoteToVote.votes = votedAnecdote.votes
    }
  });
  
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1});
  }
  
  if (fetchQuery.isLoading) {
    return <div>Loading...</div>
  }

  if ( fetchQuery.isError ) {
    return <div>Problem communicating with the server.</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
