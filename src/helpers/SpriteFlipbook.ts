
import * as THREE from 'three';

export class SpriteFlipbook {

    private tilesHoriz = 0;
    private tilesVert = 0;
    private currentTile = 0;

    private map: THREE.Texture

    public material: THREE.Material | THREE.Material[]

    constructor(spriteTexture: string, tilesHoriz: number, tilesVert: number, currentTile: number) {
        this.tilesHoriz = tilesHoriz;
        this.tilesVert = tilesVert;
        this.currentTile = currentTile

        this.map = new THREE.TextureLoader().load(spriteTexture);
        // убирает размытие 
        this.map.magFilter = THREE.NearestFilter;
        this.map.repeat.set(1 / tilesHoriz, 1 / tilesVert);
        const offsetX = (this.currentTile % this.tilesHoriz) / this.tilesHoriz;
        const offsetY = (this.tilesVert - Math.floor(this.currentTile / this.tilesHoriz) - 1) / this.tilesVert;
        this.map.offset.x = offsetX
        this.map.offset.y = offsetY
        this.material = new THREE.MeshBasicMaterial({
            map: this.map,
            transparent: true
        });

    }

}