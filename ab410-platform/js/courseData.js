window.AB410_DATA = {
  course: {
    code: "AB-410",
    title: "Building Intelligent Applications",
    subtitle: "A complete exam-first course for Microsoft Power Platform intelligent applications.",
    passMark: "700/1000",
    duration: "120 minutes",
    style: "Scenario-based",
    masterwork: "Clinic Incident & Improvement Platform",
    source: "AB410_Definitive_Edition.pdf",
    principle: "Name the floor, map the need, choose the lowest capable tool."
  },
  lenses: {
    healthcare: {
      id: "healthcare",
      label: "Healthcare",
      learner: "Jama",
      role: "Clinician",
      masterwork: "Clinic Incident & Improvement Platform",
      solutionName: "Clinic Incident System",
      tagline: "A governed clinical safety platform for logging, reviewing, approving, analysing, and improving patient-safety incidents.",
      scenario: "A clinician logs a safety incident from a mobile app. A clinical lead reviews severe cases, AI suggests a grounded root cause, and governance keeps data safe.",
      labIntro: "The labs build a clinical governance system: tables for clinicians and incidents, two apps, high-severity approvals, AI root-cause suggestions, and data-layer rules.",
      layers: [
        { layer: "Foundation", description: "Developer environment, Clinic Incident System solution, Clinician and Incident tables, security roles" },
        { layer: "Rooms", description: "Incident Management model-driven app and Incident Logger canvas app" },
        { layer: "Reflexes", description: "High-severity incident approval flow using Manager Email" },
        { layer: "Mind", description: "Grounded AI Root Cause prompt and prebuilt extraction model" },
        { layer: "Law", description: "Corrective Action business rule, process flow, DLP, monitoring" }
      ],
      moduleLens: {
        m00: {
          title: "Clinical safety lens",
          scenario: "Treat the platform like a patient-safety pathway. Dataverse is the clinical record, apps are the entry points, flows are escalation pathways, and AI is a decision-support assistant.",
          memory: "Ask: where should this safety decision live so it holds across every clinical access route?"
        },
        m01: {
          title: "Clinical environment lens",
          scenario: "Development is the simulation room, sandbox is the test clinic, and production is the live clinic where real staff depend on the app.",
          memory: "Never rehearse with real patients in the room. Never experiment in production."
        },
        m02: {
          title: "Clinical ALM lens",
          scenario: "The solution is the complete safety pathway packaged for deployment: tables, forms, apps, flows, prompts, and rules travel together.",
          memory: "The clinical protocol should move as one governed package, not as loose pieces."
        },
        m03: {
          title: "Clinical design lens",
          scenario: "Mobile reporting points to canvas, clinical lead review points to model-driven, escalation points to cloud flow, and root-cause support points to AI Hub.",
          memory: "Translate symptoms into platform organs."
        },
        m04: {
          title: "Clinical data lens",
          scenario: "Clinician is the reference table, Incident is the event table, Severity is a Choice, and Logged By is a Lookup.",
          memory: "A safety record is only trustworthy if its categories, relationships, and permissions are controlled."
        },
        m05: {
          title: "Clinical records lens",
          scenario: "The model-driven app is the governance office: open incidents, clinician links, views, charts, and dashboards.",
          memory: "Use model-driven when records and consistency matter more than bespoke screens."
        },
        m06: {
          title: "Clinical mobile lens",
          scenario: "The canvas app is the ward-friendly reporting tool: large controls, quick save, clear errors, and Monitor for diagnostics.",
          memory: "Canvas is the clinical workflow tailored to the hand and moment."
        },
        m07: {
          title: "Clinical escalation lens",
          scenario: "A high-severity incident should never rely on someone remembering to email the clinical lead. The flow makes escalation automatic.",
          memory: "Automation turns clinical memory into clinical proof."
        },
        m08: {
          title: "Clinical AI lens",
          scenario: "AI can suggest a likely root cause only if grounded in approved SOPs or governance guidance.",
          memory: "In healthcare, confident but ungrounded AI is a risk, not a feature."
        },
        m09: {
          title: "Clinical rule lens",
          scenario: "High severity requires Corrective Action everywhere: canvas, model-driven, flow, or import.",
          memory: "Clinical safety rules belong at the data layer."
        },
        m10: {
          title: "Clinical governance lens",
          scenario: "DLP prevents confidential incident data from leaving safe connectors, and monitoring creates accountability.",
          memory: "Responsible AI is part of clinical permission to deploy."
        }
      }
    },
    engineering: {
      id: "engineering",
      label: "Engineering",
      learner: "Ismail",
      role: "Civil engineer",
      masterwork: "Infrastructure Defect & Improvement Platform",
      solutionName: "Infrastructure Defect System",
      tagline: "A site-quality platform for logging defects, managing inspections, routing critical issues, analysing failure modes, and governing engineering evidence.",
      scenario: "A site engineer logs a structural or quality defect from site. A project lead reviews critical defects, AI suggests likely failure modes, and governance preserves auditable engineering evidence.",
      labIntro: "The labs build a civil-engineering quality system: tables for engineers and defects, two apps, critical-defect approvals, AI failure-mode suggestions, and data-layer rules.",
      replacements: [
        ["Clinic Incident & Improvement Platform", "Infrastructure Defect & Improvement Platform"],
        ["Clinic Incident System", "Infrastructure Defect System"],
        ["Incident Management", "Defect Management"],
        ["Incident Logger", "Site Defect Logger"],
        ["Incident Viewer", "Defect Viewer"],
        ["Manager Email", "Project Lead Email"],
        ["AI Root Cause", "AI Failure Mode"],
        ["Corrective Action", "Remedial Action"],
        ["Logged By", "Reported By"],
        ["Clinicians", "Engineers"],
        ["Clinician", "Engineer"],
        ["clinicians", "engineers"],
        ["clinician", "engineer"],
        ["Incidents", "Defects"],
        ["Incident", "Defect"],
        ["incidents", "defects"],
        ["incident", "defect"],
        ["clinical governance", "engineering assurance"],
        ["clinical", "engineering"],
        ["Clinic", "Site"],
        ["clinic", "site"],
        ["High-severity", "Critical"],
        ["high-severity", "critical"],
        ["Severity", "Risk Level"],
        ["severity", "risk level"]
      ],
      layers: [
        { layer: "Foundation", description: "Developer environment, Infrastructure Defect System solution, Engineer and Defect tables, security roles" },
        { layer: "Rooms", description: "Defect Management model-driven app and Site Defect Logger canvas app" },
        { layer: "Reflexes", description: "Critical defect approval flow using Project Lead Email" },
        { layer: "Mind", description: "Grounded AI Failure Mode prompt and prebuilt extraction model" },
        { layer: "Law", description: "Remedial Action business rule, inspection process flow, DLP, monitoring" }
      ],
      moduleLens: {
        m00: {
          title: "Engineering systems lens",
          scenario: "Treat the platform like an infrastructure project control system. Dataverse is the project record, apps are site and office interfaces, flows are escalation routes, and AI is engineering decision support.",
          memory: "Ask: where should this engineering control live so it survives every route into the project record?"
        },
        m01: {
          title: "Engineering environment lens",
          scenario: "Development is the design office model, sandbox is the temporary works trial, and production is the live site system used for real inspections.",
          memory: "Do not test unstable designs on a live bridge. Do not experiment in production."
        },
        m02: {
          title: "Engineering ALM lens",
          scenario: "The solution is the packaged quality system: tables, inspection forms, defect apps, approval flows, prompts, and rules move as one controlled release.",
          memory: "A design package should be versioned and issued as a set, not as scattered drawings."
        },
        m03: {
          title: "Engineering design lens",
          scenario: "Site capture points to canvas, project-office defect control points to model-driven, critical escalation points to cloud flow, and failure-mode support points to AI Hub.",
          memory: "Translate site requirements into the right platform components."
        },
        m04: {
          title: "Engineering data lens",
          scenario: "Engineer is the reference table, Defect is the event table, Risk Level is a Choice, and Reported By is a Lookup.",
          memory: "A defect register only works if categories, references, and permissions are controlled."
        },
        m05: {
          title: "Engineering records lens",
          scenario: "The model-driven app is the project control room: open defects, engineer links, views, charts, and dashboards.",
          memory: "Use model-driven when structured records, consistency, and traceability matter most."
        },
        m06: {
          title: "Engineering site lens",
          scenario: "The canvas app is the site-friendly logger: quick defect capture, clear controls, robust saving, and Monitor for diagnostics.",
          memory: "Canvas is for the site workflow shaped to the working environment."
        },
        m07: {
          title: "Engineering escalation lens",
          scenario: "A critical defect should not depend on a site engineer remembering to email the project lead. The flow makes escalation automatic.",
          memory: "Automation turns site memory into auditable project evidence."
        },
        m08: {
          title: "Engineering AI lens",
          scenario: "AI can suggest a likely failure mode only if grounded in approved standards, method statements, inspection guidance, or project documents.",
          memory: "In engineering, ungrounded AI is not evidence."
        },
        m09: {
          title: "Engineering rule lens",
          scenario: "Critical defects require Remedial Action everywhere: canvas, model-driven, flow, or import.",
          memory: "Engineering controls belong at the data layer when they must not be bypassed."
        },
        m10: {
          title: "Engineering governance lens",
          scenario: "DLP prevents project evidence from leaking across unsafe connectors, and monitoring proves who used what and when.",
          memory: "Governance protects traceability, accountability, and professional assurance."
        }
      },
      labOverrides: {
        "lab-01": {
          title: "Establish the Project Worlds and Container",
          objective: "Create the authoring world, unmanaged engineering solution, publisher, and first environment variable.",
          build: "Infrastructure Defect System solution",
          checkpoints: [
            "Confirm you are in a Developer environment, not Default.",
            "Create a new solution named Infrastructure Defect System.",
            "Create a publisher with prefix ids.",
            "Create a Project Lead Email text environment variable.",
            "Commit to creating every later engineering component inside the same solution."
          ],
          deliverable: "An unmanaged engineering solution with deployment-survival scaffolding.",
          examAnchor: "Developer vs Default, unmanaged authoring, environment variables."
        },
        "lab-02": {
          title: "Architect the Engineer Table",
          objective: "Build the one side of the data model before defects cite it.",
          build: "Engineer table",
          checkpoints: [
            "Create a custom table named Engineer.",
            "Notice the automatically created primary Name column.",
            "Add Email as Text with Email format.",
            "Add Role as Choice with Site Engineer, Project Engineer, and QA Lead.",
            "Add three sample engineers."
          ],
          deliverable: "A trusted source table that later defect records can reference.",
          examAnchor: "Custom table, primary column, Choice instead of Text."
        },
        "lab-03": {
          title: "Build Defect, Relationship, and AI Column",
          objective: "Create the central Defect table, link it to Engineer, and add an AI prompt column.",
          build: "Defect table",
          checkpoints: [
            "Create Defect with plural Defects.",
            "Add Description, Risk Level, Status, and Date Reported columns.",
            "Create Reported By as a Lookup to Engineer.",
            "Add AI Failure Mode as a Prompt column if available.",
            "Create varied sample defects tied to engineers."
          ],
          deliverable: "Two related Dataverse tables with the shared project record taking shape.",
          examAnchor: "Lookup on the many side, Choice values, Prompt column."
        },
        "lab-04": {
          title: "Add a View and Least-Privilege Role",
          objective: "Save a reusable project-control question and enforce read-only access at the data layer.",
          build: "Open Defects view and Defect Viewer role",
          checkpoints: [
            "Create an Open Defects view on the Defect table.",
            "Show Title, Risk Level, Status, Reported By, and Date Reported.",
            "Filter Status equals Open.",
            "Create Defect Viewer security role.",
            "Grant Read on Defect and Engineer; deny Create, Write, and Delete."
          ],
          deliverable: "A saved view plus least-privilege security that works across all access paths.",
          examAnchor: "Views as saved questions, security role instead of hidden controls."
        },
        "lab-05": {
          title: "Grow the Defect Management App",
          objective: "Generate a model-driven app from the engineering data model.",
          build: "Defect Management model-driven app",
          checkpoints: [
            "Create a model-driven app named Defect Management.",
            "Add Defect and Engineer as Dataverse table pages.",
            "Review the generated sitemap navigation.",
            "Set Open Defects as the default view.",
            "Publish and play the app, testing drill-through to Engineer."
          ],
          deliverable: "A working project-control records app without hand-designing screens.",
          examAnchor: "Model-driven generated UI, views, forms, relationships, security."
        },
        "lab-06": {
          title: "Compose the Project Control Room",
          objective: "Turn defect records into trends with charts, dashboards, and generative pages.",
          build: "Charts and dashboard",
          checkpoints: [
            "Create a Defects by Risk Level chart.",
            "Create a Defects by Status chart.",
            "Build a dashboard containing charts and Open Defects.",
            "Add the dashboard to the model-driven app.",
            "Try a generative page prompt for critical open defects."
          ],
          deliverable: "A project-control dashboard and first exposure to generative app authoring.",
          examAnchor: "Charts, dashboards, sitemap, generative pages."
        },
        "lab-07": {
          title: "Hand-Build on the Same Project Record",
          objective: "Create a mobile canvas app that writes to the same Defect table.",
          build: "Site Defect Logger canvas app",
          checkpoints: [
            "Create a phone canvas app named Site Defect Logger.",
            "Connect it to the Defect Dataverse table.",
            "Add txtDescription, drpRiskLevel, and Submit controls.",
            "Use Patch with IfError to save defects gracefully.",
            "Add a Gallery filtered to open defects.",
            "Use Monitor while submitting a test defect."
          ],
          deliverable: "A site defect logger sharing the same Dataverse spine as the model-driven app.",
          examAnchor: "Canvas use case, Power Fx Patch, Filter, IfError, Monitor."
        },
        "lab-08": {
          title: "Reusable Craft and Embedded Engineering Agent",
          objective: "Use named formulas and connect a grounded Copilot Studio agent.",
          build: "Named formula plus Site Defect Helper agent",
          checkpoints: [
            "Declare CurrentUserName = User().FullName in App.Formulas.",
            "Show the named formula in a welcome label.",
            "Create a Site Defect Helper Copilot Studio agent.",
            "Ground it on a short defect logging and inspection guidance document.",
            "Connect the agent to the canvas app and test a defect logging question."
          ],
          deliverable: "A hand-crafted site app with reusable logic and embedded engineering help.",
          examAnchor: "Named formulas, Copilot Studio agent, grounding."
        },
        "lab-09": {
          title: "Wire the Critical Defect Approval Reflex",
          objective: "Build the central cloud flow that routes critical defects for approval.",
          build: "Power Automate approval flow",
          checkpoints: [
            "Create an automated cloud flow inside the solution.",
            "Trigger when a Defect row is added.",
            "Branch when Risk Level equals Critical.",
            "Start and wait for an approval assigned to Project Lead Email.",
            "Update Status to Investigating if approved and Closed if rejected.",
            "Add Scope-based error handling configured to run after failure."
          ],
          deliverable: "A governed reflex: critical defects trigger approval and recorded outcomes.",
          examAnchor: "Automated trigger, condition, approval, environment variable, run-after error handling."
        },
        "lab-10": {
          title: "Add a Grounded Generative Engineering Mind",
          objective: "Author a grounded prompt and consume it in the approval flow.",
          build: "AI Failure Mode prompt",
          checkpoints: [
            "Create an AI Hub prompt from blank or template.",
            "Declare DefectDescription as an input.",
            "Instruct the prompt to return likely failure mode and three remedial actions.",
            "Add approved inspection guidance, standard, or method statement as knowledge.",
            "Call the prompt from the Lab 9 flow.",
            "Write the output to the AI Failure Mode column."
          ],
          deliverable: "An intelligent flow that reasons over defect descriptions before project lead review.",
          examAnchor: "Prompt input, grounding, consume prompt in flow."
        },
        "lab-11": {
          title: "Contrast a Prebuilt Engineering Mind",
          objective: "Use a prebuilt model so the prompt-versus-model distinction becomes physical.",
          build: "Prebuilt key phrase or sentiment model",
          checkpoints: [
            "Open AI Hub prebuilt models.",
            "Select Key Phrase Extraction or Sentiment.",
            "Add the AI Builder action to the existing flow.",
            "Pass Defect Description as input.",
            "Write the output to a text column.",
            "Compare ready-made extraction with your grounded engineering prompt."
          ],
          deliverable: "The same engineering system using two different shapes of AI.",
          examAnchor: "Prompt vs prebuilt model vs custom model."
        },
        "lab-12": {
          title: "Make Engineering Correctness a Law of the System",
          objective: "Add data-layer correctness with a business rule, rollup, and process flow.",
          build: "Business logic layer",
          checkpoints: [
            "Add Remedial Action text column if needed.",
            "Create a business rule: if Risk Level is Critical, Remedial Action is required.",
            "Add Open Defect Count rollup on Engineer.",
            "Create a business process flow for Logged, Investigating, Actioned, Closed.",
            "Add the process flow to your model-driven app.",
            "Test that the rule holds through the app."
          ],
          deliverable: "A complete intelligent engineering application with data-layer law and guided process.",
          examAnchor: "Business rule, rollup, business process flow, universal enforcement."
        }
      }
    }
  },
  domains: [
    {
      id: "foundation",
      label: "Domain 1",
      title: "The Foundation",
      weight: "25-30%",
      weightValue: 27.5,
      summary: "Environments, solutions, ALM, solution design, Dataverse, security, and the data model."
    },
    {
      id: "applications",
      label: "Domain 2",
      title: "The Applications",
      weight: "25-30%",
      weightValue: 27.5,
      summary: "Model-driven apps, canvas apps, Power Fx, charts, dashboards, components, and app quality."
    },
    {
      id: "logic",
      label: "Domain 3",
      title: "Logic, Automation, and Intelligence",
      weight: "40-45%",
      weightValue: 45,
      summary: "Cloud flows, approvals, AI Hub, prompts, models, business logic, Responsible AI, and governance."
    }
  ],
  architecture: [
    { layer: "Foundation", description: "Environment, solution, Dataverse tables, relationships, security" },
    { layer: "Rooms", description: "Model-driven app for records; canvas app for mobile capture" },
    { layer: "Reflexes", description: "Power Automate reacts, routes approvals, handles failures" },
    { layer: "Mind", description: "AI Hub prompts and models summarize, classify, extract, and reason" },
    { layer: "Law", description: "Business rules, process flows, DLP, Managed Environments, monitoring" }
  ],
  modules: [
    {
      id: "m00",
      number: "00",
      domain: "orientation",
      title: "Orientation and Platform Mental Model",
      shortTitle: "Orientation",
      time: "45 min",
      difficulty: "Foundational",
      summary: "Learn the course logic: one shared spine, one cumulative project, and five movements for each concept.",
      outcomes: [
        "Explain why the Power Platform exists for the middle ground between spreadsheets and custom software.",
        "Describe Dataverse as the shared spine connecting apps, automation, AI, and governance.",
        "Use the layered building model to classify exam scenarios quickly."
      ],
      topics: [
        "Low-code as a spectrum",
        "Dataverse as shared spine",
        "Canvas apps, model-driven apps, flows, Copilot Studio, AI Hub, and governance as one system",
        "The Clinic Incident & Improvement Platform masterwork"
      ],
      coreIdea: "The platform is not a bag of products. It is a set of tools arranged around a shared data spine.",
      whyItExists: "Organisations have many processes too specific to buy and too small to build with traditional software teams. Low-code gives domain experts a way to build reliable applications without leaving professional architecture behind.",
      mentalModel: "Dataverse is the spine. Apps are limbs. Flows are reflexes. AI is the brain. Governance is the conscience and the locks.",
      misconception: "Beginners think they must integrate separate products. The deeper move is to see one platform sharing one trusted data layer.",
      examTip: "When a scenario feels noisy, first decide which layer it belongs to: foundation, rooms, reflexes, mind, or law.",
      labIds: [],
      masteryChecks: [
        {
          question: "A team needs one trusted place that apps, flows, and AI can all use. Which platform idea is being tested?",
          options: ["Canvas app layout", "Dataverse as the shared spine", "A scheduled trigger", "A dashboard"],
          answer: 1,
          explanation: "Dataverse is the shared data layer that lets the rest of the platform work from one copy of truth.",
          concept: "Shared spine"
        },
        {
          question: "The best AB-410 answer usually chooses which level of tooling?",
          options: ["The most powerful tool available", "The newest AI capability", "The lowest-code option that fully meets the need", "A custom connector first"],
          answer: 2,
          explanation: "The course repeatedly frames disciplined design as using the least custom, least complex option that fully solves the requirement.",
          concept: "Low-code ladder"
        }
      ]
    },
    {
      id: "m01",
      number: "01",
      domain: "foundation",
      title: "Environments: The Worlds Your Work Lives In",
      shortTitle: "Environments",
      time: "60 min",
      difficulty: "Core",
      summary: "Separate development, testing, production, and governance so real users are never exposed to experimental work.",
      outcomes: [
        "Distinguish Default, Developer, Sandbox, and Production environments.",
        "Explain why environment isolation protects data, users, regions, and change control.",
        "Separate environment type from Managed Environments governance."
      ],
      topics: [
        "Tenant versus environment",
        "Default environment risk",
        "Developer environment for learning and solo build",
        "Sandbox for resettable testing",
        "Production for live users",
        "Managed Environments as a governance layer"
      ],
      coreIdea: "An environment is a self-contained world with its own database, apps, flows, and security boundary.",
      whyItExists: "Building, testing, and running software are different phases. Environments keep experimental work away from live users and protect data, region, security, and blast radius.",
      mentalModel: "A theatre: development is rehearsal, sandbox is dress rehearsal, production is opening night.",
      misconception: "Environment types and Managed Environments are not the same. Type is what the environment is for; Managed Environments is how tightly it is governed.",
      examTip: "Default is automatic and shared; Developer is solo learning; Sandbox is test and resettable; Production is live. Managed Environments is governance, not a fifth type.",
      labIds: ["lab-01"],
      masteryChecks: [
        {
          question: "Where should a learner build the course masterwork?",
          options: ["Default environment", "Developer environment", "Production environment", "A customer Power Pages site"],
          answer: 1,
          explanation: "A Developer environment is free, personal, and appropriate for authoring and learning.",
          concept: "Environment type"
        },
        {
          question: "An organisation wants sharing controls and usage insights across many makers. What is the best fit?",
          options: ["Sandbox environment", "Managed Environments", "A connection reference", "A business process flow"],
          answer: 1,
          explanation: "Managed Environments adds governance controls over environments; it is separate from the environment's purpose.",
          concept: "Managed Environments"
        },
        {
          question: "A test team must try destructive scenarios without polluting live records. Which environment type is designed for this?",
          options: ["Production", "Default", "Sandbox", "Managed"],
          answer: 2,
          explanation: "A sandbox is non-production and can be copied or reset for testing.",
          concept: "Sandbox"
        }
      ]
    },
    {
      id: "m02",
      number: "02",
      domain: "foundation",
      title: "Solutions and Lifecycle Discipline",
      shortTitle: "Solutions and ALM",
      time: "75 min",
      difficulty: "Core",
      summary: "Package project components, move them safely, and keep configuration portable across environments.",
      outcomes: [
        "Describe a solution as the container for tables, apps, flows, rules, and AI assets.",
        "Explain unmanaged authoring versus managed deployment.",
        "Choose environment variables, connection references, and pipelines for deployment survival."
      ],
      topics: [
        "Solutions as shipping containers",
        "Unmanaged versus managed",
        "Single source of truth",
        "Environment variables",
        "Connection references",
        "Deployment pipelines"
      ],
      coreIdea: "A solution makes a project one liftable object; ALM makes moving that object repeatable and governed.",
      whyItExists: "Without packaging, teams move components one by one, forget pieces, hardcode values, and break deployments. ALM prevents drift and makes change safe.",
      mentalModel: "A shipping container plus a logistics system. Components travel together; pipelines are the road crew.",
      misconception: "Do not edit deployed components downstream in production. Author unmanaged upstream, export managed downstream, and keep changes flowing from the source.",
      examTip: "Works in dev but breaks after deployment: value differs per environment means environment variable; connection did not carry over means connection reference; repeatable movement means pipeline.",
      labIds: ["lab-01"],
      masteryChecks: [
        {
          question: "Which solution state is used while authoring in development?",
          options: ["Managed", "Unmanaged", "Archived", "Published only"],
          answer: 1,
          explanation: "Unmanaged is open and editable, so it belongs in the authoring environment.",
          concept: "Managed vs unmanaged"
        },
        {
          question: "A flow needs a different manager email address in dev, test, and production. What should hold the value?",
          options: ["Hardcoded text in the flow", "Environment variable", "Security role", "Calculated column"],
          answer: 1,
          explanation: "Environment variables externalize values that legitimately differ per environment.",
          concept: "Environment variables"
        },
        {
          question: "A Dataverse flow connection must be remapped after deployment without rebuilding the flow. What handles this?",
          options: ["Connection reference", "Rollup column", "Business process flow", "Canvas component"],
          answer: 0,
          explanation: "Connection references abstract the connection so each environment can bind it correctly.",
          concept: "Connection references"
        }
      ]
    },
    {
      id: "m03",
      number: "03",
      domain: "foundation",
      title: "Solution Design: Translating Need Into Architecture",
      shortTitle: "Solution Design",
      time: "75 min",
      difficulty: "Core",
      summary: "Read a human business requirement and decompose it into the right Power Platform components.",
      outcomes: [
        "Map mobility, record management, automation, reasoning, public access, and one-shot AI to the right tool.",
        "Identify when to reuse built-in capability before building custom capability.",
        "Use the least capable tool that fully solves the requirement."
      ],
      topics: [
        "Canvas app versus model-driven app",
        "Power Pages for external users",
        "Cloud flow for automated consequence",
        "Copilot Studio agent for conversation",
        "AI Hub prompt or model for a single intelligent act",
        "Custom connector as an escape hatch"
      ],
      coreIdea: "Solution design is translating messy human need into precise technical composition.",
      whyItExists: "Requirements arrive as problems, not product names. The builder's value is choosing the correct combination before construction starts.",
      mentalModel: "A triage clinician: symptoms become system choices. Mobile logging points to canvas; automatic notification points to flow; likely cause points to AI.",
      misconception: "Do not start from your favourite tool and bend the requirement around it. Design from the need outward.",
      examTip: "Tag every distinct need in a scenario. Mobile/custom experience to canvas; records at scale to model-driven; public users to Power Pages; automatic consequence to flow; conversation to agent; summarise/extract/classify/draft to AI Hub.",
      labIds: [],
      masteryChecks: [
        {
          question: "Staff must log incidents on a phone with a guided, task-shaped interface. Which app type fits best?",
          options: ["Model-driven app", "Canvas app", "Power Pages", "Dashboard"],
          answer: 1,
          explanation: "Canvas apps are chosen when the experience itself needs deliberate shaping, especially mobile or task-specific interfaces.",
          concept: "Canvas choice"
        },
        {
          question: "Managers need a consistent back-office records interface over Dataverse tables. Which component should lead?",
          options: ["Model-driven app", "Copilot Studio agent", "Custom connector", "Instant flow"],
          answer: 0,
          explanation: "Model-driven apps are ideal for managing records at scale with consistency and speed.",
          concept: "Model-driven choice"
        },
        {
          question: "A single process step must summarize an incident description. Which capability is most likely?",
          options: ["Power Pages", "AI Hub prompt or model", "Business unit", "Managed solution"],
          answer: 1,
          explanation: "A single act of summarising, extracting, classifying, or drafting points to AI Hub prompt or model.",
          concept: "AI component choice"
        }
      ]
    },
    {
      id: "m04",
      number: "04",
      domain: "foundation",
      title: "Dataverse and the Art of the Data Model",
      shortTitle: "Dataverse",
      time: "120 min",
      difficulty: "Core",
      summary: "Design reliable tables, columns, relationships, views, forms, and security at the data layer.",
      outcomes: [
        "Choose standard versus custom tables correctly.",
        "Select the most constrained column type that fits the fact.",
        "Create 1:N relationships with lookup columns on the many side.",
        "Explain why security belongs at the table/data layer."
      ],
      topics: [
        "Tables and primary name column",
        "Text, number, choice, choices, lookup, date/time",
        "Calculated, formula, rollup, and prompt columns",
        "One-to-many and many-to-many relationships",
        "Forms, views, row summaries",
        "Security roles, least privilege, ownership, and business units"
      ],
      coreIdea: "A data model is the deliberate structure that turns messy information into trustworthy institutional memory.",
      whyItExists: "A spreadsheet is forgiving and fragile. Dataverse adds enforced types, relationships, security, and shared concurrent truth so apps, flows, and AI can trust the data.",
      mentalModel: "A library catalogue: defined places, precise references, governed access, and many people relying on one source.",
      misconception: "Text feels easy, but unconstrained text allows inconsistent, ambiguous data. Constraint creates trust.",
      examTip: "Choice for fixed categories, Lookup for references, Date for dates, Rollup for related child aggregate, Prompt for AI over a row. Enforce least privilege with security roles, not by hiding controls.",
      labIds: ["lab-02", "lab-03", "lab-04"],
      masteryChecks: [
        {
          question: "Severity must be Low, Medium, or High, and flows must depend on it reliably. Which column type?",
          options: ["Text", "Choice", "Lookup", "Rollup"],
          answer: 1,
          explanation: "Choice guarantees the value is one of the permitted categories.",
          concept: "Choice column"
        },
        {
          question: "Incident must reference the clinician who logged it. Which column type creates the relationship?",
          options: ["Prompt", "Lookup", "Formula", "Choices"],
          answer: 1,
          explanation: "A lookup column references a row in another table and creates the relationship.",
          concept: "Lookup"
        },
        {
          question: "Each clinician needs a count of related open incidents. Which derived column type fits?",
          options: ["Calculated", "Rollup", "Prompt", "Text"],
          answer: 1,
          explanation: "Rollup aggregates related child rows, such as counting incidents for a clinician.",
          concept: "Rollup"
        },
        {
          question: "Users must read incidents but never edit them through any app or path. What should enforce that?",
          options: ["Hide edit buttons in the canvas app", "Security role with read-only table privileges", "A chart", "A named formula"],
          answer: 1,
          explanation: "Security belongs at the data layer so all access paths obey it.",
          concept: "Least privilege"
        }
      ]
    },
    {
      id: "m05",
      number: "05",
      domain: "applications",
      title: "Model-Driven Apps: Interfaces Grown From Structure",
      shortTitle: "Model-Driven Apps",
      time: "90 min",
      difficulty: "Core",
      summary: "Build fast, consistent record-management applications by declaring tables, forms, views, charts, dashboards, and navigation.",
      outcomes: [
        "Explain why model-driven apps trade bespoke layout for speed, consistency, and maintainability.",
        "Use forms, views, charts, dashboards, and sitemap correctly.",
        "Recognise generative pages and data-model-driven app behaviour."
      ],
      topics: [
        "Generated UI from Dataverse structure",
        "Main, quick-create, quick-view, and card forms",
        "Views as saved questions",
        "Charts and dashboards",
        "Sitemap navigation",
        "Generative pages with Copilot"
      ],
      coreIdea: "You design the data; the app grows from it.",
      whyItExists: "Back-office record systems need consistency, responsiveness, security, and maintainability more than pixel-level control. Model-driven apps industrialise that category of interface.",
      mentalModel: "A modular wardrobe system: declare the modules and the system assembles a coherent, expandable whole.",
      misconception: "Model-driven apps are not weak because they constrain layout. The constraint is what gives them consistency and scale.",
      examTip: "Choose model-driven when the scenario centres on managing records at scale with consistency and build speed valued over bespoke visual control.",
      labIds: ["lab-05", "lab-06"],
      masteryChecks: [
        {
          question: "What determines the structure of a model-driven app most directly?",
          options: ["A blank canvas", "The Dataverse data model", "A weekly schedule", "A prompt template"],
          answer: 1,
          explanation: "Model-driven apps are generated from tables, forms, views, relationships, and security.",
          concept: "Generated interface"
        },
        {
          question: "A manager wants one screen combining incident charts and open incident lists. Which model-driven element fits?",
          options: ["Dashboard", "Lookup", "UpdateContext", "DLP policy"],
          answer: 0,
          explanation: "Dashboards compose charts, views, and lists into one situational screen.",
          concept: "Dashboard"
        },
        {
          question: "Which item governs the many-record list experience?",
          options: ["Form", "View", "Prompt column", "Business process stage"],
          answer: 1,
          explanation: "Views define saved, filtered, sorted lists of records.",
          concept: "Views"
        }
      ]
    },
    {
      id: "m06",
      number: "06",
      domain: "applications",
      title: "Canvas Apps: Interfaces Shaped by Hand",
      shortTitle: "Canvas Apps",
      time: "120 min",
      difficulty: "Core",
      summary: "Hand-craft mobile and task-specific experiences, then wire them to data with Power Fx and quality disciplines.",
      outcomes: [
        "Choose canvas apps when the user experience itself is the requirement.",
        "Recognise core Power Fx functions and their purpose.",
        "Apply app-quality disciplines: accessibility, performance, responsiveness, usability, error handling, and Monitor."
      ],
      topics: [
        "Blank canvas and controls",
        "Power Fx as declarative formulas",
        "Filter, Search, LookUp, Patch",
        "Set, UpdateContext, Collect, ClearCollect, ForAll",
        "IfError, IsError, Errors",
        "Named formulas, user-defined functions, components, component libraries",
        "Monitor and app-quality virtues"
      ],
      coreIdea: "Canvas gives total control over the experience, paid for with total responsibility.",
      whyItExists: "Some work needs a mobile, branded, or highly task-shaped experience that generated screens cannot provide. Canvas exists for those moments.",
      mentalModel: "The artisan's workbench; Power Fx is the chisel.",
      misconception: "Do not use canvas just because it is familiar. If the job is records-at-scale, model-driven is usually the better fit.",
      examTip: "Filter returns many rows; LookUp returns one record. Set is global; UpdateContext is screen-local. Patch is the save verb.",
      labIds: ["lab-07", "lab-08"],
      masteryChecks: [
        {
          question: "Which Power Fx function creates or updates a Dataverse row?",
          options: ["Patch", "Search", "Set", "ForAll"],
          answer: 0,
          explanation: "Patch is the core save verb for writing records.",
          concept: "Patch"
        },
        {
          question: "A formula must return all open incidents. Which function fits?",
          options: ["LookUp", "Filter", "Set", "Notify"],
          answer: 1,
          explanation: "Filter returns a table of all rows matching the condition.",
          concept: "Filter"
        },
        {
          question: "A value is needed across multiple screens. Which variable function fits?",
          options: ["UpdateContext", "Set", "Errors", "Search"],
          answer: 1,
          explanation: "Set creates a global variable available across the whole app.",
          concept: "Set vs UpdateContext"
        },
        {
          question: "A canvas app runs slowly and saves fail intermittently. Which tool helps trace the actual events?",
          options: ["Monitor", "Dashboard", "Security role", "Managed solution"],
          answer: 0,
          explanation: "Monitor records app events so you can diagnose failures and performance issues.",
          concept: "Monitor"
        }
      ]
    },
    {
      id: "m07",
      number: "07",
      domain: "logic",
      title: "Cloud Flows: Encoding Consequence",
      shortTitle: "Cloud Flows",
      time: "120 min",
      difficulty: "High-value",
      summary: "Use Power Automate to make the right consequences follow events automatically and with evidence.",
      outcomes: [
        "Choose automated, instant, and scheduled triggers correctly.",
        "Select connectors while noticing premium licensing signals.",
        "Use conditions, loops, approvals, and error-handling scopes appropriately."
      ],
      topics: [
        "Trigger and actions",
        "Automated, instant, scheduled triggers",
        "Standard versus premium connectors",
        "SQL Server, custom connector, and HTTP as premium signals",
        "Condition, Apply to each, Do until",
        "Approvals",
        "Scope and configure run after for Try/Catch behaviour"
      ],
      coreIdea: "A flow makes consequence structural instead of dependent on memory.",
      whyItExists: "Without automation, people must remember every notification, approval, status update, and audit trail. Flows manufacture reliability and proof.",
      mentalModel: "A reflex arc: when the world changes, the response fires automatically.",
      misconception: "Apply to each and Do until are different. Apply to each is for a known collection; Do until repeats until a condition changes.",
      examTip: "Data/system event means automated trigger; person/button/app means instant; clock means scheduled. Human decision means Approval. SQL, HTTP, and custom connectors point to premium licensing.",
      labIds: ["lab-09"],
      masteryChecks: [
        {
          question: "A flow should run whenever a Dataverse incident row is added. Which trigger type?",
          options: ["Instant", "Scheduled", "Automated", "Manual only"],
          answer: 2,
          explanation: "A data event should use an automated trigger.",
          concept: "Automated trigger"
        },
        {
          question: "A manager must approve or reject a high-severity incident inside the flow. Which action fits?",
          options: ["Approval", "Apply to each", "Search", "View"],
          answer: 0,
          explanation: "The Approval action is the standard way to include a human decision mid-flow.",
          concept: "Approval"
        },
        {
          question: "A flow must repeat until a file appears. Which control should be used?",
          options: ["Apply to each", "Do until", "Business rule", "Rollup"],
          answer: 1,
          explanation: "Do until repeats until a condition becomes true.",
          concept: "Do until"
        },
        {
          question: "Which connector signal should make you consider premium licensing?",
          options: ["Teams connector", "SharePoint connector", "HTTP action", "Dataverse connector"],
          answer: 2,
          explanation: "HTTP, SQL Server, and custom connectors are premium signals in the course material.",
          concept: "Premium connector"
        }
      ]
    },
    {
      id: "m08",
      number: "08",
      domain: "logic",
      title: "AI Hub: Giving the System a Mind",
      shortTitle: "AI Hub",
      time: "135 min",
      difficulty: "High-value",
      summary: "Embed prompts and AI models into apps and flows, grounding them so outputs are accurate, safe, and useful.",
      outcomes: [
        "Differentiate prompt, prebuilt model, and custom model.",
        "Explain grounding as the structural defence against hallucination and off-policy output.",
        "Consume AI output in flows and apps."
      ],
      topics: [
        "AI Hub and AI Builder",
        "Prompts, inputs, templates, settings, and models",
        "Grounding with approved knowledge",
        "Prebuilt models for common tasks",
        "Custom models for unique trained tasks",
        "Calling prompts from flows and apps"
      ],
      coreIdea: "The system moves from following explicit instructions to interpreting and generating.",
      whyItExists: "Ordinary logic cannot read free text, infer likely causes, extract meaning, or draft useful summaries. AI Hub gives these capabilities to low-code builders.",
      mentalModel: "The cloud flow is the reflex arc; AI Hub is the cortex wired into it.",
      misconception: "If AI invents or goes off-policy, clever wording is not the structural fix. Add grounding knowledge first.",
      examTip: "Prompt is open, generative, instructed in words, and groundable. Prebuilt model is a common solved task. Custom model is unique, trained on your data.",
      labIds: ["lab-10", "lab-11"],
      masteryChecks: [
        {
          question: "An AI output is fluent but not based on approved policy. What is the first structural fix?",
          options: ["Change to a scheduled trigger", "Add knowledge/grounding", "Use a dashboard", "Hide the output column"],
          answer: 1,
          explanation: "Grounding anchors AI output in approved sources and is the main defence against hallucination or off-policy content.",
          concept: "Grounding"
        },
        {
          question: "You need a bespoke root-cause suggestion from incident text, using your own instruction. Which AI type fits?",
          options: ["Prompt", "Prebuilt receipt model", "Business rule", "Security role"],
          answer: 0,
          explanation: "A prompt is ideal for open, generative language tasks you instruct in words.",
          concept: "Prompt"
        },
        {
          question: "You need key phrases from incident descriptions using a common ready-made capability. Which tool fits?",
          options: ["Custom model", "Prebuilt model", "Power Pages", "Connection reference"],
          answer: 1,
          explanation: "Key phrase extraction is a common task suitable for a prebuilt model.",
          concept: "Prebuilt model"
        },
        {
          question: "No prebuilt model matches your organisation's unique document categories, and you have labelled examples. What fits?",
          options: ["Custom model", "Managed solution", "Choice column", "Instant trigger"],
          answer: 0,
          explanation: "A custom model is trained on your labelled data for unique, well-defined tasks.",
          concept: "Custom model"
        }
      ]
    },
    {
      id: "m09",
      number: "09",
      domain: "logic",
      title: "Business Logic: Rules That Hold Everywhere",
      shortTitle: "Business Logic",
      time: "90 min",
      difficulty: "High-value",
      summary: "Place correctness in the data layer through business rules, business process flows, and derived columns.",
      outcomes: [
        "Choose business rules for field-level correctness.",
        "Choose business process flows for ordered stage guidance.",
        "Separate business rules from cloud flows."
      ],
      topics: [
        "Business rules",
        "Business process flows",
        "Calculated, formula, rollup columns",
        "Universal enforcement at the data layer",
        "Business rule versus cloud flow"
      ],
      coreIdea: "A rule enforced only at one surface is not truly enforced.",
      whyItExists: "Rules on a single app can be bypassed by another app, a flow, or import. Rules in the data layer become true across every path.",
      mentalModel: "Data-layer logic is the law of physics; app-only logic is a house rule.",
      misconception: "Do not use a cloud flow to enforce simple synchronous field logic. A business rule is the lower, more universal tool.",
      examTip: "Show/hide/require/set/validate within a record means business rule. Ordered stages mean business process flow. Cross-system or temporal process means cloud flow.",
      labIds: ["lab-12"],
      masteryChecks: [
        {
          question: "High-severity incidents must require Corrective Action across all apps. Which feature fits?",
          options: ["Business rule", "Canvas button", "Dashboard", "Scheduled flow"],
          answer: 0,
          explanation: "A business rule enforces field-level logic at the table/form layer.",
          concept: "Business rule"
        },
        {
          question: "Users must follow Logged -> Investigating -> Actioned -> Closed with required fields at stages. Which feature fits?",
          options: ["Business process flow", "Connection reference", "Power Fx Set", "DLP policy"],
          answer: 0,
          explanation: "Business process flows guide users through ordered stages.",
          concept: "Business process flow"
        },
        {
          question: "A process must call Teams, send approvals, and update multiple systems over time. Which tool fits?",
          options: ["Business rule", "Cloud flow", "Choice column", "Quick-view form"],
          answer: 1,
          explanation: "Cross-system and temporal processes are cloud flow territory.",
          concept: "Business rule vs flow"
        }
      ]
    },
    {
      id: "m10",
      number: "10",
      domain: "logic",
      title: "Responsible AI and Governance",
      shortTitle: "Governance",
      time: "75 min",
      difficulty: "High-value",
      summary: "Make AI and maker activity safe, private, fair, transparent, and accountable.",
      outcomes: [
        "Map governance symptoms to grounding, DLP, Managed Environments, or monitoring.",
        "Explain why Responsible AI is a deployment requirement, not optional polish.",
        "Connect privacy, safety, fairness, transparency, and accountability to platform controls."
      ],
      topics: [
        "Responsible AI principles",
        "Grounding",
        "Data-loss-prevention policies",
        "Managed Environments",
        "Monitoring and accountability"
      ],
      coreIdea: "Responsible AI is the conscience of the intelligent application.",
      whyItExists: "AI that leaks data, invents policy, treats people unfairly, or cannot be monitored is not deployable in a governed organisation.",
      mentalModel: "Governance as physics, not memo: make dangerous combinations structurally impossible.",
      misconception: "Governance is not documentation after the build. It is part of the architecture from the start.",
      examTip: "Data could leak across connectors means DLP. Wrong or off-policy AI means grounding. Many makers need control means Managed Environments. Need usage and behaviour visibility means monitoring.",
      labIds: [],
      masteryChecks: [
        {
          question: "A flow must be prevented from combining Dataverse confidential data with a public social connector. Which control fits?",
          options: ["DLP policy", "Business process flow", "Search function", "Prompt input"],
          answer: 0,
          explanation: "DLP policies classify connectors and block unsafe combinations.",
          concept: "DLP"
        },
        {
          question: "Admins need visibility into how apps and flows are used. Which governance answer fits?",
          options: ["Monitoring", "Choice column", "Canvas component", "Do until"],
          answer: 0,
          explanation: "Monitoring provides accountability and usage insight.",
          concept: "Monitoring"
        },
        {
          question: "Which set best matches Responsible AI framing?",
          options: ["Fast, cheap, branded, mobile, visual", "Safe, private, fair, transparent, accountable", "Managed, unmanaged, sandbox, default, developer", "Filter, LookUp, Patch, Set, ForAll"],
          answer: 1,
          explanation: "Responsible AI is framed around safety, privacy, fairness, transparency, and accountability.",
          concept: "Responsible AI"
        }
      ]
    }
  ],
  labs: [
    {
      id: "lab-01",
      number: "01",
      domain: "foundation",
      title: "Establish Your Worlds and Container",
      objective: "Create the authoring world, unmanaged solution, publisher, and first environment variable.",
      build: "Clinic Incident System solution",
      checkpoints: [
        "Confirm you are in a Developer environment, not Default.",
        "Create a new solution named Clinic Incident System.",
        "Create a publisher with prefix cis.",
        "Create a Manager Email text environment variable.",
        "Commit to creating every later component inside the same solution."
      ],
      deliverable: "An unmanaged authoring solution with deployment-survival scaffolding.",
      examAnchor: "Developer vs Default, unmanaged authoring, environment variables."
    },
    {
      id: "lab-02",
      number: "02",
      domain: "foundation",
      title: "Architect the Clinician Table",
      objective: "Build the one side of the data model before incidents cite it.",
      build: "Clinician table",
      checkpoints: [
        "Create a custom table named Clinician.",
        "Notice the automatically created primary Name column.",
        "Add Email as Text with Email format.",
        "Add Role as Choice with Audiologist, Clinical Lead, and Admin.",
        "Add three sample clinicians."
      ],
      deliverable: "A trusted source table that later incident records can reference.",
      examAnchor: "Custom table, primary column, Choice instead of Text."
    },
    {
      id: "lab-03",
      number: "03",
      domain: "foundation",
      title: "Build Incident, Relationship, and AI Column",
      objective: "Create the central Incident table, link it to Clinician, and add an AI prompt column.",
      build: "Incident table",
      checkpoints: [
        "Create Incident with plural Incidents.",
        "Add Description, Severity, Status, and Date Logged columns.",
        "Create Logged By as a Lookup to Clinician.",
        "Add AI Root Cause as a Prompt column if available.",
        "Create varied sample incidents tied to clinicians."
      ],
      deliverable: "Two related Dataverse tables with the shared spine taking shape.",
      examAnchor: "Lookup on the many side, Choice values, Prompt column."
    },
    {
      id: "lab-04",
      number: "04",
      domain: "foundation",
      title: "Add a View and Least-Privilege Role",
      objective: "Save a reusable question and enforce read-only access at the data layer.",
      build: "Open Incidents view and Incident Viewer role",
      checkpoints: [
        "Create an Open Incidents view on the Incident table.",
        "Show Title, Severity, Status, Logged By, and Date Logged.",
        "Filter Status equals Open.",
        "Create Incident Viewer security role.",
        "Grant Read on Incident and Clinician; deny Create, Write, and Delete."
      ],
      deliverable: "A saved view plus least-privilege security that works across all access paths.",
      examAnchor: "Views as saved questions, security role instead of hidden controls."
    },
    {
      id: "lab-05",
      number: "05",
      domain: "applications",
      title: "Grow the Management App",
      objective: "Generate a model-driven app from the data model.",
      build: "Incident Management model-driven app",
      checkpoints: [
        "Create a model-driven app named Incident Management.",
        "Add Incident and Clinician as Dataverse table pages.",
        "Review the generated sitemap navigation.",
        "Set Open Incidents as the default view.",
        "Publish and play the app, testing drill-through to Clinician."
      ],
      deliverable: "A working records-management app without hand-designing screens.",
      examAnchor: "Model-driven generated UI, views, forms, relationships, security."
    },
    {
      id: "lab-06",
      number: "06",
      domain: "applications",
      title: "Compose the Manager's Cockpit",
      objective: "Turn records into trends with charts, dashboards, and generative pages.",
      build: "Charts and dashboard",
      checkpoints: [
        "Create an Incidents by Severity chart.",
        "Create an Incidents by Status chart.",
        "Build a dashboard containing charts and Open Incidents.",
        "Add the dashboard to the model-driven app.",
        "Try a generative page prompt for high-severity open incidents."
      ],
      deliverable: "A situational dashboard and first exposure to generative app authoring.",
      examAnchor: "Charts, dashboards, sitemap, generative pages."
    },
    {
      id: "lab-07",
      number: "07",
      domain: "applications",
      title: "Hand-Build on the Same Spine",
      objective: "Create a mobile canvas app that writes to the same Incident table.",
      build: "Incident Logger canvas app",
      checkpoints: [
        "Create a phone canvas app named Incident Logger.",
        "Connect it to the Incident Dataverse table.",
        "Add txtDescription, drpSeverity, and Submit controls.",
        "Use Patch with IfError to save incidents gracefully.",
        "Add a Gallery filtered to open incidents.",
        "Use Monitor while submitting a test incident."
      ],
      deliverable: "A mobile incident logger sharing the same Dataverse spine as the model-driven app.",
      examAnchor: "Canvas use case, Power Fx Patch, Filter, IfError, Monitor."
    },
    {
      id: "lab-08",
      number: "08",
      domain: "applications",
      title: "Reusable Craft and Embedded Agent",
      objective: "Use named formulas and connect a grounded Copilot Studio agent.",
      build: "Named formula plus Incident Helper agent",
      checkpoints: [
        "Declare CurrentUserName = User().FullName in App.Formulas.",
        "Show the named formula in a welcome label.",
        "Create an Incident Helper Copilot Studio agent.",
        "Ground it on a short incident logging guidance document.",
        "Connect the agent to the canvas app and test an incident question."
      ],
      deliverable: "A hand-crafted app with reusable logic and embedded conversational help.",
      examAnchor: "Named formulas, Copilot Studio agent, grounding."
    },
    {
      id: "lab-09",
      number: "09",
      domain: "logic",
      title: "Wire the High-Severity Approval Reflex",
      objective: "Build the central cloud flow that routes high-severity incidents for approval.",
      build: "Power Automate approval flow",
      checkpoints: [
        "Create an automated cloud flow inside the solution.",
        "Trigger when an Incident row is added.",
        "Branch when Severity equals High.",
        "Start and wait for an approval assigned to Manager Email.",
        "Update Status to Investigating if approved and Closed if rejected.",
        "Add Scope-based error handling configured to run after failure."
      ],
      deliverable: "A governed reflex: high-severity incidents trigger approval and recorded outcomes.",
      examAnchor: "Automated trigger, condition, approval, environment variable, run-after error handling."
    },
    {
      id: "lab-10",
      number: "10",
      domain: "logic",
      title: "Add a Grounded Generative Mind",
      objective: "Author a grounded prompt and consume it in the approval flow.",
      build: "AI Root Cause prompt",
      checkpoints: [
        "Create an AI Hub prompt from blank or template.",
        "Declare IncidentDescription as an input.",
        "Instruct the prompt to return likely root cause and corrective actions.",
        "Add approved SOP or guidance as knowledge.",
        "Call the prompt from the Lab 9 flow.",
        "Write the output to the AI Root Cause column."
      ],
      deliverable: "An intelligent flow that reasons over incident descriptions before manager review.",
      examAnchor: "Prompt input, grounding, consume prompt in flow."
    },
    {
      id: "lab-11",
      number: "11",
      domain: "logic",
      title: "Contrast a Prebuilt Mind",
      objective: "Use a prebuilt model so the prompt-versus-model distinction becomes physical.",
      build: "Prebuilt key phrase or sentiment model",
      checkpoints: [
        "Open AI Hub prebuilt models.",
        "Select Key Phrase Extraction or Sentiment.",
        "Add the AI Builder action to the existing flow.",
        "Pass Incident Description as input.",
        "Write the output to a text column.",
        "Compare ready-made extraction with your grounded prompt."
      ],
      deliverable: "The same system using two different shapes of AI.",
      examAnchor: "Prompt vs prebuilt model vs custom model."
    },
    {
      id: "lab-12",
      number: "12",
      domain: "logic",
      title: "Make Correctness a Law of the System",
      objective: "Add data-layer correctness with a business rule, rollup, and process flow.",
      build: "Business logic layer",
      checkpoints: [
        "Add Corrective Action text column if needed.",
        "Create a business rule: if Severity is High, Corrective Action is required.",
        "Add Open Incident Count rollup on Clinician.",
        "Create a business process flow for Logged, Investigating, Actioned, Closed.",
        "Add the process flow to the model-driven app.",
        "Test that the rule holds through the app."
      ],
      deliverable: "A complete intelligent application with data-layer law and guided process.",
      examAnchor: "Business rule, rollup, business process flow, universal enforcement."
    }
  ],
  decisionTables: [
    {
      title: "Component Choice",
      rows: [
        ["Bespoke, mobile, task-shaped experience", "Canvas app"],
        ["Record management at scale with consistency and speed", "Model-driven app"],
        ["External or public users", "Power Pages"],
        ["Something must happen automatically", "Cloud flow"],
        ["Conversational or reasoning interaction", "Copilot Studio agent"],
        ["One act of summarise, extract, classify, or draft", "AI Hub prompt or model"]
      ]
    },
    {
      title: "Column Choice",
      rows: [
        ["One option from a fixed list", "Choice"],
        ["Reference to another table", "Lookup"],
        ["Simple same-row derived value", "Calculated"],
        ["Real-time same-row Power Fx", "Formula"],
        ["Aggregate from related child rows", "Rollup"],
        ["AI-generated or AI-extracted per row", "Prompt column"]
      ]
    },
    {
      title: "Intelligence Choice",
      rows: [
        ["Open, generative, instructed in words, groundable", "Prompt"],
        ["Common solved task such as sentiment or key phrases", "Prebuilt model"],
        ["Specific unique task with labelled data", "Custom model"],
        ["AI inventing, irrelevant, or off-policy", "Grounding / add knowledge"]
      ]
    },
    {
      title: "Automation Choice",
      rows: [
        ["Starts on data or system event", "Automated trigger"],
        ["Started by a person, button, or app", "Instant trigger"],
        ["Starts on a timetable", "Scheduled trigger"],
        ["Loop over a known collection", "Apply to each"],
        ["Repeat until condition changes", "Do until"],
        ["Human decision mid-process", "Approval action"],
        ["SQL, custom connector, or HTTP", "Premium licensing signal"]
      ]
    },
    {
      title: "Governance and Deployment Choice",
      rows: [
        ["Authoring state", "Unmanaged solution"],
        ["Deployment state", "Managed solution"],
        ["Value differs per environment", "Environment variable"],
        ["Connection must survive deployment", "Connection reference"],
        ["Repeatable governed deployment", "Pipeline"],
        ["Prevent connector data leakage", "DLP policy"],
        ["Govern many makers tenant-wide", "Managed Environments"]
      ]
    }
  ],
  studyPlan: [
    {
      week: "Week 1",
      title: "Foundation",
      focus: "Orientation, big picture, environments, ALM, solution design, and Dataverse.",
      labs: "Labs 1-4",
      target: "Be able to explain why each table, column, environment, and solution choice exists."
    },
    {
      week: "Week 2",
      title: "The Rooms",
      focus: "Model-driven apps, dashboards, canvas apps, Power Fx, components, and Monitor.",
      labs: "Labs 5-8",
      target: "Make canvas-versus-model-driven judgement instinctive."
    },
    {
      week: "Week 3",
      title: "The Nervous System",
      focus: "Cloud flows, triggers, connectors, approvals, loops, and error handling.",
      labs: "Lab 9",
      target: "Spot trigger type, premium connector, and flow-control clues quickly."
    },
    {
      week: "Week 4",
      title: "The Mind and the Law",
      focus: "AI Hub, grounding, prebuilt/custom models, business rules, process flows, and governance.",
      labs: "Labs 10-12",
      target: "Drill prompt versus prebuilt versus custom, and business rule versus flow."
    },
    {
      week: "Week 5",
      title: "Consolidation",
      focus: "Decision tables, mixed scenarios, wrong-answer repair, and full timed practice.",
      labs: "Review all labs",
      target: "Reach a stable 80%+ practice score before booking."
    }
  ],
  examTactics: [
    "Locate the floor first: foundation, rooms, reflexes, mind, or law.",
    "Read for every distinct need; multi-need scenarios are normal.",
    "Prefer the lowest rung that fully solves the requirement.",
    "Treat familiar tools as suspect if the requirement points elsewhere.",
    "Watch tell-tale phrases: per environment, across all apps, off-policy AI, premium connector, public users.",
    "Flag and return instead of spending too long on one scenario."
  ]
};
