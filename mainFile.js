/* declare input parameter stored value fixed*/
const myPiles = 3
const margin = 120
const svg = d3.select('.disks')
    .append('svg')
    .attr('width', $('.disks').width() - margin)
    .attr('height', $('.disks').height())
const piles = {
    widthPiles: 10,
    heightPiles: 40,
    widthThicks: ($('.disks').width() - 4 * margin) / 3,
    heightThicks: 20
}

const disk = {
    heightDisks: 40
}
const distancePiles = piles.widthThicks + margin
const cySvg = 100
const size = 20

/* class Piles */
class Piles {
    constructor(piles) {
        this.piles = piles
    }

    drawPiles(pile, myDisks) {
        this.cx = (margin + piles.widthThicks) * (pile - 1) + margin + piles.widthThicks / 2 - piles.widthPiles / 2
        svg.append('rect') // create thick
            .attr('x', pile * margin + (pile - 1) * piles.widthThicks)
            .attr('y', piles.heightPiles * (myDisks + 1) + cySvg)
            .attr('width', piles.widthThicks)
            .attr('height', piles.heightThicks)
            .style('fill', '#333030')
        svg.append('rect') // create pile
            .attr("x", this.cx)
            .attr("y", cySvg)
            .attr('width', piles.widthPiles)
            .attr('height', piles.heightPiles * (myDisks + 1))
            .style("fill", '#333030')
    }
}

/* class Disk*/
class Disk {
    // defined width, height, margin
    constructor(nameDisks) {
        this.nameDisks = nameDisks
    }

    drawDisk(Disks) {
        this.cx = margin + this.nameDisks * size
        this.cy = (Disks - this.nameDisks) * disk.heightDisks + disk.heightDisks + cySvg
        this.width = piles.widthThicks - 2 * this.nameDisks * size
        this.class = ' color'
        // d3.selectAll('svg > *').remove()
        svg.append("rect")
            .attr("x", this.cx) // Toa do x cua floor
            .attr("y", this.cy) // Toa do y cua floor
            .attr("width", this.width) // Chieu rong cua floor
            .attr("height", disk.heightDisks)
            .classed('disk' + this.nameDisks + this.class, true) // Chieu cao cua floor
            .style("fill", function () {
                return "hsl(" + Math.random() * 360 + ",100%,60%)";
            });
    }
}

/* class Tower*/
class Tower {
    constructor(nameTowers, arrDisk) {
        this.name = nameTowers
        this.arrDisk = arrDisk
    }

    tower() {
        return {
            name: this.name,
            arrDisk: this.arrDisk
        }
    }
}

/* class GameEngine*/
class GameEngine {
    constructor() {
        this.data = []
        this.count = 0
        const disk = new Disk()
        this.newDisk_x = disk.newDisk_x
        this.newDisk_y = disk.newDisk_y
        this.height = disk.height
    }

    /*change distance when disks moved */
    getDistance(disk1, disk2) {
        if ((disk1 === "towerA" && disk2 === "towerB") || (disk1 === "towerB" && disk2 === "towerC")) {
            return distancePiles;
        } else if ((disk1 === "towerB" && disk2 === "towerA") || (disk1 === "towerC" && disk2 === "towerB"))
            return -distancePiles;
        else if ((disk1 === "towerA" && disk2 === "towerC")) {
            return distancePiles * 2;
        } else return -distancePiles * 2;
    }

    /* move disk to other tower*/
    updateDisk(nameDisk, fromTower, toTower) {
        fromTower.arrDisk.shift();
        toTower.arrDisk.unshift(nameDisk);
    }

    move(totalDisks, towerA, towerB, towerC) {
        if (totalDisks > 0) {
            this.move(totalDisks - 1, towerA, towerC, towerB)
            // console.log("Move " + nameDisks[totalDisks - 1] + " from " + towerA + " to " + towerC)
            console.log(`Move disk ${totalDisks} from ${towerA.name} to ${towerC.name}`)
            this.data.push([nameDisks[totalDisks - 1], towerA, towerC])
            this.move(totalDisks - 1, towerB, towerA, towerC)
            this.count++
        }
        return this.data
    }

    /* draw new disk*/
    draw(data, totalDisks) {
        for (let i = 0; i < data.length; i++) {
            this.x = this.getDistance(data[i][1].name, data[i][2].name)
            this.begin_y = data[i][0].this.newDisk_y
            this.begin_x = data[i][0].this.newDisk_x
            this.count_disk = data[i][2].arrDisk.length
            this.new_y = totalDisks * this.heightDisks - (this.count_disk * this.heightDisks) - this.begin_y
            this.new_x = this.begin_x + this.x
            this.newHeight = -data[i][0].this.height
            this.updateDisk(data[i][0], data[i][1], data[i][2])
            d3.selectAll('.' + data[i][0].nameDisks)
                .transition()
                .delay(i * 3000)
                .duration(1000)
                .attr("transform", 'translate(' + this.begin_x + ',' + this.newHeight + ')')
                .transition()
                .attr("transform", 'translate(' + this.new_x + ',' + this.newHeight + ')')
                .transition()
                .attr('transform', 'translate(' + this.new_x + ',' + this.new_y + ')')

            data[i][0].newDisk_x += this.x
        }
    }
}

let result = new GameEngine()

let arrDisks = []

let nameDisks = arrDisks

let arrTowers = [
    new Tower('towerA', nameDisks).tower(),
    new Tower('towerB', []).tower(),
    new Tower('towerC', []).tower()
]
/*Tao cot */
createPiles = (piles, myDisks) => {
    let Piles = new Piles(myPiles)
    for (let i = 1; i <= piles; i++) {
        Piles.drawPiles(i, myDisks)
    }
}
/* Tao dia */
buildFloors = (disks) => {
    for (let i = 1; i <= disks; i++) {
        let Disk = new Disk(i)
        Disk.drawDisk(disks)
    }
}

/* Run application*/
create = () => {
    let myDisks = Number($("#myDisks").val())
    if (Number(myDisks)) {
        createPiles(myPiles, myDisks)
        buildFloors(myDisks)
    } else {
        alert('Input invalid !')
    }
};

run = () => {
    let data = result.move(nameDisks.length, arrTowers[0], arrTowers[1], arrTowers[2])
    const totalDisks = arrDisks.length
    result.draw(data, totalDisks)
    console.log('nameDisks', nameDisks);
    console.log('Total step: ', result.count);
}
