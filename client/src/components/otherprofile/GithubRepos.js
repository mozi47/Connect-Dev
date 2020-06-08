import React,{useEffect} from 'react'
import {connect} from "react-redux"
import {getGithubRepos} from "../../action/profile"
import Spinner from '../layout/Spinner'

const GithubRepos = ({getGithubRepos, username, repos}) => {
    
    useEffect(()=>{
        getGithubRepos(username)
    },[getGithubRepos])

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">Github Repos</h2>
            {repos===null ? (<Spinner/>):(repos.map(repo=>(
                <div key={repo._id} className="repo bg-white p-1 my-1">
                    <div>
                        <h4>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferer" className="nopener noreferer">
                                {repo.name}
                            </a>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div>
                        <ul>
                            <li className="badge badge-primary">
                                Stars: {repo.stargazers_count}
                            </li>
                            <li className="badge badge-dark">
                                Forks: {repo.forks_count}
                            </li>
                            <li className="badge badge-light">
                                Watchers: {repo.watchers_count}
                            </li>
                        </ul>
                    </div>
                </div>
            )))}
        </div>
    )
}

const mapStateToProps= state=>({
    repos: state.Profile.repos
})

export default connect(mapStateToProps,{getGithubRepos})(GithubRepos)
