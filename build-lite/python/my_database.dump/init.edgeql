# DESCRIBE SYSTEM CONFIG
CONFIGURE INSTANCE SET session_idle_transaction_timeout := <std::duration>'PT10S';

# DESCRIBE ROLES
ALTER ROLE edgedb { SET password_hash := 'SCRAM-SHA-256$4096:PBF4Q3Jq61Omf3NnJ6VdGw==$8xQiNuxZOOz49J7dxZ5fNvvZ7A+ma4P+py9km0WRSPA=:U+g3wKUUSzGkSKxCx16RVHASzepHsQATihGhQqTyzt4=';};
