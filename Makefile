.PHONY: all
all: docker-run

.PHONY: docker-build
docker-build:
	docker build -t shoetrackerapp .

.PHONY: docker-run
docker-run: docker-build
	docker run -it --rm -p 8080:8080 --name shoetracker shoetrackerapp
