import React from 'react'
import Link from 'next/link'
import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
import {capitalize,} from 'lodash'

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            shows: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    async handleSubmit(event) {
        const inputValue = document.querySelector('#showname').value;
        event.preventDefault();
        const res = await fetch(`https://api.tvmaze.com/search/shows?q=${inputValue}`);
        const data = await res.json();
        this.setState({shows: data})
    };

    reset() {
        this.setState({
            value: '',
            shows: '',
        })
    }

    render() {
        return (
            <Layout>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        show:
                        <input id="showname" type="text" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                    <input type="button" value="Reset" onClick={this.reset}/>
                </form>

                {this.state.shows !== '' &&
                <div>
                    <h1>{capitalize(document.querySelector('#showname').value)} TV Shows</h1>
                    <p>
                        {
                            this.state.shows.length === 0
                            && `A keresett ${capitalize(document.querySelector('#showname').value)} show nem található`
                        }
                    </p>
                    <ul>
                        {this.state.shows.map(({show}) => (
                            <li key={show.id}>
                                <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                                    <a>{show.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <pre>{this.state.shows.length !== 0 && JSON.stringify(this.state.shows, null, 2)}</pre>
                </div>}

                <style jsx>{`
                form {
                margin-top: 30px;
                }

                p {
                color: red;
                }
                `}</style>
            </Layout>
        );
    }
}

export default InputForm