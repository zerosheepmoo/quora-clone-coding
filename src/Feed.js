import React, { useEffect, useState } from 'react';
import './Feed.css';
import db from './firebase';
import Post from './Post';
import QuoraBox from './QuoraBox';

const Feed = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('questions')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => setPosts(snapshot.docs.map(
                doc => (({
                    id: doc.id,
                    question: doc.data()
                }))
            )))
    }, []);

    return (
        <div className='feed'>
            <QuoraBox />
            {posts.map(({ id, question }) => (
                <Post
                    key={id}
                    Id={id}
                    image={question.imageURL}
                    timestamp={question.timestamp}
                    question={question.question}
                    quoraUser={question.user}
                />
            ))}
        </div>
    )
}

export default Feed
