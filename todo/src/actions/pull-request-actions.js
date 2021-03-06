import * as ActionType from '../constants/ActionTypes';
import * as GitHub from '../constants/github-url';
import request from 'axios';

export function pr() {
  return {
    type: 'aaaa'
  };
}

export function recievePullRequest(prs) {
  return {
    type: ActionType.RECIEVE_PULL_REQUESTS,
    prs
  };
}

export function getPullRequests(repo) {
  return dispatch => {
    console.log(GitHub.prsUrl(repo));
    request.get(GitHub.prsUrl(repo)).then( res => {
      console.log('PRS');
      console.dir(res.data);
      console.dir(res.data.map(e => {return e.name;}));
      console.dir(recievePullRequest(res.data.map(e => {return e.name;})));
      dispatch(recievePullRequest(res.data.map(e => {return e.name;})));
    }).catch( err => {
      console.error(err);
    });
  };
}


export function recieveRepositories(repos) {
  return {
    type: ActionType.RECIEVE_REPOSITORIES,
    repos
  }
}

export function gerRepositories(org) {
  return dispatch => {
    console.log(GitHub.reposUrl(org));
    request.get(GitHub.reposUrl(org)).then( res => {
      dispatch(recieveRepositories(res.data.map(e => {return e.name;})));
    }).catch( err => {
      console.error(err);
    });
  }
}
