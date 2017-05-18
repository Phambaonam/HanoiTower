let Disk = require('disk')

/* class Tower*/
class Tower {
    constructor(nameTower, nameDisks) {
        this.name = nameTower
        this.disk = new Disk(nameDisks).disk()
    }

    tower() {
        return {name: this.name, disks: this.disk}
    }
}

/* class GameEngine*/
let nameTowers = ['Tower A', 'Tower B', 'Tower C']
let nameDisks = [];
let tower1 = new Tower(nameTowers[0], nameDisks).tower()
let tower2 = new Tower(nameTowers[1], null).tower()
let tower3 = new Tower(nameTowers[2], null).tower();


class GameEngine {
    constructor() {
        this.data = []
        this.count = 0
    }

    move(totalDisks, towerA, towerB, towerC) {
        if (totalDisks > 0) {
            this.move(totalDisks - 1, towerA, towerC, towerB)
            console.log("Move " + nameDisks[totalDisks - 1] + " from " + towerA + " to " + towerC)
            this.data.push([nameDisks[totalDisks - 1], towerA, towerC])
            this.move(totalDisks - 1, towerB, towerA, towerC)
            this.count++
        }
        console.log(this.data);
        return this.data
    }
}
let result = new GameEngine()

result.move()
