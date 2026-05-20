export interface Work {
  name: string;
  href: string;
  internal: boolean;
  context: string;
  tension: string;
  decision: string;
  outcome: string;
}

export const works: Work[] = [
  {
    name: "docproc",
    href: "/projects/docproc",
    internal: true,
    context:
      "Document extraction is often brittle, lossy with images, or prohibitively expensive at scale.",
    tension:
      "Generic OCR ignores structure; most \"AI study tools\" quietly fail on diagrams, equations, and screenshot-heavy slides.",
    decision:
      "Built an opinionated document intelligence CLI that uses vision LLMs and config-driven RAG to turn arbitrary slides, papers, and textbooks into clean, full-context markdown.",
    outcome:
      "Static PDFs become queryable, refinable knowledge—ready for RAG, notes, flashcards, and assessment pipelines.",
  },
  {
    name: "devsper",
    href: "/projects/devsper",
    internal: true,
    context:
      "Running multi-agent AI systems is chaotic without clear orchestration and shared state.",
    tension:
      "Agents need task scheduling, shared memory, and a single control plane—otherwise you're gluing scripts and hoping they don't collide.",
    decision:
      "Built a distributed AI worker runtime with an orchestrator, shared memory, and DAG-based scheduling so multi-agent runs stay predictable at scale.",
    outcome:
      "Autonomous workflows: research summaries, parallel analysis, and agent collaboration across engineering, finance, and legal operations.",
  },
  {
    name: "Eigenwave",
    href: "#",
    internal: false,
    context:
      "Working on a proprietary photonics platform that bridges simulation and design workflows.",
    tension:
      "Most photonics tools are either opaque GUIs or low-level solvers that are hard to integrate into modern research and product stacks.",
    decision:
      "Designing Eigenwave as a focused, proprietary environment that pairs high-fidelity simulation with opinionated, ergonomic workflows.",
    outcome:
      "In active development—aimed at making advanced photonics exploration feel closer to modern software engineering.",
  },
  {
    name: "continuum",
    href: "/projects/continuum",
    internal: true,
    context:
      "LLM pipelines stitch together inference servers, vector stores, and orchestration layers across multiple process boundaries.",
    tension:
      "The model is fast; the glue is slow. Every HTTP hop and subprocess call adds latency the user feels but the benchmark doesn't capture.",
    decision:
      "Built a C++ execution runtime that compiles LLM and ML pipelines into static graphs—embed, retrieve, and generate as typed first-class operations with no interpreter overhead.",
    outcome:
      "Single binary, no orchestration daemons. Pipelines run as compiled programs.",
  },
  {
    name: "veclite",
    href: "/projects/veclite",
    internal: true,
    context:
      "Adding semantic search to a small project means standing up Pinecone, Weaviate, or a Postgres extension—infra for something that should be trivial.",
    tension:
      "Hosted vector databases are overkill for local tools; rolling your own HNSW index is a week of work that has nothing to do with the actual project.",
    decision:
      "Built an embedded Rust vector store with a single-file persistence model—same mental model as SQLite, but for approximate nearest-neighbour search.",
    outcome:
      "Drop-in semantic search with no server, no daemon, no connection pool.",
  },
  {
    name: "ferryx",
    href: "/projects/ferryx",
    internal: true,
    context:
      "Writing Rust extensions for Python means maintaining a C FFI layer, a Python wrapper, and keeping both in sync with the Rust API.",
    tension:
      "Every type change requires updates in three places. The binding layer is always a commit behind the implementation.",
    decision:
      "Built a compiler that reads Rust source, reflects the public type surface, and emits the FFI layer, native extension, and .pyi stubs automatically.",
    outcome:
      "Bindings become a compiler output. Change the Rust signature, run ferryx, done.",
  },
  {
    name: "llmwiki",
    href: "/projects/llmwiki",
    internal: true,
    context:
      "Note-taking tools optimise for writing, not retrieval. Months later, the note you need is buried and keyword search returns 40 results.",
    tension:
      "Semantic search requires a vector store and embedding pipeline; RAG synthesis requires an LLM—both are heavy to wire up just for personal notes.",
    decision:
      "Built a Rust CLI and TUI that embeds notes locally, retrieves by meaning, and synthesises answers from your own knowledge base—nothing leaves your machine.",
    outcome:
      "Ask questions in plain English. Get answers drawn from your own notes.",
  },
  {
    name: "surgext-mcp",
    href: "/projects/surgext-mcp",
    internal: true,
    context:
      "Surge XT has hundreds of parameters across oscillators, filters, FX, and modulation—impossible to keep in working memory during a session.",
    tension:
      "Asking an AI for help with sound design means the model is guessing from training data, not reading the actual parameter documentation.",
    decision:
      "Built an MCP server that ingests and chunks the official Surge XT docs, exposing search, section fetch, and parameter lookup as tools AI models can call directly.",
    outcome:
      "AI assistants can now look up exact knob behaviour and guide patch recreation with authoritative documentation.",
  },
];
