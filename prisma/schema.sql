CREATE TABLE `Game` (
	`id` varchar(191) NOT NULL,
	`playerId` varchar(191) NOT NULL,
	PRIMARY KEY (`id`),
	KEY `Game_playerId_idx` (`playerId`)
)

SELECT playerId, COUNT(*) AS numGames
FROM Game
GROUP BY playerId
ORDER BY numGames DESC
LIMIT 10;
