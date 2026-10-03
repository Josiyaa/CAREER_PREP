// Core CS Flashcards Database

export const flashcardsData = [
  {
    id: "os-f1",
    subject: "Operating Systems",
    topic: "Process Synchronization",
    question: "What is a Semaphore, and what is the difference between Counting Semaphore and Binary Semaphore?",
    answer: "A Semaphore is an integer variable accessed only through wait() [P] and signal() [V] atomic operations.\n- Binary Semaphore: Value can range only between 0 and 1 (used for Mutual Exclusion / Mutex).\n- Counting Semaphore: Value can range over unrestricted domain (used to control access to a resource pool with multiple instances)."
  },
  {
    id: "os-f2",
    subject: "Operating Systems",
    topic: "Memory Management",
    question: "What is Thrashing, and how can it be detected and prevented?",
    answer: "Thrashing occurs when a CPU spends more time swapping pages in and out of disk than executing instructions because processes do not have enough frames.\n- Detection: High page fault rate.\n- Prevention: Working Set Model or Page Fault Frequency (PFF) algorithm to allocate enough page frames per active process."
  },
  {
    id: "dbms-f1",
    subject: "DBMS",
    topic: "Indexing",
    question: "Why are B+ Trees preferred over B Trees for Database Indexing?",
    answer: "1. All data pointers are stored exclusively in leaf nodes in B+ Trees, making non-leaf nodes smaller so more keys fit in a single disk block.\n2. Leaf nodes in B+ Trees are linked sequentially in a doubly linked list, enabling ultra-fast range queries and table scans."
  },
  {
    id: "dbms-f2",
    subject: "DBMS",
    topic: "Transactions & Concurrency",
    question: "What is a Dirty Read, Non-Repeatable Read, and Phantom Read?",
    answer: "- Dirty Read: Reading data written by an uncommitted transaction.\n- Non-Repeatable Read: A transaction reads the same row twice and gets different values because another committed transaction updated it.\n- Phantom Read: A query executed twice returns different sets of rows because another transaction inserted/deleted matching records."
  },
  {
    id: "cn-f1",
    subject: "Computer Networks",
    topic: "Transport Layer",
    question: "Explain the 3-Way Handshake mechanism in TCP connection establishment.",
    answer: "1. Client -> Server: SYN (Synchronize sequence number X).\n2. Server -> Client: SYN-ACK (Server sequence Y, Acknowledgment X+1).\n3. Client -> Server: ACK (Acknowledgment Y+1). Connection is established!"
  },
  {
    id: "cn-f2",
    subject: "Computer Networks",
    topic: "Application Layer",
    question: "What is the key difference between HTTP/1.1 and HTTP/2?",
    answer: "- HTTP/1.1: Text-based, head-of-line blocking, requires separate TCP connections for parallel asset loads.\n- HTTP/2: Binary protocol, Multiplexing (multiple requests over single TCP connection), HPACK header compression, and Server Push capability."
  }
];
