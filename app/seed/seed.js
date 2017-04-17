import seedData from './seedData';
import saveDatainDb from './saveDataInDb';

export default function seed() {
    saveDatainDb(seedData);
}
