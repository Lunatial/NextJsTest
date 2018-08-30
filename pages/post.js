import React from 'react'
import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

const Post = (props) => (
    <Layout>

        <h1>{props.show.name}</h1>
        <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
        <img src={props.show.image && props.show.image.medium}/>
        {props.show.genres.length !== 0 && <p>Genre: {props.show.genres.map(show => show + ", ")}</p>}
        <br/>
        <Link href="/">
            <button>Vissza</button>
        </Link>
        <br/>
        <pre>{JSON.stringify(props.show, null, 2)}</pre>
    </Layout>
);

Post.getInitialProps = async function (context) {
    const {id} = context.query
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
    const show = await res.json()

    console.log(`Fetched show: ${show.name}`)

    return {show}
};

export default Post