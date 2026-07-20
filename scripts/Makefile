.PHONY: help uuids songs sql upload clean all

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

uuids: ## Fix UUIDs in individual song files (songs_v1/*.json)
	@echo "$(BLUE)Updating UUIDs in individual song files...$(NC)"
	@python3 fix_uuids.py

songs: ## Regenerate songs.json from songs_v1/*.json files
	@echo "$(BLUE)Generating songs.json from individual files...$(NC)"
	@python3 generate_songs.py

sql: ## Sanitize data and generate SQL batch files
	@echo "$(BLUE)Sanitizing data and generating SQL batches...$(NC)"
	@python3 sanitize_and_upload.py
	@echo "$(GREEN)Generated 5 batch files: uploads_batch_*.sql$(NC)"

upload: ## Upload all batches to Supabase (requires SUPABASE_PROJECT_ID env var)
	@echo "$(BLUE)Uploading to Supabase...$(NC)"
	@if [ -z "$(SUPABASE_PROJECT_ID)" ]; then \
		echo "$(YELLOW)Error: SUPABASE_PROJECT_ID environment variable not set$(NC)"; \
		echo "Usage: make upload SUPABASE_PROJECT_ID=your-project-id"; \
		exit 1; \
	fi
	@echo "Using project ID: $(SUPABASE_PROJECT_ID)"
	@for batch in uploads_batch_*.sql; do \
		echo "Uploading $$batch..."; \
		# Aquí se puede usar curl o supabase CLI para subir los archivos; \
	done

upload-batch-1: ## Upload batch 1 only (30 songs)
	@echo "Use: make upload-batch-1 SUPABASE_PROJECT_ID=your-id"

upload-batch-2: ## Upload batch 2 only (30 songs)
	@echo "Use: make upload-batch-2 SUPABASE_PROJECT_ID=your-id"

upload-batch-3: ## Upload batch 3 only (30 songs)
	@echo "Use: make upload-batch-3 SUPABASE_PROJECT_ID=your-id"

upload-batch-4: ## Upload batch 4 only (30 songs)
	@echo "Use: make upload-batch-4 SUPABASE_PROJECT_ID=your-id"

upload-batch-5: ## Upload batch 5 only (2 songs)
	@echo "Use: make upload-batch-5 SUPABASE_PROJECT_ID=your-id"

clean: ## Remove generated files
	@echo "$(BLUE)Cleaning generated files...$(NC)"
	@rm -f uploads*.sql
	@echo "$(GREEN)Cleaned SQL batch files$(NC)"

all: uuids songs sql ## Run full pipeline: fix UUIDs, generate songs.json, create SQL batches
	@echo "$(GREEN)Pipeline completed!$(NC)"
	@echo "Next step: make upload SUPABASE_PROJECT_ID=your-project-id"

status: ## Show current status
	@echo "$(BLUE)Database Status:$(NC)"
	@echo "Songs in songs_v1/: $$(ls ../public/songs_v1/*.json 2>/dev/null | wc -l)"
	@echo "Songs in songs.json: $$(python3 -c "import json; print(len(json.load(open('../public/songs.json'))))" 2>/dev/null || echo "N/A")"
	@echo "SQL batches: $$(ls uploads_batch_*.sql 2>/dev/null | wc -l)"

check-uuids: ## Check for invalid UUIDs in songs.json
	@echo "$(BLUE)Checking UUIDs in songs.json...$(NC)"
	@python3 check_uuids.py
