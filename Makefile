setup:
	cd frontend && pnpm install
	cd backend && pip install -r requirements.txt
	cd database && ./up.sh
