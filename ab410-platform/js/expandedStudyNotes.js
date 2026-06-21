(() => {
  const data = window.AB410_DATA;

  if (!data) {
    throw new Error("AB410 course data must load before the expanded study notes.");
  }

  data.course.source = "AB410_Complete_Study_Notes.pdf";
  data.course.revision = "Expanded complete study notes";

  const expanded = {
    m00: {
      deepDives: [
        {
          title: "Exam shape and scoring strategy",
          intro: "AB-410 is a scenario-led assessment. Success depends on choosing the simplest Microsoft Power Platform capability that completely satisfies the requirement.",
          points: [
            "Plan for roughly 40-60 questions across about 120 minutes; manage time by flagging long scenarios and returning after the first pass.",
            "A passing score is 700 on Microsoft's scaled 1,000-point score, not necessarily 70 percent of questions.",
            "Business logic, process automation, and AI are the largest domain at 40-45 percent; foundational design and application creation are each 25-30 percent.",
            "Read the final sentence first, identify the requested outcome and constraints, then remove answers that add unnecessary code, licensing, maintenance, or scope."
          ],
          examTip: "When two answers work, prefer the lowest-capability tool that meets every stated requirement and keeps logic in the correct layer."
        }
      ]
    },
    m01: {
      deepDives: [
        {
          title: "Environment types and boundaries",
          intro: "An environment is the security, data, application, and deployment boundary for Power Platform workloads.",
          points: [
            "Production environments host live workloads and support backups; sandbox environments support development and testing and can be reset or copied.",
            "Developer environments are personal build spaces; trial environments are time-limited; the default environment is shared broadly and should not become the home of governed enterprise solutions.",
            "Choose regions deliberately because data residency, latency, compliance, and service availability can depend on location.",
            "Use separate development, test, and production environments to isolate risk and make release promotion repeatable."
          ],
          example: "A hospital discharge application is built in Development, validated with representative users in Test, and released to Production without editing the production copy directly.",
          examTip: "An environment separates workloads. A Managed Environment adds governance to an existing environment; it is not another environment type."
        },
        {
          title: "Managed Environments",
          intro: "Managed Environments add premium governance capabilities for administrators operating Power Platform at scale.",
          points: [
            "They can provide usage insights, weekly digests, maker welcome content, solution checker enforcement, sharing limits, and pipeline support.",
            "They strengthen governance without changing the fundamental purpose of production, sandbox, or developer environments.",
            "Use them where administrators need consistent control, visibility, and release discipline across important workloads."
          ]
        }
      ]
    },
    m02: {
      deepDives: [
        {
          title: "Managed and unmanaged solution lifecycle",
          intro: "Solutions are the transport and ownership boundary for Power Platform components.",
          points: [
            "Build with unmanaged solutions in development. Export managed packages for controlled test and production deployments.",
            "Deleting an unmanaged solution removes only its container; components remain. Uninstalling a managed solution removes its owned components and may remove associated data.",
            "A managed update can be hidden by an unmanaged active customization. Inspect solution layers and remove the active customization when the managed definition should win.",
            "Managed properties can restrict downstream customization and protect the intended support model."
          ],
          examTip: "If an imported change is present but not visible, inspect solution layers before rebuilding the component."
        },
        {
          title: "Environment variables and connection references",
          intro: "Portable solutions separate environment-specific configuration and authentication from application logic.",
          points: [
            "An environment variable definition stores the schema, type, default, and description. Its current value supplies the value for the target environment.",
            "Supported patterns include text, decimal, yes/no, JSON, data source, and secret values. Secrets can be backed by Azure Key Vault instead of embedded in apps or flows.",
            "A connection reference is a solution component that points apps and flows to a connection selected during import or deployment.",
            "Use variables for URLs, IDs, feature settings, and other deploy-time values; use connection references for connector bindings."
          ],
          example: "The same solution uses a test SharePoint site and mailbox in Test, then production resources in Production, without changing formulas or flow definitions."
        },
        {
          title: "Dependencies, publishers, and deployment order",
          intro: "A reliable release contains every required component and deploys shared foundations before dependent features.",
          points: [
            "Use Show dependencies to identify required and dependent components before export.",
            "Place reusable tables and shared components in a base solution, then import feature solutions in dependency order.",
            "A publisher defines ownership and the customization prefix. Choose the publisher before creating components because the schema prefix is permanent.",
            "Use manual export/import for occasional controlled releases and Power Platform Pipelines for governed, repeatable promotion across stages."
          ],
          examTip: "A missing dependency is usually fixed by including the component or deploying its base solution first, not by recreating it in the target environment."
        }
      ],
      procedures: [
        {
          title: "Create a portable environment variable",
          steps: [
            "Open the unmanaged solution in the development environment.",
            "Select New, More, Environment variable and choose a clear display name and data type.",
            "Set a safe default only when one applies; keep production-specific values out of the solution definition.",
            "Reference the variable from the app, flow, or other solution component.",
            "Supply or confirm the current value when importing into each target environment."
          ]
        },
        {
          title: "Promote a managed release",
          steps: [
            "Confirm dependencies, connection references, and environment variables in Development.",
            "Run Solution Checker and resolve relevant errors or warnings.",
            "Publish customizations, increment the version, and export as managed.",
            "Import into Test, bind connections, set environment values, and complete acceptance checks.",
            "Promote the same tested artifact to Production through the approved pipeline or import process."
          ]
        }
      ]
    },
    m03: {
      deepDives: [
        {
          title: "Choose the application surface",
          intro: "Decompose requirements into data, user experience, automation, intelligence, security, and integration before selecting products.",
          points: [
            "Use a model-driven app for process-rich work over Dataverse with forms, views, relationships, and security-driven navigation.",
            "Use a canvas app when the interaction and layout need precise control across connectors and devices.",
            "Use Power Pages for authenticated or anonymous external audiences, with web roles and table permissions protecting Dataverse data.",
            "Use Copilot Studio when users need a conversational agent grounded in approved knowledge and capable of invoking controlled actions."
          ],
          examTip: "Do not choose the product from a single keyword. Match audience, data boundary, interaction style, governance, and maintenance together."
        },
        {
          title: "Copilot agent building blocks",
          intro: "A useful agent combines trusted knowledge, guided conversation, actions, and controlled publication.",
          points: [
            "Knowledge sources ground generated responses in approved business content.",
            "Topics provide authored conversational paths for predictable scenarios.",
            "Actions allow an agent to retrieve or update business data through connectors, flows, and plugins.",
            "Channels determine where the published agent is available, while authentication and governance determine what each user may access."
          ]
        }
      ]
    },
    m04: {
      deepDives: [
        {
          title: "Dataverse table and column design",
          intro: "The data model should express stable business meaning, relationships, ownership, and security before interface design begins.",
          points: [
            "Standard tables provide Microsoft-defined business structures; custom tables model organization-specific concepts; activity tables represent time-based interactions; virtual tables surface external data without copying it into Dataverse.",
            "Choose column types deliberately. Choice columns standardize categories, lookups create relationships, file and image columns store rich assets, and customer or owner columns carry specialized behavior.",
            "Calculated and formula columns derive values immediately from other data; rollup columns aggregate related records on a scheduled basis.",
            "Use an alternate key when integrations must uniquely identify and upsert a record using a stable business identifier."
          ],
          examTip: "A display field is not a uniqueness constraint. Use an alternate key for an external or business identifier that must be unique."
        },
        {
          title: "Relationships and cascade behavior",
          intro: "Relationships define navigation, referential meaning, and what happens to related records when a parent changes.",
          points: [
            "One-to-many creates a lookup on the many side; many-to-one is the same relationship viewed from the child; many-to-many uses an intersect relationship.",
            "Configure assign, share, unshare, reparent, and delete cascade behavior according to ownership and retention rules.",
            "Restrict delete when child records must prevent removal of their parent; remove link when children may survive independently.",
            "Test cascade behavior with realistic ownership and security roles because it can affect far more records than the form suggests."
          ]
        },
        {
          title: "Dataverse security model",
          intro: "Access results from privileges, access depth, ownership, business units, teams, sharing, and field-level controls working together.",
          points: [
            "Security roles grant privileges such as Create, Read, Write, Delete, Append, Append To, Assign, and Share.",
            "Access depth scopes privileges to User, Business Unit, Parent: Child Business Units, or Organization.",
            "Owner teams can own records and receive roles; Microsoft Entra group teams map directory membership into Dataverse access.",
            "Column security profiles limit access to sensitive fields even when a user can open the record."
          ],
          example: "A service coordinator can read all cases but only a restricted clinical team can read or update a sensitive diagnosis column.",
          examTip: "Use security roles for record operations and scope; use column security for a sensitive field."
        }
      ]
    },
    m05: {
      deepDives: [
        {
          title: "Model-driven forms and experiences",
          intro: "Model-driven experiences are assembled from Dataverse metadata, then tailored to the user's role and task.",
          points: [
            "Main forms support complete record work; Quick Create forms capture a small set of fields; Quick View forms display read-only fields from a related record; card forms present compact summaries.",
            "Assign forms to security roles when different groups need different layouts, and control form order when a user can access more than one.",
            "Views define columns, filters, sorting, and available record sets. Charts visualize a view, while dashboards combine charts, lists, and other components.",
            "The sitemap organizes areas, groups, and pages. Business process flows guide stage-based work, while custom or generative pages can add focused experiences."
          ],
          examTip: "Quick Create is for entering a new record. Quick View is read-only related-record context on another form."
        },
        {
          title: "Generated app strengths and tradeoffs",
          intro: "A model-driven app gives a strong accessible and responsive baseline, but configuration choices still determine usability.",
          points: [
            "Forms, views, and navigation adapt across devices without manually positioning every control.",
            "Dataverse security is enforced consistently, and metadata changes can improve several experiences at once.",
            "The tradeoff is less pixel-level control than a canvas app, so use custom pages selectively rather than rebuilding standard behavior.",
            "Design for role clarity: remove irrelevant navigation, keep forms task-focused, and use views that answer real operational questions."
          ]
        }
      ],
      procedures: [
        {
          title: "Build and validate a model-driven app",
          steps: [
            "Create the app inside the solution and add the required Dataverse pages.",
            "Configure the sitemap, public views, forms, charts, and dashboards for each user role.",
            "Add commands or custom pages only where standard behavior cannot meet the requirement.",
            "Validate security with test users, then check desktop and mobile layouts.",
            "Publish, run Solution Checker, and include all dependent components before export."
          ]
        }
      ]
    },
    m06: {
      deepDives: [
        {
          title: "Connectors, delegation, and licensing",
          intro: "Canvas app architecture depends on where data lives, what operations the connector can delegate, and what licenses users require.",
          points: [
            "Standard and premium connectors have different licensing implications. Confirm the user and service-account licensing model before committing to an architecture.",
            "Delegation sends supported filtering, sorting, and aggregation to the data source. Nondelegable formulas may inspect only the local data-row limit, normally 500 and configurable up to 2,000.",
            "A delegation warning is a correctness warning, not merely a performance warning: records outside the local subset can be silently omitted.",
            "Filter early, request only needed columns, and use delegable operators supported by the chosen connector."
          ],
          example: "A search that works with 100 test records may miss valid production records when it applies a nondelegable function to 50,000 rows.",
          examTip: "If a large data source returns incomplete results, inspect delegation before raising the row limit."
        },
        {
          title: "Power Fx and canvas app quality",
          intro: "Use declarative formulas and reusable components to keep behavior understandable and testable.",
          points: [
            "Filter and LookUp retrieve records; Patch creates or updates; SubmitForm validates and saves an edit form; Collect and ClearCollect manage local collections.",
            "With and named formulas improve readability. Concurrent can reduce load time when operations are independent.",
            "Components and component libraries centralize repeated interface patterns and behavior.",
            "Use App Checker for formula, accessibility, and performance findings, then Monitor to inspect runtime events and network calls."
          ]
        }
      ]
    },
    m07: {
      deepDives: [
        {
          title: "Flow triggers and efficient filtering",
          intro: "The trigger should start only for records and changes that genuinely require automation.",
          points: [
            "Automated cloud flows react to events; instant flows are user-initiated; scheduled flows run on a recurrence.",
            "Use trigger conditions and filter rows to stop irrelevant runs before actions consume capacity.",
            "For Dataverse update triggers, select filtering columns so changes to unrelated fields do not start the flow.",
            "Prefer server-side filtering in connector actions instead of retrieving a large dataset and filtering it later."
          ],
          examTip: "Filtering inside the flow still creates a run. Trigger conditions prevent the unnecessary run."
        },
        {
          title: "Control actions, expressions, and approvals",
          intro: "A maintainable flow makes branching, repetition, timing, and human decisions explicit.",
          points: [
            "Use Condition for two branches and Switch for several discrete values. Apply to each handles collections; Do until repeats until a condition or limit is met.",
            "Compose makes intermediate values visible; variables hold changing state; expressions handle dates, nulls, strings, arrays, and object values.",
            "Approval actions pause for a decision and expose outcome, responder, and comments for later conditions.",
            "Design idempotently where retries are possible so the same event does not create duplicate records or notifications."
          ]
        },
        {
          title: "Structured error handling",
          intro: "Use Scopes and Configure run after to build a clear try, catch, and finally pattern.",
          points: [
            "Place the main business actions in a Try scope.",
            "Configure a Catch scope to run when Try fails, times out, or is skipped as appropriate; log useful context and notify the support path.",
            "Use a Finally scope for actions that must occur regardless of success, such as updating an execution record.",
            "Inspect run history inputs, outputs, duration, retries, and connector errors before changing the design."
          ],
          examTip: "A Scope plus Configure run after is the native answer for grouped flow error handling."
        }
      ],
      procedures: [
        {
          title: "Create a controlled approval flow",
          steps: [
            "Choose the narrowest trigger and add trigger filters or conditions.",
            "Retrieve only the fields needed to evaluate and describe the request.",
            "Start and wait for an approval with a clear title, context, link, and assigned approver.",
            "Branch on the approval outcome and update the source record with decision metadata.",
            "Wrap the process in Try, Catch, and Finally scopes and test approve, reject, timeout, and connector-failure paths."
          ]
        }
      ]
    },
    m08: {
      deepDives: [
        {
          title: "AI Builder models and prompts",
          intro: "Choose between prebuilt models, custom models, and generative prompts according to the task, training data, and review requirements.",
          points: [
            "Prebuilt models address common tasks such as invoice processing, receipt processing, ID reading, sentiment, language detection, and key-phrase extraction.",
            "Custom models support organization-specific document processing, object detection, classification, and prediction when representative training data is available.",
            "Prompts turn clear instructions and grounded business context into generated text or structured output that apps, flows, and agents can use.",
            "Evaluate accuracy, confidence, fairness, privacy, cost, latency, and the consequence of a wrong output before automating the next action."
          ],
          examTip: "Use a prebuilt model for a supported common document. Choose custom training only when the content or classification is organization-specific."
        },
        {
          title: "Grounding and human oversight",
          intro: "Grounding narrows generated answers to approved context; it does not remove the need to test and supervise consequential decisions.",
          points: [
            "Write an explicit instruction, supply relevant context, define the expected output shape, and state constraints.",
            "Ground prompts in trusted Dataverse records, documents, or retrieved business content rather than relying on general model knowledge.",
            "Validate generated output before using it in downstream automation, especially where personal, financial, safety, or regulated data is involved.",
            "Record feedback and failure cases, then improve the prompt, grounding source, thresholds, or review step."
          ]
        }
      ],
      procedures: [
        {
          title: "Design and test a grounded prompt",
          steps: [
            "Define the business decision or content task and identify unacceptable errors.",
            "Create the prompt with a specific instruction, approved context, output format, and constraints.",
            "Test normal, incomplete, ambiguous, adversarial, and sensitive inputs.",
            "Add validation and a human review point where confidence or impact requires it.",
            "Publish the prompt, monitor real outcomes, and version changes through a solution."
          ]
        }
      ]
    },
    m09: {
      deepDives: [
        {
          title: "Business logic mechanism map",
          intro: "Place logic where it can meet the scope, timing, user-experience, and governance requirement with the least complexity.",
          points: [
            "Business rules provide low-code validation and field behavior. Table-scoped rules enforce compatible logic across model-driven apps and server operations; form-scoped rules affect only selected forms.",
            "Dataverse formula or calculated columns derive a stored business value consistently for every consumer; rollup columns aggregate related rows asynchronously.",
            "Canvas formulas provide immediate app-specific interaction. Model-driven form scripts are appropriate only when client behavior cannot be achieved declaratively.",
            "Cloud flows handle asynchronous cross-system work; business process flows guide users through stages; plugins or custom APIs serve complex synchronous server logic when low-code options are insufficient."
          ],
          examTip: "For a value that must be consistent in every app and integration, put the logic in Dataverse rather than duplicating it in each interface."
        },
        {
          title: "Scope and execution timing",
          intro: "The same requirement can demand a different tool depending on when and where it must run.",
          points: [
            "Need immediate guidance while editing a form: use a business rule or supported form behavior.",
            "Need a derived value visible to all consumers: use a Dataverse formula or calculated column.",
            "Need a delayed notification, approval, or cross-system update: use a cloud flow.",
            "Need strict synchronous server-side enforcement beyond declarative capability: consider a plugin after confirming low-code mechanisms cannot satisfy it."
          ]
        }
      ]
    },
    m10: {
      deepDives: [
        {
          title: "Responsible AI controls",
          intro: "Responsible AI design starts with business risk and applies controls from data selection through production monitoring.",
          points: [
            "Use trusted grounding, least-privilege data access, sensitive-data minimization, output validation, and appropriate human review.",
            "Test accuracy and fairness across realistic user groups and edge cases; document limitations rather than presenting generated output as certain.",
            "Keep consequential actions reversible where practical and provide a route for correction or escalation.",
            "Monitor failures, inappropriate responses, drift, usage, cost, and user feedback after release."
          ]
        },
        {
          title: "Platform governance toolkit",
          intro: "Governance combines preventive policy, secure design, release control, monitoring, and operational insight.",
          points: [
            "Data policies classify connectors into business, non-business, and blocked groups to prevent unsafe data movement.",
            "Managed Environments, environment strategy, solution-aware development, pipelines, and Solution Checker create a controlled application lifecycle.",
            "Dataverse auditing records important data changes; security roles and column security constrain access; encryption protects data at rest and in transit.",
            "The Power Platform Center of Excellence Starter Kit can provide inventory, adoption, compliance, and administration insights, but it complements rather than replaces platform controls."
          ],
          examTip: "Use data policies for connector-boundary control, security roles for record access, column security for fields, and auditing for traceability."
        }
      ]
    }
  };

  Object.entries(expanded).forEach(([moduleId, additions]) => {
    const module = data.modules.find((item) => item.id === moduleId);
    if (module) Object.assign(module, additions);
  });

  const extraQuestions = {
    m00: [
      {
        question: "Which AB-410 skill area deserves the largest share of final revision time?",
        options: ["Environment administration", "Business logic, process automation, and AI", "Canvas visual styling", "Power Pages branding"],
        answer: 1,
        explanation: "Business logic, process automation, and AI carry the largest published weighting at 40-45 percent.",
        concept: "Exam weighting"
      }
    ],
    m02: [
      {
        question: "A managed solution update imports successfully, but users still see the old form. What should you inspect first?",
        options: ["Tenant region", "Solution layers and active customizations", "Canvas delegation limit", "The publisher display name"],
        answer: 1,
        explanation: "An unmanaged active layer can sit above and hide the managed update. Inspect solution layers and remove the active customization when appropriate.",
        concept: "Solution layers"
      },
      {
        question: "A feature solution cannot import because a shared table is missing. What is the best response?",
        options: ["Create a similar table directly in Production", "Deploy the base solution first or include the dependency", "Convert the package to unmanaged", "Increase the environment capacity"],
        answer: 1,
        explanation: "Required components must be present. Deploy the shared base solution in dependency order or include the missing component.",
        concept: "Solution dependencies"
      }
    ],
    m03: [
      {
        question: "External contractors need authenticated self-service access to selected Dataverse rows. Which surface fits best?",
        options: ["Power Pages", "A model-driven app shared externally", "A scheduled flow", "A Dataverse dashboard"],
        answer: 0,
        explanation: "Power Pages is designed for external audiences and combines authentication with web roles and table permissions.",
        concept: "Power Pages"
      }
    ],
    m04: [
      {
        question: "An integration must update the same record using a unique reference supplied by another system. What should you configure?",
        options: ["A display-name column", "An alternate key", "A rollup column", "A card form"],
        answer: 1,
        explanation: "An alternate key enforces uniqueness for a stable business identifier and supports integration upsert operations.",
        concept: "Alternate keys"
      },
      {
        question: "Users may open a record, but only a specialist group may see one sensitive field. What should protect it?",
        options: ["A hidden form control", "A column security profile", "A public view", "A trigger condition"],
        answer: 1,
        explanation: "Column security protects access to the field across supported Dataverse access paths, independent of whether a control is visible.",
        concept: "Column security"
      }
    ],
    m05: [
      {
        question: "A main form must display read-only fields from the selected parent record. Which form component should you use?",
        options: ["Quick Create form", "Quick View form", "Card form", "A new dashboard"],
        answer: 1,
        explanation: "A Quick View form presents read-only information from a related record on the current form.",
        concept: "Quick View form"
      }
    ],
    m06: [
      {
        question: "A canvas app returns incomplete results only after the production table grows beyond 20,000 rows. What should you investigate first?",
        options: ["Delegation warnings and connector support", "The app icon", "The environment display name", "The dashboard refresh interval"],
        answer: 0,
        explanation: "Nondelegable formulas can evaluate only a limited local subset, so large data sources may produce incomplete results.",
        concept: "Delegation"
      }
    ],
    m07: [
      {
        question: "A flow must log failures for several related actions as one unit. Which design is most appropriate?",
        options: ["A Scope with Configure run after", "A canvas component", "A Quick View form", "A calculated column"],
        answer: 0,
        explanation: "Scopes group actions, and Configure run after can route failed, timed-out, or skipped execution into a catch path.",
        concept: "Flow error handling"
      }
    ],
    m09: [
      {
        question: "A derived value must remain consistent for model-driven apps, canvas apps, flows, and integrations. Where should the formula live?",
        options: ["In every app separately", "In a Dataverse formula or calculated column", "In a dashboard", "In a Power Pages theme"],
        answer: 1,
        explanation: "Data-layer logic gives every consumer the same value without duplicating formulas in each application.",
        concept: "Universal business logic"
      }
    ],
    m10: [
      {
        question: "Administrators need tenant-wide inventory and adoption insight to support their governance programme. Which toolkit can help?",
        options: ["CoE Starter Kit", "Quick Create forms", "A custom connector", "An alternate key"],
        answer: 0,
        explanation: "The Center of Excellence Starter Kit provides administration, inventory, adoption, and compliance insights alongside native controls.",
        concept: "CoE Starter Kit"
      }
    ]
  };

  Object.entries(extraQuestions).forEach(([moduleId, questions]) => {
    const module = data.modules.find((item) => item.id === moduleId);
    if (module) module.masteryChecks.push(...questions);
  });

  const labAdditions = {
    "lab-01": [
      "Add a connection reference for any connector used by the solution.",
      "Use Show dependencies and Solution Checker before exporting a managed build for Test."
    ],
    "lab-04": [
      "Add a unique external reference and configure it as an alternate key.",
      "Compare User and Business Unit access depth, then protect one sensitive column with column security."
    ],
    "lab-05": [
      "Create a Quick Create form for fast record entry and a Quick View form for related read-only context.",
      "Create a second main form and assign it to a different security role."
    ],
    "lab-07": [
      "Test the Gallery with enough records to reveal delegation warnings.",
      "Rewrite one nondelegable query as a delegable Filter supported by Dataverse."
    ],
    "lab-08": [
      "Add one controlled action to the agent and test it with an authenticated user.",
      "Sketch how Power Pages web roles and table permissions would expose selected records externally."
    ],
    "lab-09": [
      "Add trigger filtering columns and a trigger condition so irrelevant updates create no run.",
      "Use an expression in one action and inspect its inputs and outputs in run history."
    ],
    "lab-10": [
      "Compare the same request with and without approved grounding, recording unsupported claims.",
      "Add a human review point before generated advice can update a consequential field."
    ],
    "lab-12": [
      "Review relationship cascade settings and test the intended behavior when a parent record is assigned or deleted."
    ]
  };

  Object.entries(labAdditions).forEach(([labId, checkpoints]) => {
    const lab = data.labs.find((item) => item.id === labId);
    if (lab) lab.checkpoints.push(...checkpoints);

    Object.values(data.lenses).forEach((lens) => {
      const override = lens.labOverrides?.[labId];
      if (override?.checkpoints) override.checkpoints.push(...checkpoints);
    });
  });

  data.decisionTables.push(
    {
      title: "ALM Failure Diagnosis",
      rows: [
        ["Managed update imported but the old customization remains", "Inspect solution layers; remove the unmanaged active customization"],
        ["Import reports a missing required component", "Deploy the base solution first or include the dependency"],
        ["Installed components must be removed cleanly", "Uninstall the managed solution after dependency and data review"],
        ["Integration must upsert by a business identifier", "Alternate key"],
        ["Repeatable governed promotion across stages", "Power Platform Pipeline"]
      ]
    },
    {
      title: "Security and External Access",
      rows: [
        ["Control record operations and access depth", "Security role"],
        ["Protect a sensitive field", "Column security profile"],
        ["Grant group-based record access", "Owner team or Microsoft Entra group team"],
        ["Control parent-child assign, share, or delete behavior", "Relationship cascade settings"],
        ["Expose selected Dataverse rows to external users", "Power Pages web roles and table permissions"]
      ]
    }
  );

  data.examTactics.push(
    "Imported change missing? Inspect the active solution layer before rebuilding.",
    "Import blocked? Look for a dependency and the correct base-solution order.",
    "Large canvas result incomplete? Test delegation before increasing the data-row limit.",
    "Integration needs a unique business ID? Think alternate key.",
    "Quick Create enters a record; Quick View displays related read-only context."
  );
})();
