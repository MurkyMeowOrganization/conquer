export function getSpritesheetFrameOffsets(tilesHoriz: number, tilesVert: number, currentTile: number) {
	tilesHoriz = tilesHoriz;
	tilesVert = tilesVert;
	currentTile = currentTile;

	const offsetX = (currentTile % tilesHoriz) / tilesHoriz;
	const offsetY = (tilesVert - Math.floor(currentTile / tilesHoriz) - 1) / tilesVert;

	return { offsetX, offsetY };
}
