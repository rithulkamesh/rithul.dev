export interface Work {
  name: string;
  href: string;
  summary: string;
  internal: boolean;
  context: string;
  tension: string;
  decision: string;
  outcome: string;
}

export const works: Work[] = [
  {
    name: "sunday",
    href: "/projects/sunday",
    summary:
      "Local-first voice and screen agent harness. Can any model go AGI with the right loop?",
    internal: true,
    context:
      "Most of what looks like intelligence in an agent comes from the loop around the model, but nobody can say how much, because the loop is rarely measured.",
    tension:
      "Benchmarks score models, not harnesses. Swap the weights and you learn about the weights; you never learn what planning, verifying, and remembering are worth.",
    decision:
      "Built a local-first voice and screen agent harness around a swappable 4B model, and set a measurable bar: 70% on a fixed 50-task eval suite, with the pass rate rising while the model stays constant.",
    outcome:
      "An open experiment with a number instead of a vibe. If the number moves, the harness is doing real work; if it doesn't, that is a result too.",
  },
  {
    name: "docproc",
    href: "/projects/docproc",
    summary:
      "Vision-LLM CLI that turns PDFs and slides into full-context markdown.",
    internal: true,
    context:
      "Document extraction is often brittle, lossy with images, or prohibitively expensive at scale.",
    tension:
      'Generic OCR ignores structure; most "AI study tools" quietly fail on diagrams, equations, and screenshot-heavy slides.',
    decision:
      "Built an opinionated document intelligence CLI that uses vision LLMs and config-driven RAG to turn arbitrary slides, papers, and textbooks into clean, full-context markdown.",
    outcome:
      "Static PDFs become queryable, refinable knowledge—ready for RAG, notes, flashcards, and assessment pipelines.",
  },
  {
    name: "continuum",
    href: "/projects/continuum",
    summary: "C++ runtime that compiles LLM pipelines into static graphs.",
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
    summary: "SQLite for vectors: an embedded Rust vector store.",
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
    name: "surgext-mcp",
    href: "/projects/surgext-mcp",
    summary: "MCP server that lets AI look up real Surge XT docs.",
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
  {
    name: "chorale",
    href: "https://github.com/rithulkamesh/chorale",
    summary:
      "Open-source vocal harmonizer plugin: one line in, eight harmonies out.",
    internal: false,
    context:
      "Stacking vocal harmonies means recording take after take, or renting a harmonizer that turns the singer into a chipmunk.",
    tension:
      "Pitch shifting that ignores the voice's formants destroys the character of the singer.",
    decision:
      "Built an open-source C++ vocal harmonizer plugin that uses time-domain PSOLA to turn one mono line into eight harmonies.",
    outcome:
      "VST3, AU, and standalone on macOS, Windows, and Linux, with diatonic stacks, pedal drones, MIDI chords, and doubling.",
  },
  {
    name: "polylogue",
    href: "https://github.com/rithulkamesh/polylogue",
    summary: "Polyphonic synth built on the Korg monologue architecture.",
    internal: false,
    context:
      "The Korg monologue has a great voice architecture, but it is monophonic and lives in hardware.",
    tension:
      "Playing chords on that sound means buying more hardware or settling for an approximation.",
    decision:
      "Built a polyphonic software synth on the monologue's architecture: two oscillators with sync and ring mod, a drive filter, two envelopes, and an LFO, with original branding and sounds.",
    outcome:
      "A JUCE 8 / C++20 plugin (VST3, AU, standalone) with PLAY macros, a full EDIT panel, and MIDI learn on every control.",
  },
];
