#!/bin/bash
docker container cp data/ db:/tmp
docker container exec db mongoimport --db star_wars --collection planets --type json --file /tmp/data/planets.json --jsonArray
docker container exec db mongoimport --db star_wars --collection episodes --type json --file /tmp/data/episodes.json --jsonArray