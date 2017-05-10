/**
 * Created by doremonsun on 5/10/17.
 */
let Tower = require('./tower')
let nameTowers = ['Tower A', 'Tower B', 'Tower C']
let nameDisks = ['disk 1', 'disk 2', 'disk 3']
let tower1 = new Tower(nameTowers[0], nameDisks).tower()
let tower2 = new Tower(nameTowers[1], null).tower()
let tower3 = new Tower(nameTowers[2], null).tower();

class GameEngine {
    constructor() {
        this.data = []
        this.count = 0
    }

    /***
     *
     * @param totalDisks
     * @param towerA
     * @param towerB
     * @param towerC
     * @returns {Array}
     */
    move(totalDisks, towerA, towerB, towerC) {
        if (totalDisks > 0) {
            this.move(totalDisks - 1, towerA, towerC, towerB)
            // console.log("Move " + nameDisks[n - 1] + " from " + a + " to " + c)
            this.data.push([nameDisks[totalDisks - 1], towerA, towerC])
            this.move(totalDisks - 1, towerB, towerA, towerC)
            this.count++
        }
        return this.data
    }

}
let result = new GameEngine()
console.log(result.move(nameDisks.length, tower1.name, tower2.name, tower3.name));
console.log('Total steps: ', result.count);




