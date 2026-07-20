.PHONY: help uuids songs sql upload clean all fix-ids check-uuids upload-safe full-pipeline

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

help: ## Show this help message
	@echo "$(BLUE)Himno Database Management$(NC)"
	@echo ""
	@echo "$(GREEN)Available commands:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'

uuids: ## Fix UUIDs in individual song files (public/songs_v1/*.json)
	@echo "$(BLUE)Updating UUIDs in individual song files...$(NC)"
	@python3 scripts/fix_uuids.py

songs: ## Regenerate public/songs.json from public/songs_v1/*.json files
	@echo "$(BLUE)Generating songs.json from individual files...$(NC)"
	@python3 scripts/generate_songs.py

sql: ## Sanitize data and generate SQL batch files
	@echo "$(BLUE)Sanitizing data and generating SQL batches...$(NC)"
	@python3 scripts/sanitize_and_upload.py
	@echo "$(GREEN)Generated 5 batch files: scripts/uploads_batch_*.sql$(NC)"

clean: ## Remove generated SQL files
	@echo "$(BLUE)Cleaning generated files...$(NC)"
	@rm -f scripts/uploads*.sql
	@echo "$(GREEN)Cleaned SQL batch files$(NC)"

all: uuids songs sql ## Run full pipeline: fix UUIDs, generate songs.json, create SQL batches
	@echo "$(GREEN)Pipeline completed!$(NC)"
	@echo "Next: Upload scripts/uploads_batch_*.sql to Supabase"

status: ## Show current status
	@echo "$(BLUE)Database Status:$(NC)"
	@echo "Songs in public/songs_v1/: $$(ls public/songs_v1/*.json 2>/dev/null | wc -l | tr -d ' ')"
	@echo "Songs in public/songs.json: $$(python3 -c "import json; print(len(json.load(open('public/songs.json'))))" 2>/dev/null || echo "N/A")"
	@echo "SQL batches: $$(ls scripts/uploads_batch_*.sql 2>/dev/null | wc -l | tr -d ' ')"

check-uuids: ## Check for invalid UUIDs in public/songs.json
	@echo "$(BLUE)Checking UUIDs in songs.json...$(NC)"
	@python3 scripts/check_uuids.py

fix-ids: ## Fix duplicate IDs in public/songs.json
	@echo "$(BLUE)Fixing duplicate IDs in songs.json...$(NC)"
	@node scripts/fix-duplicate-ids.js
	@echo "$(GREEN)Fixed duplicate IDs$(NC)"

upload: ## Upload songs.json to Supabase database
	@echo "$(BLUE)Uploading songs to Supabase...$(NC)"
	@node scripts/upload-songs.js

upload-safe: fix-ids upload ## Fix duplicates then upload to Supabase (safe pipeline)
	@echo "$(GREEN)Upload completed safely!$(NC)"

full-pipeline: all upload-safe ## Run complete pipeline: fix UUIDs, generate songs.json, fix duplicates, upload to Supabase
	@echo "$(GREEN)Full pipeline completed!$(NC)"
