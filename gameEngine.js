/**
 * Created by doremonsun on 5/10/17.
 */
let Tower = require('./tower')
let nameTowers = ['Tower A', 'Tower B', 'Tower C']
let nameDisks = [];
let tower1 = new Tower(nameTowers[0], nameDisks).tower()
let tower2 = new Tower(nameTowers[1], null).tower()
let tower3 = new Tower(nameTowers[2], null).tower();
let allResults
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
            console.log("Move " + nameDisks[totalDisks - 1] + " from " + towerA + " to " + towerC)
            this.data.push([nameDisks[totalDisks - 1], towerA, towerC])
            this.move(totalDisks - 1, towerB, towerA, towerC)
            this.count++
            allResults = this.data
        }
//            console.log(this.data);
        return allResults
    }

}





