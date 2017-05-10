/**
 * Created by doremonsun on 5/10/17.
 */
/***
 * returns list disks which  we had
 */
class Disk {
    constructor(diameter) {
        this.diameter = diameter
    }

    disk() {
        return this.diameter
    }
}
module.exports = Disk
