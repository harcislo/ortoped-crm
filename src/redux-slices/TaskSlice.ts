import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import { FieldError, Pagination, Task, SortParams, SearchParams, SearchParam } from '../types';
import api from '../api';

interface TaskState extends Pagination, SortParams {
  tasks: Task[];
  loading: boolean;
  task: Task | null;
  searchParams: SearchParams;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  task: null,
  pageCount: 1,
  currentPage: 1,
  totalCount: 0,
  perPage: 10,
  sortBy: null,
  order: null,
  searchParams: {},
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getTasksStart: (state) => {
      state.loading = true;
    },
    getTasksSuccess: (state, action: PayloadAction<{ tasks: Task[] } & Pagination>) => {
      state.tasks = action.payload.tasks;
      state.pageCount = action.payload.pageCount;
      state.currentPage = action.payload.currentPage;
      state.totalCount = action.payload.totalCount;
      state.perPage = action.payload.perPage;
      state.loading = false;
    },
    getTasksFailure: (state) => {
      state.loading = false;
    },
    getSingleTaskStart: (state) => {
      state.loading = true;
    },
    getSingleTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
      state.loading = false;
    },
    getSingleTaskFailure: (state) => {
      state.loading = false;
    },
    createTaskStart: (state) => {
      state.loading = true;
    },
    createTaskSuccess: (state) => {
      state.loading = false;
    },
    createTaskFailure: (state, payload?: PayloadAction<FieldError>) => {
      state.loading = false;
    },
    editTaskSart: (state) => {
      state.loading = true;
    },
    editTaskSuccess: (state) => {
      state.loading = false;
    },
    editTaskFailure: (state, payload?: PayloadAction<FieldError>) => {
      state.loading = false;
    },
    deleteTaskStart: (state) => {
      state.loading = true;
    },
    deleteTaskSuccess: (state) => {
      state.loading = false;
    },
    deleteTaskFailure: (state, payload?: any) => {
      state.loading = false;
    },
    setSortParams: (state, action: PayloadAction<SortParams>) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
    },
    setSearchParams: (state, action: PayloadAction<SearchParam>) => {
      const { searchTerm } = action.payload;
      if (!searchTerm) {
        delete state.searchParams[action.payload.searchBy];
      } else {
        state.searchParams[action.payload.searchBy] = searchTerm;
      }
    },
  },
});

export const {
  getTasksStart,
  getTasksSuccess,
  getTasksFailure,
  getSingleTaskStart,
  getSingleTaskSuccess,
  getSingleTaskFailure,
  createTaskStart,
  createTaskSuccess,
  createTaskFailure,
  editTaskSart,
  editTaskSuccess,
  editTaskFailure,
  deleteTaskStart,
  deleteTaskSuccess,
  deleteTaskFailure,
  setSortParams,
  setSearchParams,
} = taskSlice.actions;

export const getTasksSelector = (state: RootState) => state.task.tasks;

export const getSingleTaskSelector = (state: RootState) => state.task.task;

export const getTaskPagination = (state: RootState): Pagination => {
  return {
    pageCount: state.task.pageCount,
    currentPage: state.task.currentPage,
    totalCount: state.task.totalCount,
    perPage: state.task.perPage,
  };
};

export const getTaskSortParams = (state: RootState): SortParams => ({
  sortBy: state.task.sortBy,
  order: state.task.order,
});

export const getTaskSearchParams = (state: RootState) => {
  return state.task.searchParams;
};

export const getTaskSearchParam = (fieldName: string) => (state: RootState) => {
  return state.task.searchParams[fieldName];
};

// Thunk actions

type TGetTasksParams = {
  page?: number;
  sort?: string;
  // TODO дополнить
};

export const getTasks =
  (params?: TGetTasksParams) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      const pageSize = getState().task.perPage;
      const page = (params?.page || getState().task.currentPage) - 1;
      const sortBy = getState().task.sortBy;
      const order = getState().task.order;
      const searchParams = getState().task.searchParams;

      dispatch(getTasksStart());

      const response = await api.get<Task[]>(`tracker/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          expand: 'assignee,author,project,status,type,priority,person',
          pageSize,
          ...params,
          page,
          sort: sortBy ? `${order === 'desc' ? '-' : ''}${sortBy}` : undefined,
          ...searchParams,
        },
      });
      dispatch(
        getTasksSuccess({
          tasks: response.data,
          currentPage: parseInt(response.headers['x-pagination-current-page']),
          perPage: parseInt(response.headers['x-pagination-per-page']),
          pageCount: parseInt(response.headers['x-pagination-page-count']),
          totalCount: parseInt(response.headers['x-pagination-total-count']),
        })
      );
    } catch (error) {
      dispatch(getTasksFailure());
    }
  };

export const getSingleTask =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      dispatch(getSingleTaskStart());
      const response = await api.get<Task>(`tracker/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getSingleTaskSuccess(response.data));
    } catch (error) {
      dispatch(getSingleTaskFailure());
    }
  };

export const createTask =
  (values: object) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      dispatch(createTaskStart());
      await api.post<Task>(`tracker/tasks`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(createTaskSuccess());
    } catch (error: any) {
      dispatch(createTaskFailure(error.response.data));
    }
  };

export const editTask =
  (values: object, taskId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      dispatch(editTaskSart());
      await api.put<Task>(`tracker/tasks/${taskId}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(editTaskSuccess());
    } catch (error: any) {
      dispatch(editTaskFailure(error.response.data));
    }
  };

export const deleteTask =
  (taskId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      dispatch(deleteTaskStart());
      await api.delete<Task>(`tracker/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteTaskSuccess());
    } catch (error: any) {
      dispatch(deleteTaskFailure(error.response.data));
    }
  };

export const sortTasks = (params: SortParams) => (dispatch: AppDispatch) => {
  try {
    dispatch(setSortParams(params));

    //@ts-ignore TODO
    dispatch(getTasks());
  } catch (error: any) {
    console.error(error);
  }
};

export const searchTasks = (param: SearchParam) => (dispatch: AppDispatch) => {
  try {
    dispatch(setSearchParams(param));

    //@ts-ignore TODO
    dispatch(getTasks());
  } catch (error: any) {
    console.error(error);
  }
};

export default taskSlice.reducer;
