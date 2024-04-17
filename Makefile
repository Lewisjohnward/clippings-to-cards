development:
	npm install
	docker compose -f build/development/docker-compose.yml up -d

clean:
	docker compose -f build/development/docker-compose.yml down
	docker image rmi clippingstocards-dev
	rm -rf node_modules
