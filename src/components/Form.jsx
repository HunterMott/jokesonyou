import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL, config } from '../services';

function Form(props) {
  const [setup, setSetup] = useState('');
  const [punchline, setPunchline] = useState('');
  const [author, setAuthor] = useState('');

  const history = useHistory();
  const params = useParams();
  console.log(params);

  useEffect(() => {
    if (props.jokes.length > 0 && params.id) {
      const joke = props.jokes.find((joke) => joke.id === params.id);
      setSetup(joke.fields.setup)
      setPunchline(joke.fields.punchline)
      setAuthor(joke.fields.author)
    }
  }, [props.jokes, params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = {
      setup,
      punchline,
      author
    };
    if (params.id) {
      const jokeURL = `${baseURL}/${params.id}`
      await axios.put(jokeURL, { fields }, config)
    } else {
      await axios.post(baseURL, { fields }, config)
    }

    props.setToggleFetch((prev) => !prev)
    history.push('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="setup">Setup</label>
      <input name="setup" type='text' value={setup} onChange={(e) => setSetup(e.target.value)} />
      <label htmlFor="punchline">Punchline</label>
      <input name='punchline' type="text" value={punchline} onChange={(e) => setPunchline(e.target.value)} />
      <label htmlFor="author">Author</label>
      <input name='author' type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <button type='submit' >HAHA</button>
    </form>

  )
}


export default Form;