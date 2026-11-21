# ken-bot

A simple discord bot for notifications

### Evaluating expression for $TIMESTAMP

```bash
TIMESTAMP=$(date +%s)

```

### Evaluating expression for $SIGNATURE

```bash
SIGNATURE=$(echo -n ''"$TIMESTAMP"':'"$BODY"'' | openssl dgst -sha256 -hmac "$WEBHOOK_SECRET" | awk '{print $NF}')

```

### Evaluating expression for $BODY and $WEBHOOK_SECRET

$BODY - you can change this depending on your environment and convention.

$WEBHOOK_SECRET - you can change this depending on your environment and convention.

### cURL Example

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "X-Signature: $SIGNATURE" \
-H "X-Timestamp: $TIMESTAMP" \
-d "$BODY" \
http://127.0.0.1:8787 # <- webhook endpoint

```
