# Project workflow

For each bounded milestone:

1. Inspect the approved baseline, relevant implementation, and product/architecture docs.
2. Implement only the requested milestone and keep durable docs accurate to implemented behavior.
3. Review the diff independently and correct issues found.
4. Run requested automated validation and any practical manual acceptance checks.
5. Report changes, evidence, failures, and remaining checks. A completion summary is not approval.
6. The user reviews and manually commits the accepted result; implementation agents do not commit or push by default.
7. Start the next milestone from the approved committed SHA.

Future ideas remain labeled as future until implemented. Do not silently widen scope or turn an assumption into a locked product or architecture decision.
