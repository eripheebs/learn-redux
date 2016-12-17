import {List, Map} from 'immutable';

export function setEntries(state, entries){
  return state.set('entries', List(entries));
}

export function next(state){
  const entries = state.get('entries');
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
}

export function vote(state, entry){
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
}

//Using updateIn makes this pleasingly succinct. What the code expresses is "reach into the nested data structure path ['vote', 'tally', 'Trainspotting'], and apply this function there. If there are keys missing along the path, create new Maps in their place. If the value at the end is missing, initialize it with 0".
