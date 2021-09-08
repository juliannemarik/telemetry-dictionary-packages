import rollup from './rollup.json';

const authCategory = {
  id: 'Auth',
  definition: 'interactions involving authentication',
  actions: {}
};

class Dictionary {
  auth = authCategory
}

export const dictionary = rollup;
export default new Dictionary ();