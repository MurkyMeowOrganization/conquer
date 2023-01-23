
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
        // this.update(0)

    }

    private playSpriteIndices: number[] = []
    private runningTileArrayIndex = 0
    private maxDisplayTime = 0
    private elapsedTime = 0

    // public loop(playSpriteIndices: number[], totalDuration: number) {
    //     this.playSpriteIndices = playSpriteIndices
    //     this.runningTileArrayIndex = 0
    //     this.currentTile = playSpriteIndices[this.runningTileArrayIndex]
    //     this.maxDisplayTime = totalDuration / this.playSpriteIndices.length
    // }


    // public update(delta: number) {
    //     this.elapsedTime += delta;
    //     if (this.maxDisplayTime > 0 && this.elapsedTime >= this.maxDisplayTime) {
    //         this.elapsedTime = 0
    //         this.runningTileArrayIndex = (this.runningTileArrayIndex + 1) % this.playSpriteIndices.length
    //         this.currentTile = this.playSpriteIndices[this.runningTileArrayIndex]

    //         const offsetX = (this.currentTile % this.tilesHoriz) / this.tilesHoriz;
    //         const offsetY = (this.tilesVert - Math.floor(this.currentTile / this.tilesHoriz) - 1) / this.tilesVert;

    //         this.map.offset.x = offsetX
    //         this.map.offset.y = offsetY
    //         useFrame
    //     }

    // }
}