"""Apply governance after Code Quality and Build succeed; requires Python 3 and authenticated gh."""

import json
from pathlib import Path
import subprocess
import sys

repo = sys.argv[1] if len(sys.argv) == 2 else "jackmaders/vite-plus"
endpoint = f"repos/{repo}/rulesets"
desired = json.loads(
    (Path(__file__).resolve().parents[1] / ".github/rulesets/protect-main.json").read_text()
)


def api(path, method="GET", payload=None):
    args = ["gh", "api", path, "--method", method]
    if payload is not None:
        args += ["--input", "-"]
    return json.loads(
        subprocess.check_output(
            args, input=json.dumps(payload).encode() if payload is not None else None
        )
    )


# Include inherited rulesets for inspection, but never modify them.
summaries = api(endpoint + "?includes_parents=true&per_page=100")
if len(summaries) == 100:
    sys.exit("Ruleset list may be truncated; inspect pagination before applying.")
matches = []
for summary in summaries:
    if summary["source_type"] != "Repository" or summary["source"] != repo:
        continue
    existing = api(f"{endpoint}/{summary['id']}")
    refs = existing.get("conditions", {}).get("ref_name", {}).get("include", [])
    if existing["name"] == desired["name"] or (
        existing["target"] == "branch" and refs == ["refs/heads/main"]
    ):
        matches.append(existing)
if len(matches) > 1:
    sys.exit("Multiple matching rulesets: reconcile them manually; no changes made.")
if matches:
    existing = matches[0]
    managed_types = {rule["type"] for rule in desired["rules"]}
    # Preserve unrelated rule types and top-level API-supported settings.
    payload = {
        key: existing[key]
        for key in ("name", "target", "enforcement", "bypass_actors", "conditions", "rules")
        if key in existing
    }
    payload.update(desired)
    payload["rules"] = desired["rules"] + [
        rule for rule in existing["rules"] if rule["type"] not in managed_types
    ]
    result = api(f"{endpoint}/{existing['id']}", "PUT", payload)
else:
    result = api(endpoint, "POST", desired)
print(f"Active ruleset: {result['id']} ({result['name']})")
