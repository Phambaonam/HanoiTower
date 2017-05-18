/**
 * Created by doremonsun on 5/10/17.
 */
/***
 * returns list disks which  we had
 */
class Disk {
    constructor(name) {
        this.name = name
    }

    draw() {
        return this.name
    }
}
module.exports = Disk
