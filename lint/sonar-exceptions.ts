export const sonarExceptions = {
  // Native prefer-rest-params already enforces this restriction.
  "sonarjs/arguments-usage": "off",
  // Native no-array-constructor already enforces this restriction.
  "sonarjs/array-constructor": "off",
  // Oxfmt owns statement/argument/arrow layout.
  "sonarjs/arrow-function-convention": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/assertions-in-test-cases": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/async-test-assertions": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-apigateway-public-api": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-ec2-rds-dms-public": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-ec2-unencrypted-ebs-volume": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-efs-unencrypted": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-iam-all-privileges": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-iam-all-resources-accessible": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-iam-privilege-escalation": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-iam-public-access": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-opensearchservice-domain": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-rds-unencrypted-databases": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-restricted-ip-admin-access": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-s3-bucket-granted-access": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-s3-bucket-insecure-http": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-s3-bucket-public-access": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-s3-bucket-versioning": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-sagemaker-unencrypted-notebook": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-sns-unencrypted-topics": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/aws-sqs-unencrypted-queue": "off",
  // Native block-scoped-var already enforces this restriction.
  "sonarjs/block-scoped-var": "off",
  // Oxfmt owns statement/argument/arrow layout.
  "sonarjs/call-argument-line": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/chai-determinate-assertion": "off",
  // Native no-eval already enforces this restriction.
  "sonarjs/code-eval": "off",
  // Without a configured comment pattern it does not express a policy.
  "sonarjs/comment-regex": "off",
  // Native no-new already enforces this restriction.
  "sonarjs/constructor-for-side-effects": "off",
  // Native complexity already enforces this restriction.
  "sonarjs/cyclomatic-complexity": "off",
  // Native prefer-destructuring already enforces this restriction.
  "sonarjs/destructuring-assignment-syntax": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/disabled-timeout": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/explicit-test-skip": "off",
  // No copyright/license header template established; cannot invent legal declarations.
  "sonarjs/file-header": "off",
  // Native guard-for-in already enforces this restriction.
  "sonarjs/for-in": "off",
  // Native for-direction already enforces this restriction.
  "sonarjs/for-loop-increment-sign": "off",
  // Native no-loop-func already enforces this restriction.
  "sonarjs/function-inside-loop": "off",
  // Native require-yield already enforces this restriction.
  "sonarjs/generator-without-yield": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/hooks-before-test-cases": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/inverted-assertion-arguments": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/link-with-target-blank": "off",
  // Native max-lines already enforces this restriction.
  "sonarjs/max-lines": "off",
  // Native max-lines-per-function already enforces this restriction.
  "sonarjs/max-lines-per-function": "off",
  // Native max-depth already enforces this restriction.
  "sonarjs/nested-control-flow": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-angular-bypass-sanitization": "off",
  // Native no-extend-native already enforces this restriction.
  "sonarjs/no-built-in-override": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-code-after-done": "off",
  // Native no-useless-assignment already enforces this restriction.
  "sonarjs/no-dead-store": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-debounce-throttle-in-render": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-debug-commands-in-ui-tests": "off",
  // Native no-delete-var already enforces this restriction.
  "sonarjs/no-delete-var": "off",
  // Native typescript/no-duplicate-type-constituents already enforces this restriction.
  "sonarjs/no-duplicate-in-composite": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-duplicate-parameterized-test-case": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-duplicate-test-title": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-empty-parameterized-test-dataset": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-empty-test-file": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-empty-test-title": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-exclusive-tests": "off",
  // Native no-fallthrough already enforces this restriction.
  "sonarjs/no-fallthrough": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-fixed-wait-in-tests": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-forced-browser-interaction": "off",
  // Native no-shadow-restricted-names already enforces this restriction.
  "sonarjs/no-globals-shadowing": "off",
  // Native typescript/no-unnecessary-condition already enforces this restriction.
  "sonarjs/no-gratuitous-expressions": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-hook-setter-in-body": "off",
  // Native no-dupe-else-if + no-duplicate-case already enforces this restriction.
  "sonarjs/no-identical-conditions": "off",
  // Native no-undef already enforces this restriction.
  "sonarjs/no-implicit-global": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-incomplete-assertions": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-interpolation-in-inline-snapshots": "off",
  // Native no-labels already enforces this restriction.
  "sonarjs/no-labels": "off",
  // Native no-obj-calls already enforces this restriction.
  "sonarjs/no-literal-call": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-mixed-completion-style": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-mutate-reactive-state-in-updated-hook": "off",
  // Native no-multi-assign already enforces this restriction.
  "sonarjs/no-nested-assignment": "off",
  // Native no-nested-ternary already enforces this restriction.
  "sonarjs/no-nested-conditional": "off",
  // Native no-plusplus already enforces this restriction.
  "sonarjs/no-nested-incdec": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-networkidle-wait": "off",
  // Native no-param-reassign already enforces this restriction.
  "sonarjs/no-parameter-reassignment": "off",
  // Native typescript/no-unnecessary-boolean-literal-compare already enforces this restriction.
  "sonarjs/no-redundant-boolean": "off",
  // Native no-undef handles configured globals; this JS rule misreports built-in Error.
  "sonarjs/no-reference-error": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-same-argument-assert": "off",
  // Oxfmt owns statement/argument/arrow layout.
  "sonarjs/no-same-line-conditional": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-skipped-tests": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-table-as-layout": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-trivial-assertions": "off",
  // Native curly already enforces this restriction.
  "sonarjs/no-unenclosed-multiline-block": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-uniq-key": "off",
  // Native oxc/missing-throw already requires throwing constructed errors.
  "sonarjs/no-unthrown-error": "off",
  // Native no-unused-vars already enforces this restriction.
  "sonarjs/no-unused-vars": "off",
  // Native no-useless-catch already enforces this restriction.
  "sonarjs/no-useless-catch": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-useless-react-setstate": "off",
  // Native no-use-before-define already enforces this restriction.
  "sonarjs/no-variable-usage-before-declaration": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-vue-class-component": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/no-vue-mixins": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/object-alt-content": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/parameterized-tests": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/prefer-cypress-should": "off",
  // Native default-case-last already enforces this restriction.
  "sonarjs/prefer-default-last": "off",
  // Native no-object-constructor already enforces this restriction.
  "sonarjs/prefer-object-literal": "off",
  // Native unicorn/no-useless-promise-resolve-reject already enforces this restriction.
  "sonarjs/prefer-promise-shorthand": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/prefer-specific-assertions": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/stable-tests": "off",
  // Dedicated regexp/no-super-linear-backtracking and no-super-linear-move own this.
  "sonarjs/super-linear-regex": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/synchronous-suite-callback": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/table-header": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/table-header-reference": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/test-check-exception": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/testing-library-prefer-query-by-disappearance": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/testing-library-query-assertion": "off",
  // Native no-const-assign already enforces this restriction.
  "sonarjs/updated-const-var": "off",
  // Native consistent-type-definitions keeps the reference interface convention.
  "sonarjs/use-type-alias": "off",
  // Enable with the corresponding framework, test runner, or AWS infrastructure.
  "sonarjs/vitest-mock-at-module-scope": "off",
} as const;
