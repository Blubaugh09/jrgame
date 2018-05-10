import Phaser, { Scene } from 'phaser';
import io from 'socket.io-client';
import Player from '../sprites/player';

class Town extends Scene {
    constructor() {
        super({ key: 'Town' });
    }

    init() {
        this.layers = {};
        this.player = new Player(this, 'Town');
    }

    create() {
        this.map = this.add.tilemap('map-town');
        this.tileset = this.map.addTilesetImage('town');

        for (let i = 0; i < this.map.layers.length; i++) {
            this.layers[i] = this.map.createStaticLayer(this.map.layers[i].name, this.tileset, 0, 0);
        }

        /* River */
        this.layers[6].setCollisionBetween(0, 1021);

        /* House 1 */
        this.layers[7].setCollisionBetween(105, 110);
        this.layers[7].setCollisionBetween(125, 130);
        this.layers[7].setCollisionBetween(145, 150);
        this.layers[7].setCollisionBetween(165, 170);

        /* House 2 */
        this.layers[7].setCollisionBetween(207, 207);
        this.layers[7].setCollisionBetween(226, 228);
        this.layers[7].setCollisionBetween(245, 249);
        this.layers[7].setCollisionBetween(264, 270);
        this.layers[7].setCollisionBetween(284, 290);
        this.layers[7].setCollisionBetween(304, 310);
        this.layers[7].setCollisionBetween(324, 330);
        this.layers[7].setCollisionBetween(344, 350);
        this.layers[7].setCollisionBetween(1661, 1663);

        /* Camps */
        this.layers[8].setCollisionBetween(5, 25);

        /* Trees */
        this.layers[9].setCollisionBetween(213, 215);
        this.layers[9].setCollisionBetween(233, 256);
        this.layers[9].setCollisionBetween(273, 296);

        this.player.create();
    }

    update() {
        this.player.update();
    }

    fadeOut() {
        this.player.socket.disconnect();
        this.scene.start('House');
    }

    registerCollision(id) {
        let p = this.player;

        this.physics.add.collider(p.players[id], this.layers[6]);
        this.physics.add.collider(p.players[id], this.layers[8]);
        this.physics.add.collider(p.players[id], this.layers[9]);
        this.physics.add.collider(p.players[id], this.layers[7], (sprite, tile) => {
            if (tile.index === 167 && p.socket.id === id) {
                p.transition = true;
                p.socket.emit('stop', { x: p.players[p.socket.id].x, y: p.players[p.socket.id].y });
                p.players[p.socket.id].anims.stop();
                this.cameras.main.fade(1000);
            }
        });
    }
}

export default Town;
