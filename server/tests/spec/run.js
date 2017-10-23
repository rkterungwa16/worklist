import Jasmine from 'jasmine';

const jasmine = new Jasmine();
// modify this line to point to your jasmine.json
jasmine.loadConfigFile('server/tests/spec/support/jasmine.json');
jasmine.execute();
