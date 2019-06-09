import React, { useState, useCallback } from 'react';
import { useFetch } from 'react-use-query';
import { Dropdown } from 'semantic-ui-react'
import { Post } from './Post'

export const Posts = () => {
  const [state, response] = useFetch('https://jsonplaceholder.typicode.com/posts');
  const [selectedPost, setSelectedPost] = useState(undefined);
  const onPostSelected = useCallback(
    (item, { value }) => setSelectedPost(value),
    []
  );
  switch (state) {
    case 'loading':
      return 'Please wait while loading';
    case 'loaded':
      const options = response.map(post => ({
        key: post.id,
        value: post.id,
        text: post.title
      }))
      return (<>
        <Dropdown
          placeholder='Select a post'
          fluid
          search
          selection
          options={options}
          value={selectedPost}
          onChange={onPostSelected}
        />
        {selectedPost && (<><br></br> <Post id={selectedPost} /></>)}
      </>)
    default:
      return 'Sorry, shits happen';
  }
}