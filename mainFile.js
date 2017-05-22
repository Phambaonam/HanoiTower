/* declare input parameter stored value fixed*/
const totalPiles = 3
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
const checkNumber = Number

/* class Piles */
class Pile {
    constructor(namePile) {
        this.pile = namePile
    }

    drawPile(myDisks) {
        let cx = (margin + piles.widthThicks) * (this.pile - 1) + margin + piles.widthThicks / 2 - piles.widthPiles / 2
        svg.append('rect') // create thick
            .attr('x', this.pile * margin + (this.pile - 1) * piles.widthThicks)
            .attr('y', piles.heightPiles * (myDisks + 1) + cySvg)
            .attr('width', piles.widthThicks)
            .attr('height', piles.heightThicks)
            .style('fill', '#333030')
        svg.append('rect') // create pile
            .attr("x", cx)
            .attr("y", cySvg)
            .attr('width', piles.widthPiles)
            .attr('height', piles.heightPiles * (myDisks + 1))
            .style("fill", '#333030')
    }
}
/* class Disk*/
class Disk {
    constructor(nameDisk, signDisk) {
        this.nameDisk = nameDisk
        this.signDisk = signDisk
        this.first_x = 0 // tọa độ của đĩa khi không có cột
        this.first_y = signDisk * disk.heightDisks // tọa độ của đĩa khi không có cột
        this.height = signDisk * disk.heightDisks + disk.heightDisks * 2
    }

    drawDisk(totalDisks) {
        let cx = margin + this.signDisk * disk.heightDisks / 2
        let cy = (totalDisks - this.signDisk) * disk.heightDisks + disk.heightDisks + cySvg
        let width = piles.widthThicks - 2 * this.signDisk * disk.heightDisks / 2
        const myClass = ' color'
        // d3.selectAll('svg > *').remove()
        svg.append("rect")
            .attr("x", cx) // tọa độ của đĩa khi  có cột
            .attr("y", cy) // tọa độ của đĩa khi  có cột
            .attr("width", width) // Chieu rong cua floor
            .attr("height", disk.heightDisks) // Chieu cao cua floor
            .classed('disk' + this.signDisk + myClass, true)  // dùng class selector để di chuyển đúng đĩa
            .style("fill", function () {
                return "hsl(" + Math.random() * 360 + ",100%,60%)";
            });
    }
}

/* class Tower*/
class Tower {
    constructor(nameTower, arrDisk) {
        this.nameTower = nameTower
        this.arrDisk = arrDisk
    }

    tower() {
        return {
            nameTower: this.nameTower,
            arrDisk: this.arrDisk
        }
    }
}

/* class GameEngine*/
class GameEngine {
    constructor() {
        this.data = []
        this.count = 0
    }

    /*change distance when disks moved */
    getDistance(disk1, disk2) {
        if ((disk1 === "towerA" && disk2 === "towerB") || (disk1 === "towerB" && disk2 === "towerC")) {
            return distancePiles;
        } else if ((disk1 === "towerB" && disk2 === "towerA") || (disk1 === "towerC" && disk2 === "towerB"))
            return -distancePiles
        else if ((disk1 === "towerA" && disk2 === "towerC")) {
            return distancePiles * 2;
        } else return -distancePiles * 2;
    }

    /* move disk to other tower*/
    updateDisk(nameDisk, fromTower, toTower) {
        fromTower.arrDisk.shift();
        toTower.arrDisk.unshift(nameDisk);
    }

    returnData(totalDisks, towerA, towerB, towerC) {
        if (totalDisks > 0) {
            this.returnData(totalDisks - 1, towerA, towerC, towerB)
            // console.log("Move " + nameDisks[totalDisks - 1] + " from " + towerA + " to " + towerC)
            // console.log(`Move disk ${totalDisks} from ${towerA.nameTower} to ${towerC.nameTower}`)
            this.data.push([arrDisks[totalDisks - 1], towerA, towerC])
            this.returnData(totalDisks - 1, towerB, towerA, towerC)
            this.count++
        }
        return this.data
    }

    /* move disk*/
    moveDisk(data, totalDisks) {
        for (let i = 0; i < data.length; i++) {
            let x = this.getDistance(data[i][1].nameTower, data[i][2].nameTower)
            let begin_y = data[i][0].first_y
            let begin_x = data[i][0].first_x
            let count_disk = data[i][2].arrDisk.length
            let new_y = totalDisks * disk.heightDisks - (count_disk * disk.heightDisks) - begin_y
            let new_x = begin_x + x
            let height = -data[i][0].height
            this.updateDisk(data[i][0], data[i][1], data[i][2])
            d3.selectAll('.' + data[i][0].nameDisk)
                .transition()
                .delay(i * 3000)
                .duration(1000)
                .attr("transform", 'translate(' + begin_x + ',' + height + ')')
                .transition()
                .attr("transform", 'translate(' + new_x + ',' + height + ')')
                .transition()
                .attr('transform', 'translate(' + new_x + ',' + new_y + ')')
            data[i][0].first_x += x
        }
    }
}

let arrDisks = []
const arrTowers = [
    new Tower('towerA', arrDisks).tower(),
    new Tower('towerB', []).tower(),
    new Tower('towerC', []).tower()
]

/* Run application*/
create = () => {
    const totalDisks = checkNumber($("#myDisks").val())
    if (totalDisks > 0) {
        /* draw piles*/
        for (let pile = 1; pile <= totalPiles; pile++) {
            const myPiles = new Pile(pile)
            myPiles.drawPile(totalDisks)
        }
        /* draw disks*/
        let count = totalDisks
        for (let signDisk = 1; signDisk <= totalDisks; signDisk++) {
            arrDisks.push(new Disk('disk' + count, signDisk))
            let myDisk = new Disk(null, signDisk)
            myDisk.drawDisk(totalDisks)
            count--
        }
        /*
         const result = new GameEngine()
         const data = result.returnData(arrDisks.length, arrTowers[0], arrTowers[1], arrTowers[2])
         console.log('data of disks before move disk ', data);
         */
    } else {
        alert('Input invalid !')
    }
};

run = () => {
    const totalDisks = checkNumber($("#myDisks").val())
    const result = new GameEngine()
    const data = result.returnData(arrDisks.length, arrTowers[0], arrTowers[1], arrTowers[2])
    result.moveDisk(data, totalDisks)
    /*
     console.log('data of disks after move disk ', data);
     console.log('Total step: ', result.count);
     */
}