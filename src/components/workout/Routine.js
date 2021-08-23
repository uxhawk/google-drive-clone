export default class Routine {
    constructor(title, exercises) {
        this.title = title;
        this.exercises =  [ ...exercises ];
    }
}