graph TD
    A[App Start] --> B[Load Data from localStorage]
    B --> C[Initialize DOM Elements]
    C --> D[Setup Event Listeners]
    D --> E[renderLists + renderTodos]

    subgraph "Data Structure"
        F[lists Object]
        F --> G[default: {name, todos[], done[]}]
        F --> H[listId: {name, todos[], done[]}]
        I[currentList = "default"]
        J[editingTodoId = null]
    end

    subgraph "Event Listeners"
        K[addBtn.click] --> L[handleAddOrEdit]
        M[todoInput.keypress] --> L
        N[newListBtn.click] --> O[createNewList]
        P[completedBtn.click] --> Q[Show Done List]
        R[homeBtn.click] --> S[Switch to Default]
        T[Escape key] --> U[cancelEdit]
    end

    subgraph "Core Functions"
        L --> V{editingTodoId exists?}
        V -->|Yes| W[Update Existing Todo]
        V -->|No| X[Create New Todo]
        W --> Y[saveToStorage]
        X --> Y
        Y --> Z[renderTodos]

        O --> AA[Prompt for Name]
        AA --> BB[Create New List with UUID]
        BB --> CC[Switch to New List]
        CC --> Y

        S --> DD[currentList = "default"]
        DD --> EE[renderTodos + renderLists]
    end

    subgraph "Rendering Functions"
        Z --> FF[renderTodos]
        FF --> GG[Clear Containers]
        GG --> HH[Create Todo Elements]
        HH --> II[Append to DOM]

        EE --> JJ[renderLists]
        JJ --> KK[Clear Lists Container]
        KK --> LL[Create List Buttons]
        LL --> MM[Add Active Class]
        MM --> NN[Append to Sidebar]
    end

    subgraph "Todo Operations"
        OO[handleToggleTodo] --> PP{Todo in todos?}
        PP -->|Yes| QQ[Move to Done]
        PP -->|No| RR[Move to Todos]
        QQ --> Y
        RR --> Y

        SS[deleteTodo] --> TT[Remove from Arrays]
        TT --> Y

        UU[editTodo] --> VV[Fill Input Fields]
        VV --> WW[Set editingTodoId]

        U --> XX[Clear Input Fields]
        XX --> YY[Reset editingTodoId]
    end

    subgraph "List Operations"
        ZZ[switchToList] --> AAA[Set currentList]
        AAA --> EE

        BBB[deleteList] --> CCC{Is Default?}
        CCC -->|Yes| DDD[Alert Error]
        CCC -->|No| EEE[Confirm Delete]
        EEE --> FFF[Delete from lists]
        FFF --> GGG{Was Current?}
        GGG -->|Yes| S
        GGG -->|No| Y
    end

    subgraph "Helper Functions"
        HHH[createTodoElement] --> III[Format Date]
        III --> JJJ[Check Visibility]
        JJJ --> KKK[Generate HTML]
        KKK --> LLL[Return DOM Element]

        Y --> MMM[localStorage.setItem]
    end

    style A fill:#e1f5fe
    style F fill:#f3e5f5
    style L fill:#e8f5e8
    style FF fill:#fff3e0
    style OO fill:#fce4ec