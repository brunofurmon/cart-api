.DEFAULT_GOAL := help
.PHONY: help test

# Change to 'production' to match the Dockerfile stage name
DOCKER_STAGE ?= development
INTERACTIVE := $(shell [ -t 0 ] && echo i || echo d)
APPDIR = /usr/cart-api
PWD=$(shell pwd)
PORT=8088
PORT_DEBUG=8089
PORT_DEBUG_TEST=8090
CONTAINER_NAME=cart-api

welcome:
	@echo "Welcome to ${CONTAINER_NAME}"
	@printf "\033[33m________  ________  ________  _________               ________  ________  ___      \n"
	@printf "\033[33m|\   ____\|\   __  \|\   __  \|\___   ___\            |\   __  \|\   __  \|\  \    \n"
	@printf "\033[33m\ \  \___|\ \  \|\  \ \  \|\  \|___ \  \_|____________\ \  \|\  \ \  \|\  \ \  \   \n"
	@printf "\033[33m \ \  \    \ \   __  \ \   _  _\   \ \  \|\____________\ \   __  \ \   ____\ \  \  \n"
	@printf "\033[33m  \ \  \____\ \  \ \  \ \  \\  \|    \ \  \|____________|\ \  \ \  \ \  \___|\ \  \ \n"
	@printf "\033[33m   \ \_______\ \__\ \__\ \__\\ _\     \ \__\              \ \__\ \__\ \__\    \ \__\ \n"
	@printf "\033[33m    \|_______|\|__|\|__|\|__|\|__|    \|__|               \|__|\|__|\|__|     \|__| \n"
	@printf "\033[33m                                                                                    \n"

setup: welcome build-docker-image ## Install dependencies
ifeq ("$(wildcard ./env)","")
	@cp .env.default .env
endif

check-if-docker-image-exists: ## Used to check if docker image exists
ifeq ($(shell docker images -q nav-challenge/${CONTAINER_NAME} 2> /dev/null | wc -l | bc),0)
	@echo "Docker image not found, building Docker image first"; sleep 2;
	@make build-docker-image
endif

build-docker-image: ## Build docker image (no cache)
	@echo "Building docker image from Dockerfile"
	@docker build --no-cache --force-rm . --target ${DOCKER_STAGE} -t nav-challenge/${CONTAINER_NAME}:latest

debug: welcome check-if-docker-image-exists ## Start project for development purporses
	@echo 'Running on http://localhost:$(PORT)'
	@docker run -t${INTERACTIVE} --rm -v ${PWD}:${APPDIR}:delegated --env-file=.env -p $(PORT):8088 -p $(PORT_DEBUG):8089 -e USER_PERM=$(shell id -u):$(shell id -g) --name ${CONTAINER_NAME} nav-challenge/${CONTAINER_NAME}:latest

help: welcome
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | grep ^help -v | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'
