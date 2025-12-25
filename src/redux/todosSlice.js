import { createSlice } from "@reduxjs/toolkit";
import { modalControl, transferTodo, findTodoIn } from "./utils"
const initialState = {
    // Background & Color Management
    activePaletteTodoId: null,
    bgPaletteModal: null,
    todoBgColor: "white",

    // Todo Collections
    todos: [],
    trashTodos: [],
    reminderTodos: [],
    archiveTodos: [],

    // Label Management
    checkedLabels: [],

    // Todo Creation Form
    title: "",
    content: "",
    isExpanded: false,

    // Selection
    selectedTodoId: null,
    selectedCurrent: 0,

    // Header Controls/Layout
    todoLayout: false,

    // Modal Management
    activeOptionsTodoId: null,
    optionsModal: null,

    // Todo Properties
    isPinned: false,

    // Responsive
    todoDetailHeight: {},
    createTodoHeight: {},
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        //* Selection Reducers
        toggleTodoSelection: (state, action) => {
            const { selectId, status } = action.payload
            const todoSelected = findTodoIn(state, status, selectId)

            if (todoSelected) {
                todoSelected.selected = !todoSelected.selected
                todoSelected.selected
                    ? state.selectedCurrent += 1
                    : state.selectedCurrent -= 1
            }
            state.bgPaletteModal = false
            state.optionsModal = false
        },
        resetTodoSelection: (state) => {
            const todoList = [state.todos, state.archiveTodos]
            todoList.forEach(list => {
                list.forEach(todo => { todo.selected ? todo.selected = false : null })
            })
            state.selectedCurrent = 0;
            state.bgPaletteModal = false
            state.optionsModal = false
        },
        //* Header Reducers
        toggleTodoLayout: (state) => {
            state.todoLayout = !state.todoLayout;
        },
        //* Create Todo Reducers
        createTodo: (state, action) => {
            state.todos.push(action.payload)
            state.optionsModal = false
            state.bgPaletteModal = false
        },

        updateDraft: (state, action) => {
            if (action.payload.title !== undefined)
                state.title = action.payload.title
            if (action.payload.content !== undefined)
                state.content = action.payload.content
        },
        setFormVisibility: (state, action) => {
            state.isExpanded = action.payload
        },
        resetForm: (state) => {
            state.content = ""
            state.title = ""
        },

        //* Todo Detail Reducers
        updateActiveTodo: (state, action) => {
            const { id, field, value } = action.payload

            const todoIndex = state.todos.findIndex((todo) => id === todo.id)
            if (todoIndex !== -1) {
                state.todos[todoIndex][field] = value
            }
        },
        openTodoDetail: (state, action) => {
            state.selectedTodoId = action.payload
            if (state.selectedTodoId !== null) {
                state.optionsModal = false
                state.bgPaletteModal = false
            }
        },
        closeTodoDetail: (state) => {
            state.selectedTodoId = null;
            state.bgPaletteModal = false
            state.optionsModal = false
        },

        //* Pinning Reducers
        toggleTodoPin: (state, action) => {
            const { pinnedId, status } = action.payload
            const todoPinned = findTodoIn(state, status, pinnedId)
            if (todoPinned) {
                todoPinned.pinned = !todoPinned.pinned
            }
        },

        pinSelectedTodos: (state) => {
            state.todos.forEach((todo) => {
                if (todo.selected == true) {
                    todo.pinned = !todo.pinned
                    todo.selected = false
                    state.selectedCurrent = 0
                }
            })
            state.archiveTodos.forEach((todo) => {
                if (todo.selected == true) {
                    todo.pinned = !todo.pinned
                    todo.selected = false
                    state.selectedCurrent = 0
                }
            })

        },

        toggleDraftPin: (state, action) => {
            state.isPinned = action.payload
        },

        //* Option Reducers
        openTodoOptions: (state, action) => {
            modalControl(state, action, "optionsModal", "activeOptionsTodoId")
        },
        //* Label Actions Reducers
        toggleLabelFilter: (state, action) => {
            const labelName = action.payload
            const index = state.checkedLabels.indexOf(labelName)
            if (index > -1) {
                state.checkedLabels.splice(index, 1);
            } else {
                state.checkedLabels.push(labelName);
            }
        },
        clearCheckedLabels: (state) => {
            state.checkedLabels = []
        },
        addLabelToTodo: (state, action) => {
            const { todoId, label, status } = action.payload;

            if (todoId === null) {
                [state.todos, state.archiveTodos, state.trashTodos].forEach(list => {
                
                    list.forEach(todo => {
                   
                        if (todo.selected && !todo.labels?.includes(label)) {
                            todo.labels.push(label);
                        }
                    });
                });
            } else {
                const todo = findTodoIn(state, status, todoId)
                if (todo && !todo.labels?.includes(label)) {
                    todo.labels.push(label);
                }
            }
        },
        removeLabelFromTodo: (state, action) => {
            const { todoId, label, status } = action.payload;


            if (todoId === null) {
                [state.todos, state.archiveTodos, state.trashTodos].forEach(list => {
                    list.forEach(todo => {
                        if (todo.selected) {
                            todo.labels = todo.labels.filter(l => l !== label);
                        }
                    });
                })
            } else {


                const todo = findTodoIn(state, status, todoId)
                if (todo) {
                    todo.labels = todo.labels.filter(l => l !== label);
                }
            }
        },

        //* Trash Reducers
        moveTodoToTrash: (state, action) => {
            const { transferTodoId, status } = action.payload;
            transferTodo(state, transferTodoId, "todos", "trashTodos")
            if (status === "home") {
                transferTodo(state, transferTodoId, "todos", "trashTodos")
            } else if (status === "archive") {
                transferTodo(state, transferTodoId, "archiveTodos", "trashTodos")
            }
        },
        moveSelectedTodosToTrash: (state, action) => {
            const status = action.payload

            if (status === "selected") {
                const selectedFromTodos = state.todos.filter(todo => todo.selected)
                const selectedFromArchive = state.archiveTodos.filter(todo => todo.selected)

                selectedFromTodos.forEach(todo => state.trashTodos.push(todo))
                selectedFromArchive.forEach(todo => state.trashTodos.push(todo))

                state.todos = state.todos.filter(todo => !todo.selected)
                state.archiveTodos = state.archiveTodos.filter(todo => !todo.selected)

                state.todos.forEach(todo => {
                    if (todo.selected) todo.selected = false
                })
                state.archiveTodos.forEach(todo => {
                    if (todo.selected) todo.selected = false
                })
                state.trashTodos.forEach(todo => {
                    if (todo.selected) todo.selected = false
                })
                state.selectedCurrent = 0
            }

        },
        restoreSelectedTodosFromTrash: (state) => {
            const selectedId = state.trashTodos.filter((todo) => todo.selected).map(todo => todo.id)
            state.trashTodos.forEach((todo) => {
                if (todo.selected) {
                    state.todos.push(todo)
                    todo.selected = false
                    state.selectedCurrent = 0
                }
            })

            state.trashTodos = state.trashTodos.filter((todo) => !selectedId.includes(todo.id))

        },
        restoreTodoFromTrash: (state, action) => {
            const { transferTodoId } = action.payload;
            transferTodo(state, transferTodoId, "trashTodos", "todos")
            state.selectedTodoId = null
        },
        deleteTodoFromTrash:(state,action)=>{
            const {deleteTodoId}=action.payload
            state.trashTodos=state.trashTodos.filter((todo)=>todo.id===deleteTodoId)
        },
        deleteSelectedTodosFromTrash:(state)=>{
        state.trashTodos=state.trashTodos.filter(todo=>!todo.selected)
        state.selectedCurrent=0
        },
        emptyTrash:(state)=>{
        state.trashTodos=[]
        },

        //* Archive Reducers
        moveTodoToArchive: (state, action) => {
            const { transferTodoId } = action.payload;
            transferTodo(state, transferTodoId, "todos", "archiveTodos")
            state.selectedTodoId = null;
            state.isPinned = false
        },
        restoreTodoFromArchive: (state, action) => {
            const {transferTodoId}=action.payload
            transferTodo(state, transferTodoId, "archiveTodos", "todos")
            state.selectedTodoId = null
        },

        createArchivedTodo: (state) => {
            const newArchiveTodo = {
                content: state.content,
                title: state.title,
                id: Date.now(),
                selected: false,
                pinned: false,
                bgColor: state.todoBgColor,
                labels: [...state.checkedLabels]
            }
            state.archiveTodos.push(newArchiveTodo)
            state.content = ""
            state.title = ""
            state.isExpanded = false
            state.checkedLabels = []
            state.todoBgColor = "white"
            state.bgPaletteModal = false
            state.optionsModal = false

        },
        moveSelectedTodosToArchive: (state) => {
            const selectedId = state.todos.filter((todo) => todo.selected).map(todo => todo.id)
            state.todos.forEach((todo) => {
                if (todo.selected) {
                    state.archiveTodos.push(todo)
                    todo.selected = false
                    state.selectedCurrent = 0
                }
            })

            state.todos = state.todos.filter((todo) => !selectedId.includes(todo.id))
            console.log("object");

        },
        restoreSelectedTodosFromArchive: (state) => {
            const selectedId = state.archiveTodos.filter((todo) => todo.selected).map(todo => todo.id)
            state.archiveTodos.forEach((todo) => {
                if (todo.selected) {
                    state.todos.push(todo)
                    todo.selected = false
                    state.selectedCurrent = 0
                }
            })

            state.archiveTodos = state.archiveTodos.filter((todo) => !selectedId.includes(todo.id))

        },

        //* Background Colors
        openBgPaletteModal: (state, action) => {
            modalControl(state, action, "bgPaletteModal", "activePaletteTodoId")

        },

        updateTodoBgColor: (state, action) => {
            const { color, status, id } = action.payload
            if (status == "create") { state.todoBgColor = color }
            if (status == "home" || status == "todoDetail") {
                const todoIndex = state.todos.findIndex((todo) => todo.id === id)
                state.todos[todoIndex].bgColor = color
            }
            if (status == "archive") {
                const todoIndex = state.archiveTodos.findIndex((todo) => todo.id === id)
                state.archiveTodos[todoIndex].bgColor = color
            }
        },

        resetBgColor: (state, action) => {
            const { todoId, status } = action.payload;

            if (status === "create") {
                state.todoBgColor = "white";
            } else {
                const todo = findTodoIn(state, status, todoId)
                if (todo) {
                    todo.bgColor = "white"
                }
            }
        },
        updateSelectedTodosBgColor: (state, action) => {
            const { color, status } = action.payload;
            if (status !== "archive") {
                state.todos.forEach((todo) => {
                    if (todo.selected === true) {
                        todo.bgColor = color;
                    }
                });
            }
            state.archiveTodos.forEach((todo) => {
                if (todo.selected === true) {
                    todo.bgColor = color;
                }
            });


        },
        resetSelectedTodosBgColor: (state) => {
            state.todos.forEach((todo) => {
                if (todo.selected === true) {
                    todo.bgColor = "white";
                }
            });
            state.archiveTodos.forEach((todo) => {
                if (todo.selected === true) {
                    todo.bgColor = "white";
                }
            });

        },

        //* Responsive
        setTodoDetailHeight: (state, action) => {
            const { todoId, height } = action.payload
            state.todoDetailHeight[todoId] = height
        },
        setCreateTodoHeight: (state, action) => {
            const { height } = action.payload
            state.createTodoHeight = height
        },

    }
}
)

export const {
    //* Selection Reducers
    toggleTodoSelection,
    resetTodoSelection,
    //* Header Reducers
    toggleTodoLayout,
    //*Create Todo Reducers
    createTodo,
    updateDraft,
    setFormVisibility,
    resetForm,
    //* Todo Detail Reducers
    updateActiveTodo,
    openTodoDetail,
    closeTodoDetail,
    //* Pinning Reducers
    toggleTodoPin,
    pinSelectedTodos,
    toggleDraftPin,
    //* Option Reducers
    openTodoOptions,
    //* Label Actions Reducers
    toggleLabelFilter,
    clearCheckedLabels,
    addLabelToTodo,
    removeLabelFromTodo,
    //* Responsive
    setTodoDetailHeight,
    setCreateTodoHeight,
    //* Background Color Actions
    openBgPaletteModal,
    updateTodoBgColor,
    resetBgColor,
    updateSelectedTodosBgColor,
    resetSelectedTodosBgColor,
    //* Trash Reducers
    moveTodoToTrash,
    moveSelectedTodosToTrash,
    restoreTodoFromTrash,
    restoreSelectedTodosFromTrash,
    deleteTodoFromTrash,
    deleteSelectedTodosFromTrash,
    emptyTrash,
    //* Archive Reducers
    moveTodoToArchive,
    moveSelectedTodosToArchive,
    createArchivedTodo,
    restoreSelectedTodosFromArchive,
    restoreTodoFromArchive,

} = todoSlice.actions

export default todoSlice.reducer